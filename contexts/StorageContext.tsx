import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';

export interface StorageContextProps {
  totalStorageUsed: number;
  calculateSize: () => Promise<number>;
}

export const StorageContext = createContext<StorageContextProps>({
  totalStorageUsed: 0,
  calculateSize: async () => 0
});

const byelength = (obj: Record<string, any>) => {
  return Buffer.byteLength(JSON.stringify(obj), 'utf8');
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const calculateSize = async () => {
  const keys = await AsyncStorage.getAllKeys();
  console.info('Total keys in storage: ', keys.length);
  let totalSize = 0;
  for (const key of keys) {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        const size = byelength(JSON.parse(item));
        console.info(`Key ${key} is ${formatBytes(size)}`);
        totalSize += size;
      }
    } catch (error: any) {
      console.error(
        `Error reading key ${key} from AsyncStorage: ${error.message}`
      );
    }
  }
  console.log('Total size of all keys: ', formatBytes(totalSize));
  return totalSize;
};

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [totalStorageUsed, setTotalStorageUsed] = useState<number>(0);

  useEffect(() => {
    const getSize = async () => {
      const size = await calculateSize();
      setTotalStorageUsed(size);
    };
    getSize();
  }, []);

  const state = {
    totalStorageUsed,
    calculateSize
  };

  return (
    <StorageContext.Provider value={state}>{children}</StorageContext.Provider>
  );
};

const useStorageContext = () => useContext(StorageContext);

export default useStorageContext;

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';
import { useGlobalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../constants/types/Character';
import { ICONS } from '../constants/Configs';

export interface CharacterContextProps {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  currentCharacter: Character | null;
  setCurrentCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
  characterIcon: JSX.Element | null;
}

export const CharacterContext = createContext<CharacterContextProps>({
  characters: [],
  setCharacters: () => {},
  currentCharacter: null,
  setCurrentCharacter: () => {},
  characterIcon: null
});

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const { characterName } = useGlobalSearchParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null
  );
  const [characterIcon, setCharacterIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const getCharacters = async () => {
      AsyncStorage.getAllKeys().then(keys => {
        const keyCopies = [...keys];
        AsyncStorage.multiGet(keyCopies).then(characters => {
          const characterCopies = [...characters];
          const characterObjects = characterCopies.map(character => {
            const [key, value] = character;
            return JSON.parse(value ? value : '');
          });
          setCharacters(characterObjects);
        });
      });
    };
    getCharacters();
  }, []);

  useEffect(() => {
    // for situations where the app is refreshed, the currentCharacter will be reset
    // so we can check for the 'characterName' param, and if present (which means the user has selected a character at some point in current session) we can set it as the currentCharacter
    const getCurrentCharacter = () => {
      if (typeof characterName !== 'string') {
        // NOTE pretty confident this will never happen, but not sure what to do here
        return;
      }
      if (!currentCharacter && characterName) {
        const target = characters.find(char => char.name === characterName);
        setCurrentCharacter(target ? target : null);
      }
    };
    getCurrentCharacter();
  }, [characters]);

  useEffect(() => {
    if (currentCharacter) {
      const icon = ICONS.find(icon => icon.key === currentCharacter.icon);
      if (icon) {
        setCharacterIcon(icon.value);
      }
    }
  }, [currentCharacter]);

  const state = {
    characters,
    setCharacters,
    currentCharacter,
    setCurrentCharacter,
    characterIcon
  };

  return (
    <CharacterContext.Provider value={state}>
      {children}
    </CharacterContext.Provider>
  );
};

const useCharacterContext = () => useContext(CharacterContext);

export default useCharacterContext;

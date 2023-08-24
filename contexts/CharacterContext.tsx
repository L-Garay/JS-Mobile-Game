import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../constants/Character';
import { Ghost, Mummy, Vampire, Zombie, PinDoll } from '../assets/svgs';

const ICONS = [
  { key: 'zombie', value: <Zombie /> },
  { key: 'ghost', value: <Ghost /> },
  { key: 'vampire', value: <Vampire /> },
  { key: 'mummy', value: <Mummy /> },
  { key: 'pinDoll', value: <PinDoll /> }
];

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
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null
  );
  const [characterIcon, setCharacterIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const getCharacters = async () => {
      AsyncStorage.getAllKeys().then(keys => {
        console.log('KEYS', keys);
        const keyCopies = [...keys];
        AsyncStorage.multiGet(keyCopies).then(characters => {
          console.log('CHARACTERS', characters);
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

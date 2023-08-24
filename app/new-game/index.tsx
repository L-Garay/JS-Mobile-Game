import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button,
  Keyboard,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ICONS, COLOR_OPTIONS } from '../../constants/Configs';
import useCharacterContext from '../../contexts/CharacterContext';
import { Character } from 'constants/Character';

type CreateInputs = {
  name: string;
  color: string;
  icon: any;
};

export default function NewGame() {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [selectedIcon, setSelectedIcon] = useState<string>('');

  const navigation = useNavigation();
  const { setCurrentCharacter } = useCharacterContext();

  const defaultValues = {
    name: '',
    color: '',
    icon: ''
  } as CreateInputs as FieldValues;
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues
  });

  const SubmitionErrorAlert = (data: FieldValues, error: any) => {
    Alert.alert(
      'Error creating character',
      `There was a problem creating ${data.name}. Please try again, and if problem persists contact support.`,
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'default'
        }
      ]
    );
  };

  const onSubmit = async (data: FieldValues) => {
    if (errors.root) {
      console.log('ERRORS', errors);
      return;
    }
    try {
      // save character to stroage
      const stringifiedData = JSON.stringify(data);
      await AsyncStorage.setItem(`character_${data.name}`, stringifiedData);
      // save character to context
      const typedData = data as Character;
      setCurrentCharacter(typedData);
      // navigate to game center
      navigation.navigate('game-center/index', {
        characterName: data.name
      });
    } catch (error) {
      console.error(error);
      SubmitionErrorAlert(data, error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Text style={styles.title}>Create a new character!</Text>
        <View style={styles.nameContainer}>
          <Text>Name: </Text>
          <View style={styles.nameInput}>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 50
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Character name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{ height: 50, fontSize: 20 }}
                />
              )}
              name="name"
            />
          </View>
          {errors.name && <Text>This is required.</Text>}
        </View>
        <View style={styles.iconContainer}>
          <Text>Icon: </Text>
          <ScrollView style={styles.iconInput} horizontal>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange } }) => (
                <>
                  {ICONS.map(icon => {
                    return (
                      <Pressable
                        key={icon.key}
                        onPress={() => {
                          Keyboard.dismiss();
                          onChange(icon.key);
                          setSelectedIcon(icon.key);
                        }}
                        style={{
                          paddingTop: 15,
                          paddingBottom: 15,
                          paddingLeft: 5,
                          borderColor:
                            selectedIcon === icon.key ? '#000' : 'none',
                          borderWidth: selectedIcon === icon.key ? 2 : 0,
                          backgroundColor:
                            selectedIcon === icon.key
                              ? 'rgb(64, 207, 247)'
                              : 'transparent',
                          paddingRight: 5
                        }}
                      >
                        {icon.value}
                      </Pressable>
                    );
                  })}
                </>
              )}
              name="icon"
            />
          </ScrollView>
          {errors.icon && <Text>This is required.</Text>}
        </View>
        <View style={styles.colorContainer}>
          <Text>Color: </Text>
          <View style={styles.colorInput}>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectList
                  setSelected={onChange}
                  data={COLOR_OPTIONS}
                  save="key"
                  placeholder="Select your color"
                  search={false}
                  boxStyles={{ zIndex: 2 }}
                />
              )}
              name="color"
            />
          </View>
          {errors.color && <Text>This is required.</Text>}
        </View>
        <View style={styles.submitContainer}>
          <Pressable
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitLabel}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#84daf2'
  },
  menu: {
    height: 450,
    width: 300,
    borderRadius: 7.5,
    borderWidth: 5,
    borderColor: '#d18408',
    backgroundColor: '#d6a811',
    padding: 10,
    position: 'relative'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e78b7',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 30
  },
  nameContainer: {
    backgroundColor: 'lightgreen'
  },
  nameLabel: {},
  nameInput: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    height: 50
  },
  colorContainer: {
    backgroundColor: 'lightblue'
  },
  colorLabel: {},
  colorInput: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff'
  },
  iconContainer: {
    backgroundColor: 'lightyellow'
  },
  iconLabel: {},
  iconInput: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  submitContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '7.5%',
    left: '28.5%',
    zIndex: -1
  },
  submitButton: {
    height: 50,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#84daf2',
    borderColor: '#2e78b7',
    borderWidth: 3
  },
  submitLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e78b7'
  }
});

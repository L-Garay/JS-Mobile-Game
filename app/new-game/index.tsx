import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button,
  Keyboard
} from 'react-native';
import { useNavigation } from 'expo-router';
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldValues
} from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';
import { Ghost, Mummy, Vampire, Zombie } from '../../assets/svgs';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CreateInputs = {
  name: string;
  color: string;
  icon: any;
};

const COLOR_OPTIONS = [
  { key: 'red', value: 'Red' },
  { key: 'blue', value: 'Blue' },
  { key: 'green', value: 'Green' },
  { key: 'orange', value: 'Orange' },
  { key: 'purple', value: 'Purple' },
  { key: 'yellow', value: 'Yellow' },
  { key: 'pink', value: 'Pink' }
];

const ICONS = [
  { key: 'zombie', value: <Zombie /> },
  { key: 'ghost', value: <Ghost /> },
  { key: 'vampire', value: <Vampire /> },
  { key: 'mummy', value: <Mummy /> }
];

export default function NewGame() {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const navigation = useNavigation();
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

  const onSubmit = async (data: FieldValues) => {
    // TODO check for any errors
    if (errors.root) {
      console.log('ERRORS', errors);
      // NOTE what to do here? RHF should handle errors
      return;
    }
    try {
      const stringifiedData = JSON.stringify(data);
      await AsyncStorage.setItem(`character_${data.name}`, stringifiedData);
      navigation.navigate('game-center/index', {
        character: `character_${data.name}`
      });
    } catch (error) {
      console.error(error);
      // TODO display a message to the user
    }
  };

  // console.log(watch('name'), watch('color'), watch('icon'));

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
                />
              )}
              name="name"
            />
          </View>
          {errors.name && <Text>This is required.</Text>}
        </View>
        <View style={styles.iconContainer}>
          <Text>Icon: </Text>
          {/* TODO change this regular View into a ScrollView to allow adding more icons and scrolling */}
          <View style={styles.iconInput}>
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
                              : 'transparent'
                          // paddingRight: 5,
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
          </View>
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
                />
              )}
              name="color"
            />
          </View>
        </View>
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
    padding: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e78b7',
    alignSelf: 'center'
  },
  nameContainer: {
    backgroundColor: 'lightgreen'
  },
  nameLabel: {},
  nameInput: { borderWidth: 1, borderColor: '#000', backgroundColor: '#fff' },
  colorContainer: {
    backgroundColor: 'lightblue'
  },
  colorLabel: {},
  colorInput: { borderWidth: 1, borderColor: '#000', backgroundColor: '#fff' },
  iconContainer: {
    backgroundColor: 'lightyellow'
  },
  iconLabel: {},
  iconInput: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    flexDirection: 'row'
  }
});

import { Link, Stack } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button
} from 'react-native';
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldValues
} from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';
import { Ghost, Mummy, Vampire, Zombie } from '../../assets/svgs';

type CreateInputs = {
  name: string;
  color: string;
  icon: any;
};

const COLOR_OPTIONS = [
  { key: '1', value: 'Red' },
  { key: '2', value: 'Blue' },
  { key: '3', value: 'Green' },
  { key: '4', value: 'Orange' },
  { key: '5', value: 'Purple' },
  { key: '6', value: 'Yellow' },
  { key: '7', value: 'Pink' }
];

export default function NotFoundScreen() {
  const defaultValues = {
    name: '',
    color: '',
    icon: ''
  } as FieldValues;
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues
  });
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  console.log(watch('name'), watch('color'), watch('icon'));

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
          <View style={styles.iconInput}>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange } }) => (
                <>
                  <Pressable onPress={() => onChange('zombie')}>
                    <Zombie />
                  </Pressable>
                  <Pressable onPress={() => onChange('ghost')}>
                    <Ghost />
                  </Pressable>
                  <Pressable onPress={() => onChange('vampire')}>
                    <Vampire />
                  </Pressable>
                  <Pressable onPress={() => onChange('mummy')}>
                    <Mummy />
                  </Pressable>
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
                  save="value"
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

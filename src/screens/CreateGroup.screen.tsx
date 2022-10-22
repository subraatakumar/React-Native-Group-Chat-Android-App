import {Text, View} from 'react-native';
import {MazicTextInput} from 'react-native-mazic-components';
import UserList from '../components/UserList';

const CreateGroup = () => {
  return (
    <View>
      <Text>Create Group</Text>
      <View>
        <MazicTextInput
          value={''}
          setValue={() => {}}
          w={'100%'}
          m={10}
          placeholder="Enter Name to Search"
          hideTitle={true}
        />
      </View>
      <UserList />
    </View>
  );
};

export default CreateGroup;

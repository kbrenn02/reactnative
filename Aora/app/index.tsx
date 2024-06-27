import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View className='flex-1 justify-center items-center bg-white'>
        <Text className='text-3xl font-pblack'>Aora!</Text>
        <StatusBar />
        <Link href='/profile' style={{ color: 'blue' }}>Go to Profile</Link>
    </View>
  );
}

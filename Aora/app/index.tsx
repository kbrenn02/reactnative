import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { styled } from 'nativewind';

const StyledView = styled(View)


export default function HomeScreen() {
  return (
    <StyledView className='flex-1 items-center justify-center bg-white'>
        <Text>Aora!</Text>
        <StatusBar />
        <Link href='/profile' style={{ color: 'blue' }}>Go to Profile</Link>
    </StyledView>
  );
}



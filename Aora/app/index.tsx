import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { styled } from "nativewind";

// const StyledView = styled(View);

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-red-500">
        <Text className="text-3xl">Aora!</Text>
        <StatusBar />
        <Link href='/profile' style={{ color: 'blue' }}>Go to Profile</Link>
    </View>
  );
}



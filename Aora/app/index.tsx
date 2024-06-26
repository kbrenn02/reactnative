import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function HomeScreen() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-red-500">
        <StyledText className="text-3xl">Aora!</StyledText>
        <StatusBar />
        <Link href='/profile' style={{ color: 'blue' }}>Go to Profile</Link>
    </StyledView>
  );
}



import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View className='flex-1 justify-center items-center bg-gray-500'>
        <Text>Aora!</Text>
        <StatusBar />
        <Link href='/profile' style={{ color: 'blue' }}>Go to Profile</Link>
        <Text>Another text because i need to actually see it on the screen and if i make it longer with blah blah</Text>
    </View>
  );
}


// No overload matches this call.
//   Overload 1 of 2, '(props: ViewProps): View', gave the following error.
//     Type '{ children: Element[]; className: string; }' is not assignable to type 'IntrinsicAttributes & IntrinsicClassAttributes<View> & Readonly<ViewProps>'.
//       Property 'className' does not exist on type 'IntrinsicAttributes & IntrinsicClassAttributes<View> & Readonly<ViewProps>'.
//   Overload 2 of 2, '(props: ViewProps, context: any): View', gave the following error.
//     Type '{ children: Element[]; className: string; }' is not assignable to type 'IntrinsicAttributes & IntrinsicClassAttributes<View> & Readonly<ViewProps>'.
//       Property 'className' does not exist on type 'IntrinsicAttributes & IntrinsicClassAttributes<View> & Readonly<ViewProps>'.
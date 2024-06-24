# React Native
This tool was developed to allow you to build/work on 1 codebase that deploys apps on both iOS and Android.
It allows you to use native components, resulting in:
- Better performance
- More seamless UX

It's also easy to learn, meaning that you can quickly start developing mobile apps

## Expo
An app that's used to initiate React Native applications (like `create-react-app` or Vite for React) <br />
It provides many tools and services that simplify the development process and help build apps more easily. <br />
You don't have to worry about configuring your: 
- Dev environment
- Native dependencies
- or installing huge studios or X code
Offers pre-built components too

## How do I work in React Native?
When coding in React Native, we use JavaScript. But instead of rendering HTML elements, you'll be rendering **native mobile components**
Starting code should have the following imports:
- import React from 'react'
- import { View, Text } from 'react-native'
(example initial code)<br />
    const App = () = {<br />
      return (<br />
        \<View><br />
          \<Text>Hello World!\</Text><br />
        \</View><br />
      )}<br />
The \<Text> component is used to render text. We can style it using the same CSS like syntax as in React
  - <Text style = {{ fontSize: 24, color: 'blue' }}>Hello World!\</Text> <br />
  React Native also lets us define styles by creating a single JS object that can be called, optimizing performance.<br />
  **Also, as TailwindCSS has grown in popularity, NativeWind has been created to allow for the writing of Tailwind-like classes in RN<br />**

The \<View> component is a box/container that holds other components.<br />
It's similar to the \<div> element in HTML, but with some added functionality specific to mobile apps.<br />
  - It is often used to create layout structures for other components
  - It has a number of props that can be used to control its appearance & behavior
  - It uses flexbox layout by default, making it really easy to control how its child components are laid out within the container

### Other function components
- TouchableOpacity: great for creating a button




  

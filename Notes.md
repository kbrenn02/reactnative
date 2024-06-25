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
- TouchableOpacity: great for creating a button. Like a cousin to the Button component in React (but more room for customization and flexibility)
- TouchableHighlight: allows Views to respond to touch in a unique way when touched
- TouchableWithoutFeedback: for elements that are clickable but you don't want any visual feedback when pressed (helpful for Links and images that don't need special stylings or effects)
- ActivityIndicator: shows spinner/loading indicator
- Button: acts like a button
- Flatlist: used for rendering a long list of items that need to be scrolled efficiently (like the map function in React, but with features like
    - optimized scroll performance
    - item separation)
  <br />Better for largers lists that need smooth scrolling
- ScrollView: like a magic box that can hold multiple components and views, providing a scrolling container for them. Allows users to explore all the content (making the app more intuitive and user-friendly)
- SafeAreaView: provides a safe zone to render your app's content without it being covered by the device's hardware features like the status bar
    - great for apps that are supported on devices with different screen sizes and shapes.
    - This is import from 'react-native-safe-area-context'
- Image: display images
- ImageBackground: display images as background
- Modal: display a modal
- Alert: display a typical notification style alert
- Switch: displays a toggle feature
- StatusBar: allows you to manipulate how a status bar looks in your app
<br />

There are many more elements that can be found in the documentation

## Create a React Native Project (in Expo)
1. Create an Expo project. Run `npx create-expo-app` and name the app
2. Install dependencies. Run `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar`
3. Set up the entry point. In package.json, override what the default for "main" is with "main": "expo-router/entry"
4. In the app folder, the "_layout.tsx" is our main app file (starting point of our application)
    - I noticed it was under app > (tabs) > index.tsx. Editing that file showed edits on my Expo Go app
5. Modify project configuration to deep link `scheme` in the app config. Go to app.json, change the "scheme" to "[app name]"
6. Run `npx expo start` to run the application
    - Note: have "Expo Go" app downloaded on your phone. Scan the QR code that shows up to see your app.
- To add to point 4, index.tsx is our homepage, but _layout.tsx applies to all pages, like a NavBar or Footer

  

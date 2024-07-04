import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import * as Animatable from 'react-native-animatable'
import React, { useState } from 'react'

// Create animatable components
const AnimatableView = Animatable.createAnimatableComponent(View);
const AnimatableText = Animatable.createAnimatableComponent(Text);

// Define custom animations
Animatable.initializeRegistryWithDefinitions({
    zoomIn: {
        from: {
            scaleX: 0.9,
            scaleY: 0.9,
        },
        to: {
            scaleX: 1,
            scaleY: 1,
        },
    },
    zoomOut: {
        from: {
            scaleX: 1,
            scaleY: 1,
        },
        to: {
            scaleX: 0.9,
            scaleY: 0.9,
        },
    },
});

const TrendingItem = ({ activeItem, item }: Record<string, any>) => {
    const [play, setPlay] = useState(false);

    return (
        <AnimatableView
            className='mr-5'
            animation={activeItem === item.$id ? 'zoomIn' : 'zoomOut'}
            duration={500}
        >
            { play ? (
                <Text className='text-white'>Playing</Text>
            ) : (
                <TouchableOpacity className='relative justify-center items-center' activeOpacity={0.7} onPress={() => setPlay(true)}>
                    <ImageBackground 
                        source={{ uri: item.thumbnail }}
                        className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                    />
                </TouchableOpacity>
            )}
        </AnimatableView>
    )
}

const Trending = ({ posts }: Record<string, any>) => {

    const [activeItem, setActiveItem] = useState(posts[0])

    return (
        <FlatList 
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item}/>
            )}
            horizontal
        />
    )
}

export default Trending
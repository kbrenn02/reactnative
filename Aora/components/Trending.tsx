import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import React, { useState } from 'react'
import { icons } from '@/constants';

// Define custom animations
Animatable.initializeRegistryWithDefinitions({
    zoomIn: {
        from: {
            scaleX: 0.9,
            scaleY: 0.9,
        },
        to: {
            scaleX: 1.1,
            scaleY: 1.1,
        },
    },
    zoomOut: {
        from: {
            scaleX: 1.1,
            scaleY: 1.1,
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
        <Animatable.View
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
                        resizeMode='cover'
                    />

                    <Image 
                        source={icons.play}   
                        className='w-12 h-12 absolute'
                        resizeMode='contain' 
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending = ({ posts }: Record<string, any>) => {

    const [activeItem, setActiveItem] = useState(posts[1])

    const viewableItemsChange = ({ viewableItems }: any) => {
        if(viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }

    return (
        <FlatList 
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item}/>
            )}
            onViewableItemsChanged={viewableItemsChange}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            // No overload matches this call
            // @ts-ignore: Ignore the type error for now
            contentOffset={{ x: 170 }}
            horizontal
        />
    )
}

export default Trending


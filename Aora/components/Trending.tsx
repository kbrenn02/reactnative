import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import React, { useState, useRef, useEffect } from 'react'
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';

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
    const animatableRef = useRef<any>(null); // Ref for Animatable.View

    useEffect(() => {
        // Trigger zoom animation when activeItem changes
        if (animatableRef.current) {
            if (activeItem === item.id) {
                animatableRef.current.animate('zoomIn', 500); // Trigger zoomIn animation
            } else {
                animatableRef.current.animate('zoomOut', 500); // Trigger zoomOut animation
            }
        }
    }, [activeItem, item.id]);

    return (
        <Animatable.View
            className='mr-5'
            ref={animatableRef}
        >
            { play ? (
                <Video
                    source={{ uri: item.video }}
                    className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(playbackStatus) => {
                        if (playbackStatus.isLoaded && playbackStatus.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity 
                    className='relative justify-center items-center' 
                    activeOpacity={0.7} 
                    onPress={() => setPlay(true)}
                >
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


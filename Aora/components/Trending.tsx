import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import React, { useState, useRef, useEffect } from 'react'
import { icons } from '../constants';
import { Video, ResizeMode, Audio } from 'expo-av';

// Define custom animations
Animatable.initializeRegistryWithDefinitions({
    zoomIn: {
        from: { scaleX: 0.9, scaleY: 0.9 },
        to: { scaleX: 1.1, scaleY: 1.1 },
    },
    zoomOut: {
        from: { scaleX: 1.1, scaleY: 1.1 },
        to: { scaleX: 0.9, scaleY: 0.9 },
    },
});


const TrendingItem = ({ activeItem, item }: Record<string, any>) => {
    const [play, setPlay] = useState(false);
    const animatableRef = useRef<any>(null); // Ref for Animatable.View
    const videoRef = useRef<any>(null);

    useEffect(() => {
        // Trigger zoom animation when activeItem changes
        if (animatableRef.current) {
            if (activeItem === item.$id) {
                animatableRef.current.animate('zoomIn', 500); // Trigger zoomIn animation
            } else {
                animatableRef.current.animate('zoomOut', 500); // Trigger zoomOut animation
            }
        }
    }, [activeItem, item.$id]);

    useEffect(() => {
        if (play && videoRef.current) {
            videoRef.current.playAsync();
        }
    }, [play]);

    useEffect(() => {
        (async () => {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playThroughEarpieceAndroid: false,
            });
        })();
    }, []);

    const handlePlaybackStatusUpdate = (playbackStatus: any) => {
        console.log(`Playback status for ${item.$id}:`, playbackStatus);
        if (playbackStatus.isLoaded && playbackStatus.didJustFinish) {
            setPlay(false);
        }
    };

    return (
        <Animatable.View
            className="mr-5"
            ref={animatableRef}
        >
            { play ? (
                <Video
                // This was uri: items.video but the videos that were uploaded weren't supported, so this is a filler video
                    source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
                    className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    isMuted={false}
                    volume={1.0}
                    onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                />
            ) : (
                <TouchableOpacity 
                    className='relative justify-center items-center' 
                    activeOpacity={0.7} 
                    onPress={() => {setPlay(true)}}
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

    const viewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].item.$id);
        }
    }

    return (
        <FlatList 
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} key={item.$id}/>
            )}
            onViewableItemsChanged={viewableItemsChanged}
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


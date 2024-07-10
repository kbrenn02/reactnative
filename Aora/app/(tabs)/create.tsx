import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { Video, ResizeMode } from 'expo-av'
import * as DocumentPicker from 'expo-document-picker'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'

const Create = () => {

    const [uploading, setUploading] = useState(false)

    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
    })

    const openPicker = async (selectType: any) => {
        // Open up a modal that lets you pick and image or video
        const result = await DocumentPicker.getDocumentAsync
        ({
            type: selectType === 'image' 
                ? ['image/png', 'image/jpg']
                : ['video/mp4', 'video/gif']
        })

        if(!result.canceled) {
            if(selectType === 'image') {
                // the ...form spreads out the children elements in the form, keeping everything the same except for the
                // the one that is changed (as shown by the thumbnail: result)
                // @ts-ignore: Ignore the type error for now
                setForm({...form, thumbnail: result.assets[0] })
            }

            if(selectType === 'video') {
                // @ts-ignore: Ignore the type error for now
                setForm({...form, video: result.assets[0] })
            }
        } else {
            setTimeout(() => {
                Alert.alert('Document picked', JSON.stringify(result, null, 2))
            }, 100)
        }
    };

    const submit = () => {
        if(!form.title || !form.title || !form.thumbnail || !form.video) {
            return Alert.alert('Please fill in all the fields')
        }

        setUploading(true)

        try {
            

            Alert.alert('Success', 'Post uploaded successfully')

            router.push('/home')
        } catch (error) {
            Alert.alert('Error', 'There was an error uploading your content. Please try again.')
        } finally {
            setForm({
                title: '',
                video: null,
                thumbnail: null,
                prompt: ''
            })

            setUploading(false)
        }
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView className='px-4 my-6'>
                <Text className='text-2xl text-white font-psemibold'>
                    Upload Video
                </Text>

                <FormField 
                    title="Video Title"
                    value={form.title}
                    placeholder="Give your video a catchy title..."
                    handleChangeText={(e: string) => setForm({...form, title: e})}
                    otherStyles="mt-10"
                />

                {/* Space for user to upload their video */}
                <View className='mt-7 space-y-2'>
                    <Text className='text-base text-gray-100 font-pmedium'>
                        Upload Video
                    </Text>

                    <TouchableOpacity onPress={() => openPicker('video')}>
                        {form.video ? (
                            <Video 
                            // @ts-ignore: Ignore the type error for now
                                source={{ uri: form.video.uri }}
                                className='w-full h-64 rounded-2xl'
                                useNativeControls
                                resizeMode={ResizeMode.COVER}
                                isLooping
                            />
                        ) : (
                            <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                                    <Image 
                                        source={icons.upload}
                                        resizeMode='contain'
                                        className='w-1/2 h-1/2'
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                
                <View className='mt-7 space-y-2'>
                    <Text className='text-base text-gray-100 font-pmedium'>
                        Thumbnail Image
                    </Text>

                    <TouchableOpacity onPress={() => openPicker('image')}>
                        {form.thumbnail ? (
                            <Image 
                            // @ts-ignore: Ignore the type error for now
                                source={{ uri: form.thumbnail.uri }}
                                className='w-full h-64 rounded-2xl'
                                resizeMode='cover'
                            />
                        ) : (
                            <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'>
                                    <Image 
                                        source={icons.upload}
                                        resizeMode='contain'
                                        className='w-5 h-5'
                                    />
                                    <Text className='text-sm text-gray-100 font-pmedium'>
                                        Choose a file
                                    </Text>
                                </View>
                        )}
                    </TouchableOpacity>
                </View>

                <FormField 
                    title="AI Prompt"
                    value={form.prompt}
                    placeholder="The prompt you used to create this video"
                    handleChangeText={(e: string) => setForm({...form, prompt: e})}
                    otherStyles="mt-7"
                />

                <CustomButton 
                    title="Submit & Publish"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={uploading}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default Create
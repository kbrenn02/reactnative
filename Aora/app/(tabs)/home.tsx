import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'

const Home = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await getAllPosts();

                setData(response)
            } catch (error) {
                let errorMessage = 'An unknown error occurred'
                Alert.alert('Error', errorMessage)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [])

    console.log(data);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);

        setRefreshing(false);
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList 
              data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Text className='text-3xl text-white'>{item.id}</Text>
              )}
              ListHeaderComponent={() => (
                <View className='my-6 px-4 space-y-6'>
                    {/* Top part of screen with username and logo */}
                    <View className='justify-between items-start flex-row mb-6'>
                        <View>
                            <Text className='font-pmedium text-sm text-gray-100'>
                                Welcome Back
                            </Text>
                            <Text className='text-2xl font-psemibold text-white'>
                                kbrenn02
                            </Text>
                        </View>
                        <View className='mt-1.5'>
                            <Image 
                                source={images.logoSmall}
                                className='w-9 h-10'
                                resizeMode='contain'
                            />
                        </View>
                    </View>

                    {/* Next section with the search bar */}
                    <SearchInput />

                    {/* Section with most popular videos */}
                    <View className='w-full flex-1 pt-5 pb-8'>
                        <Text className='text-gray-100 text-lg font-pregular mb-3'>
                            Latest Videos
                        </Text>
                        <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []}/>
                    </View>
                </View>
              )}
              ListEmptyComponent={() => (
                <EmptyState
                    title="No Videos Found"
                    subtitle="Be the first one to upload a video"
                />
                // <Text className='text-white'>Empty</Text>
              )}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
        </SafeAreaView>
    )
}

export default Home
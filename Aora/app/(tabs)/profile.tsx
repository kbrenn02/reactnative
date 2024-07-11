import { View, FlatList, TouchableOpacity, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";
import { useState } from "react";

const Profile = () => {

    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    // User is potentially null.
    // @ts-ignore: Ignore the type error for now
    const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.id));
    // with how the 'User' is defined in GlobalProvider, I added an "id" attribute, not the $id that

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        // refetch was made in the useAppwrite.tsx file and basically just calls the fetch function
        // to reload what is being shown.
        // As a result, we are able to call the refetch function and refresh the page like on Insta, TikTok, etc.
        await refetch();
        setRefreshing(false);
    }

    const logout =  async() => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false)

        router.replace('/sign-in')
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                // Property '$id' does not exist on type 'never'.
                // @ts-ignore: Ignore the type error for now
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard video={item}/>
                )}

                ListHeaderComponent={() => (
                    <View className="w-full justify-center items-center mt-6 mb-12 px-4">
                        <TouchableOpacity
                            className="w-full items-end mb-10"
                            onPress={logout}
                        >
                            <Image 
                                source={icons.logout}
                                resizeMode="contain"
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>
                        {/* Avatar display */}
                        <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                            <Image 
                                source={{ uri: user?.avatar }}
                                className="w-[90%] h-[90%] rounded-lg"
                                resizeMode="cover"
                            />
                        </View>

                        {/* Username display */}
                        <InfoBox 
                            title={user?.username}
                            containerStyles='mt-5'
                            titleStyles='text-lg'
                        />

                        {/* Posts and followers display. They are side by side */}
                        <View className="mt-5 flex-row">
                            <InfoBox 
                                title={posts.length || 0}
                                subtitle="Posts"
                                containerStyles='mr-10'
                                titleStyles='text-xl'
                            />

                            <InfoBox 
                                title="1.4k"
                                subtitle="Followers"
                                titleStyles='text-xl'
                            />
                        </View>

                    </View>
                )}

                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos found for this search query"
                    />
                )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
            
        </SafeAreaView>
    );
};

export default Profile;
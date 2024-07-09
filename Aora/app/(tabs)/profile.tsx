import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "@/constants";

const Profile = () => {

    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    // User is potentially null.
    // @ts-ignore: Ignore the type error for now
    const { data: posts } = useAppwrite(() => getUserPosts(user.id));
    // with how the 'User' is defined in GlobalProvider, I added an "id" attribute, not the $id that

    const logout = () => {

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
                        <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                            <Image 
                                source={{ uri: user?.avatar }}
                                className="w-[90%] h-[90%] rounded-lg"
                                resizeMode="cover"
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
            />
            
        </SafeAreaView>
    );
};

export default Profile;
import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { createUser, getCurrentUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {

    const { setUser, setIsLoggedIn } = useGlobalContext();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if(!form.username || !form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields')
        }

        setIsSubmitting(true);

        try {
            const result = await createUser({email:form.email, password:form.password, username:form.username});
            
            const currentUser = await getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
                setIsLoggedIn(true);
                router.replace('/home');
            } else {
                setUser(null);
                setIsLoggedIn(false);
                // Handle case where user is not found
                console.error("User not found");
            }
        } catch (error) {
            console.error(error);

            let errorMessage = 'An unknown error occurred';

             if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }

            Alert.alert('Error', errorMessage);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <KeyboardAvoidingView 
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0} // Adjust this value as needed
            >
            <ScrollView>
                <View className='w-full justify-center min-h-[80vh] px-4 my-6'>
                    <Image 
                      source={images.logo}
                      resizeMode='contain'
                      className='w-[155px] h-[35px] -left-5'
                    />

                    <Text 
                      className='text-2xl text-white text-semibold mt-10 font-psemibold'>
                        Sign Up to Aora
                    </Text>

                    <FormField 
                      title="Username"
                      value={form.username}
                      handleChangeText={(e:string) => setForm({ ...form, username: e })}
                      otherStyles="mt-10"
                    />
                    <FormField 
                      title="Email"
                      value={form.email}
                      handleChangeText={(e:string) => setForm({ ...form, email: e })}
                      otherStyles="mt-7"
                      keyboardType="email-address"
                    />
                    <FormField 
                      title="Password"
                      value={form.password}
                      handleChangeText={(e:string) => setForm({ ...form, password: e })}
                      otherStyles="mt-7"
                    />

                    <CustomButton 
                      title="Create Account"
                      handlePress={submit}
                      containerStyles="mt-7"
                      isLoading={isSubmitting}
                    />

                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-gray-100 font-pregular'>
                            Have an account?
                        </Text>
                        <Link href='/sign-in' className='text-lg font-psemibold text-secondary'>Sign In</Link>
                    </View>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUp
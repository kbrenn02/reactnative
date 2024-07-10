import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {

    const { setUser, setIsLoggedIn } = useGlobalContext();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if(!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields')
        }

        setIsSubmitting(true);

        try {
            await signIn({email:form.email, password:form.password});
            
            const result = await getCurrentUser();
            if (result) {
                setUser(result);
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
                        Log in to Aora
                    </Text>

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
                      title="Sign In"
                      handlePress={submit}
                      containerStyles="mt-7"
                      isLoading={isSubmitting}
                    />

                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-gray-100 font-pregular'>
                            Don't have an account?
                        </Text>
                        <Link href='/sign-up' className='text-lg font-psemibold text-secondary'>Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignIn
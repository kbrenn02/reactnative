import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const SignUp = () => {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = () => {

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
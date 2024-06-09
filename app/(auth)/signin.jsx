import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomBotton from '../../components/CustomBotton'
import { Link, router } from 'expo-router'
import { getCurrentUser, sign_In } from '../../lib/appwrite'
import { useGlobalcontext } from '../../context/GlobalProvider'
import { StatusBar } from 'expo-status-bar'


const signIn = () => {
  const [form, setform] = useState({
    email: "",
    password: ""
  })

  const { isLoading, isLoggedIn, setUser, setIsLoggedIn } = useGlobalcontext();

  const [loading, setLoading] = useState(false);

  const submit = async() => {
    if(!form.email || !form.password){
      Alert.alert("Error", "Please fill in all the fields");
    }
    setLoading(true);
    
    try {
      await sign_In(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true)
      Alert.alert("Success", "Sign in successfull")
      router.replace('/home')
    } catch (error) {
      Alert.alert("Error", error.message)
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]"/>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold ">Log in to Aora</Text>

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setform({...form, email:e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({...form, password:e})}
            otherStyles="mt-7"
          />

          <CustomBotton 
            title="Sign In"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={loading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account? <Link href="/signup" className='font-psemibold text-secondary-100'>SignUp</Link>
            </Text>
          </View>
          
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  )
}

export default signIn
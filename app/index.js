import { Link, Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../constants"
import CustomBotton from '../components/CustomBotton';
import { useGlobalcontext } from '../context/GlobalProvider';

export default function App() {

  const { isLoading, isLoggedIn } = useGlobalcontext();

  if(!isLoading && isLoggedIn){
    return <Redirect href={"/home"}/>
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image className="w-[134px] h-[84px]" resizeMode='contain' source={images.logo}/>

          <Image className="max-w-[380px] w-full h-[300px]" resizeMode='contain' source={images.cards}/>

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover endless possibilities with <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image className="w-[106px] h-[15px] absolute -bottom-2 -right-3" resizeMode='contain' source={images.path}/>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation : embark on a journey of limitless exploration with Aora
          </Text>

          <CustomBotton 
            title="Continue with Email"
            handlePress={() => {router.push("/signin")}}
            containerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}


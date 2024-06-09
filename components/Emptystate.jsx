import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import {router} from "expo-router"
import CustomBotton from "../components/CustomBotton"

const Emptystate = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
        <Image className="w-[270px] h-[215px]" resizeMode='contain' source={images.empty}/>
        <Text className="text-xl font-psemibold text-white mt-1">{title}</Text>
        <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

        <CustomBotton 
            title="Create Video"
            handlePress={() => router.push('/create')}
            containerStyle="w-full my-5"
        />
    </View>
  )
}

export default Emptystate
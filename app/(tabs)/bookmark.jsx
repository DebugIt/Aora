import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from 'expo-status-bar'

const Bookmark = () => {
  return (
    <SafeAreaView className="bg-primary h-full justify-center items-center">
      <Text className="text-white text-2xl font-psemibold">We are working on it :)</Text>
      <Text className="text-gray-100 text-sm text-center font-pregular mx-3">The update will be rolledout with the next release, thankyou for your patience</Text>
    
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  )
}

export default Bookmark
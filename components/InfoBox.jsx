import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({ title, subtitle, containerStyles, titleStyle }) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyle}`}>{title}</Text>
      <Text className={`text-sm text-green-100 text-center font-pregular ${titleStyle}`}>{subtitle}</Text>
    </View>
  )
}

export default InfoBox
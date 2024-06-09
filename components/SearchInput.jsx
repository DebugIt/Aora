import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from "../constants"
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery ,title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

  const pathName = usePathname()
  const [query, setQuery] = useState(initialQuery || "")

  return (
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-[#1e1e2d] rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular" value={query} onChangeText={e => setQuery(e)} placeholder="Search for a video topic" placeholderTextColor="#CDCDE0" />
        <TouchableOpacity 
          onPress={() => {
            if(!query){
              return Alert.alert("Missing Query", "Please enter some text to search for results")
            }

            if(pathName.startsWith('/search')){
              router.setParams({query})
            }
            else{
              router.push(`/search/${query}`)
            }
          }}
        >
            <Image className="w-5 h-5" resizeMode='contain' source={icons.search}/>
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput
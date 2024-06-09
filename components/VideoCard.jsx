import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av';


const VideoCard = ({ video : { title, video, thumbnail, creator : { username, avatar } } }) => {
    
    const [play, setPlay] = useState(false);
  
    return (
    <View className="flex-col items-center px-4 mb-14">
    
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center p-0.5">
                    <Image source={{uri: avatar}} 
                        className="w-full h-full rounded-lg"
                        resizeMode='cover'
                    />
                </View>
                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-psemibold text-sm " numberOfLines={1}>
                        {title}
                    </Text>
                    <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                        {username}
                    </Text>

                    {/* lol */}
                </View>
            </View>
            <View className="pt-2 ">
                <Image className="w-5 h-5" resizeMode='contain' source={icons.menu}/>
            </View>
        </View>
        
        {
            play ? (
                <Video  
                    source={{uri:video}}
                    className="w-full h-60 rounded-xl "
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if(status.didJustFinish){
                        setPlay(false);
                        }
                    }}
                />
                // lol
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                >
                    <Image className="w-full h-full rounded-xl mt-3" resizeMode='cover' source={{uri:thumbnail}}/>
                    <Image className="w-12 h-12 absolute" resizeMode='cover' source={icons.play}/>
                </TouchableOpacity>
            )
        }

    </View>
  )
}

export default VideoCard
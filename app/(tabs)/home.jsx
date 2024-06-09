import { View, Text, FlatList, Image, StatusBar, RefreshControlComponent, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"

import {images} from "../../constants"
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import Emptystate from '../../components/Emptystate'
import { getLatestPosts, getallPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalcontext } from '../../context/GlobalProvider'

const Home = () => {

  const { data:posts, refetch } = useAppwrite(getallPosts);
  const { data:latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, isLoggedIn, user, setUser, setIsLoggedIn } = useGlobalcontext();


  const onRefresh = async () => {
    setRefreshing(true);
    // re-call to check if any new videos are posted
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        // used to render a list of elements
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard 
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5 ">
                <Image className="w-10 h-10" resizeMode='contain' source={images.logoSmall} />
              </View>
            </View>

            {/* search import component */}
            <SearchInput />

            {/* latest view section */}
            <View className="w-full flex-1 mt-5 mb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
              <Trending 
                posts={ latestPosts ?? []  }
              />
            </View>


          </View>
        )}
        ListEmptyComponent={() => (
            <Emptystate 
              title="No Videos Found"
              subtitle="Be the first to upload a video"
            />
        )} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  )
}

export default Home
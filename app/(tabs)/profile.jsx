import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  RefreshControlComponent,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import Emptystate from "../../components/Emptystate";
import { getUserposts, lgout_user, searchPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalcontext } from "../../context/GlobalProvider";
import InfoBox from "../../components/InfoBox";


const Profile = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser, isLoading } = useGlobalcontext();
  
  const { data: posts } = useAppwrite(() =>  getUserposts(user.$id));
  

  const logout = async() => {
    await lgout_user();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/signin')
  }
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // used to render a list of elements
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View
            className="w-full justify-center items-center mt-6 mb-12 px-4"
          >
            <TouchableOpacity className="w-full items-end mb-10"
              onPress={() => logout()}
            >
              <Image className="w-6 h-6 " resizeMode="contain" source={icons.logout}/>
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center">
              <Image className="w-[90%] h-[90%] rounded-lg" resizeMode="cover" source={{uri:user?.avatar}}/>
            </View>
            <InfoBox 
              title={user?.username}
              containerStyles="mt-5"
              titleStyle="text-lg"
            />
            <View className="mt-5 flex-row">
              <InfoBox 
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyle="text-xl"
              />

              <InfoBox 
                title="1.2k"
                subtitle="Followers"
                titleStyle="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Emptystate
            title="No Videos Found"
            subtitle="No videos found for this search "
          />
        )}
      />
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
};

export default Profile;

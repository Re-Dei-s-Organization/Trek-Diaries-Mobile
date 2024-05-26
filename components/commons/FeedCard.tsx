import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { images } from '@/constants';
import handleRegisteredTime from '@/lib/utilities/handleRegisteredTime';

interface Owner {
  id: string;
  name: string;
}

interface Location {
  id: string;
  address: string;
}

export default function FeedCard({
  userId,
  id,
  location,
  registered_time,
  description,
  likes,
  imageURL,
  owner,
  rating,
}: {
  userId: string | undefined;
  id: string;
  location: Location;
  registered_time: string;
  description: string;
  likes: number;
  imageURL: string;
  owner: Owner;
  rating: number;
}) {
  return (
    <View>
      <View className="m-3 p-4 bg-black-100 rounded-2xl">
        <View className="flex-row items-center mt-4 gap-5 p-2 relative">
          <View>
            <Image source={images.userLogo} className="w-14 h-14" resizeMode="contain" />
          </View>
          <View className="flex-row space-x-2">
            <View className="flex-col">
              <Text className="text-white  font-psemibold">{owner?.name}</Text>
              <Text className="text-slate-400 font-pmedium text-[12px]">{location.address}</Text>
              <Text className="text-slate-500 font-pbook text-[12px]">
                {handleRegisteredTime(registered_time)}
              </Text>
            </View>
          </View>
          <View className="absolute right-3 top-5">
            <TouchableOpacity className="hover:text-gray-500">
              <SimpleLineIcons name="user-follow" size={20} color="white" />
              {/* <SimpleLineIcons name="user-following" size={20} color="white" /> */}
            </TouchableOpacity>
          </View>
        </View>
        <View className="m-2">
          <Text className="text-white font-pbook my-2 text-justify">{description}</Text>
        </View>
        <View className="my-2 rounded-2xl">
          {/* <Text className="text-white">{imageURL}</Text> */}

          <Image
            source={{ uri: imageURL }}
            className="h-60 w-full rounded-2xl"
            resizeMode="contain"
            onError={(error) => console.log('Image Load Error:', error.nativeEvent.error)}
          />
        </View>
        <View className="flex-row space-x-4 items-center justify-start my-2">
          <View className="flex-row items-center  ">
            <Ionicons name="heart" size={32} color="red" />
            <Text className="text-white font-pmdedium text-[20px] text-center m-2 pb-1">
              {likes}
            </Text>
          </View>
          <FontAwesome5 name="comment-alt" size={25} color="grey" />
        </View>
      </View>
    </View>
  );
}
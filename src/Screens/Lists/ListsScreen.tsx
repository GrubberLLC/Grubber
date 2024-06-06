import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import FeedHeader from '../../Components/Headers/FeedHeader'
import ListHeader from '../../Components/Headers/ListHeader'
import { useList } from '../../Context/ListContext'
import { useAuth } from '../../Context/UserContext'
import ListTile from '../../Components/Tile/ListTile'

const ListsScreen = () => {

  const {userLists, getUserLists} = useList()
  const {userProfile} = useAuth()

  useEffect(() => {
    getUserLists(userProfile ? userProfile.user_id : '')
  }, [])

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <ListHeader />
      <ScrollView className='flex-1'>
        {
          userLists && userLists.length > 0
            ? <View className='flex-1'>
                {
                  userLists.map((list: any) => {
                    return(
                      <View key={list.list_id}>
                        <ListTile list={list}/>
                      </View>
                    )
                  })
                }
              </View>
            : null
        }
      </ScrollView>
    </View>
  )
}

export default ListsScreen

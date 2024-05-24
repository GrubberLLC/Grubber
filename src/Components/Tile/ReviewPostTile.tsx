import React from 'react'
import { View, Image, ScrollView } from 'react-native';
import PostProfile from '../Profiles/PostProfile'
import FullImageComponent from '../Images/FullImageComponent'
import CaptionComponent from '../Info/CaptionComponent'
import PostSubMenu from '../Menus/PostSubMenu'
import PlacePostSummary from '../Places/PlacePostSummary'
import MenuSubButtonComponent from '../Buttons/MenuSubButtonComponent'
import { useAuth } from '../../Context/UserContext'
import { usePost } from '../../Context/PostContext'
import NewPostImageComponent from '../Images/NewPostImageComponent';
import NewPostPlaceSummary from '../Places/NewPostPlaceSummary';


const ReviewPostTile = () => {

  const {userProfile} = useAuth()
  const {postPicture, postPlace, postCaption} = usePost()

  return (
    <ScrollView className='bg-skys-500 w-full'>
      {/* <PostProfile profile={userProfile}/> */}
      <NewPostImageComponent image={postPicture ? postPicture.uri : null}/>
      <NewPostPlaceSummary 
        image={postPlace && postPlace.image ? postPlace.image : ''} 
        name={postPlace && postPlace.name ? postPlace.name : ''} 
        rating={postPlace && postPlace.rating ? postPlace.rating : 0} 
        reviews={postPlace && postPlace.review_count ? postPlace.review_count : 0}/>
      <CaptionComponent caption={postCaption}/>
    </ScrollView>
  )
}

export default ReviewPostTile

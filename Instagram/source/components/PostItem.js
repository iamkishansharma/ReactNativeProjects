import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  SnapshotViewIOSBase,
} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';

const PostItem = ({item, userDetails, keyy}) => {
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const likeDislike = () => {
    if (isLiked) {
      database()
        .ref(`posts/${keyy}/votes/${userDetails.uid}`)
        .set({
          liked: false,
        })
        .then(() => {
          console.log('disliked....' + userDetails.userName);

          const val = like - 1;
          setLike(val);
          database().ref(`/posts/${keyy}`).update({
            likes: val,
          });
          setIsLiked(false);
        });
    } else {
      database()
        .ref(`posts/${keyy}/votes/${userDetails.uid}`)
        .set({
          liked: true,
        })
        .then(() => {
          setIsLiked(true);
          console.log('liked....' + userDetails.userName);

          const val = like + 1;
          setLike(val);
          database().ref(`/posts/${keyy}`).update({
            likes: val,
          });
        });
    }
  };
  useEffect(() => {
    database()
      .ref(`/posts/${keyy}`)
      .on('value', snap => {
        const a = snap.val().likes;
        console.log(a);
        setLike(a);
      });

    database()
      .ref(`posts/${keyy}/votes/${userDetails.uid}`)
      .on('value', snap => {
        if (snap.val() !== null) {
          if (snap.val().liked) {
            setIsLiked(true);
          }
        }
      });
  }, []);

  return (
    <View
      style={{
        elevation: 10,
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Avatar source={{uri: item.userImage}} size={30} />
          <Text style={[styles.header, {marginStart: 5}]}>{item.instaId}</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-vertical" size={26} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Image
          resizeMode="cover"
          source={{uri: item.picture}}
          width={1}
          height={1}
          style={{width: '100%', height: 350}}
        />
      </TouchableOpacity>
      <Text style={styles.header}>{item.likes} likes</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.header]}>{item.instaId}</Text>
        <Text style={[styles.bodyText, {width: '80%'}]}>
          {item.description}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={likeDislike}>
            {isLiked ? (
              <Fontisto
                name="heart"
                size={26}
                style={[styles.icon]}
                color="red"
              />
            ) : (
              <AntDesign
                name="hearto"
                size={26}
                style={[styles.icon]}
                color="black"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <Fontisto name="hipchat" size={26} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="send" size={26} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Feather name="bookmark" size={26} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PostItem;
const styles = StyleSheet.create({
  header: {
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
  },
  bodyText: {
    fontSize: 16,
    color: '#000',
    marginStart: 5,
  },
  icon: {
    padding: 5,
  },
});

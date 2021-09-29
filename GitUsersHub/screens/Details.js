import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Axios from 'axios';
import {Avatar, LinearProgress} from 'react-native-elements';
import randomColor from 'randomcolor';
import {URL, ITEM_SIZE, TEXT_COLOR, ListItem, BG_COLOR} from '../Constants';

const Details = ({navigation, route}) => {
  const [receivedUser, setReceivedUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [stars, setStars] = useState(0);
  const [repos, setRepos] = useState(0);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const [data, setData] = useState({
    avatar_url: 'https://google.com/logo.png',
    name: 'Example Name',
    login: 'example123',
    bio: 'I am a software engineer.',
    company: 'Example Inc.',
  });

  const [activityData, setActivityData] = useState([
    {
      id: '',
      type: '',
      created_at: '',
      actor: {avatar_url: 'https://google.com/logo.png', display_login: ''},
      repo: {name: '', public: false, url: ''},
      payload: {
        ref: '',
        description: '',
        head: '',
        commits: [
          {author: {name: '', message: ''}, sha: '', url: ''},
          {
            author: {name: '', message: ''},
            sha: '',
            url: '',
          },
        ],
      },
    },
  ]);
  // Re loading every time user sees a screen
  useEffect(() => {
    const {username} = route.params;
    setReceivedUser(username);
    fetchDetails({username});
    fetchActivities({username});
  }, []);
  const fetchDetails = async ({username}) => {
    // Showing loading screen
    setLoading(true);
    // Connecting and fetching the data from RESTful API
    try {
      await Axios.get(`${URL}/${username}`)
        .then(response => {
          // users' all details copied
          console.log('Details fetched Success ====>' + response.status);
          // setting the received data to local object
          setData(response.data);
        })
        .catch(error => {
          console.log('Inner Catch ====> ' + error);
        });
    } catch (err) {
      console.log('Outer Catch ====>   ' + err);
    }

    try {
      // FOLLOWERS COUNT
      await Axios.get(`${URL}/${username}/followers`)
        .then(res => setFollowers(res.data.length))
        .catch(err => console.log(err));

      // FOLLOWINGS COUNT
      await Axios.get(`${URL}/${username}/following`)
        .then(res => setFollowing(res.data.length))
        .catch(err => console.log(err));

      // No of REPOS COUNT
      await Axios.get(`${URL}/${username}/repos`)
        .then(res => setRepos(res.data.length))
        .catch(err => console.log(err));

      // No of STARRED COUNT
      await Axios.get(`${URL}/${username}/starred`)
        .then(res => setStars(res.data.length))
        .catch(err => console.log(err));
    } catch (error) {}
    // Stopping loading screen
    setLoading(false);
  };
  ///////////////////// CALLING ACTIVITY DATA
  const fetchActivities = async ({username}) => {
    // Showing loading screen
    setLoading(true);
    // Connecting and fetching the data from RESTful API
    try {
      await Axios.get(`${URL}/${username}/events`)
        .then(response => {
          // users' all details copied
          console.log(' Response ==<<<<' + response.status);
          // setting the received data to local object
          setActivityData(response.data);
        })
        .catch(error => {
          console.log('Activity Inner ====> ' + error);
        });
    } catch (err) {
      console.log('Activity Outer ====>   ' + err);
    }
    // Stopping loading screen
    setLoading(false);
  };

  // Custom icons with title, count and link
  const Iconnn = ({title, count}) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            width: 80,
            height: 80,
            elevation: 10,
            borderRadius: 10,
            alignItems: 'center',
            backgroundColor: 'pink',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: TEXT_COLOR,
              fontSize: 20,
              textAlign: 'center',
            }}>
            {count}
          </Text>
          <Text
            style={{
              color: TEXT_COLOR,
              fontSize: 12,
              textAlign: 'center',
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // ====== List Items UI ======= START
  const renderItem = ({item, index}) => {
    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];

    const scale = scrollY.interpolate({
      inputRange: inputRange,
      outputRange: [1, 1, 1, 0],
    });
    return (
      <ListItem
        scale={scale}
        user={item}
        color={randomColor({
          luminosity: 'light',
          hue: 'blue',
        })}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.heading}>Loading...</Text>
        <LinearProgress color="#000" style={{margin: 20, fontSize: 20}} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.login == 'a' && data.avatar_url == 'a' ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.heading}>No details found</Text>
        </View>
      ) : (
        <>
          <View
            style={{
              backgroundColor: 'pink',
              flex: 0,
              marginTop: 25,
              marginHorizontal: 15,
              elevation: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                marginTop: -20,
                elevation: 15,
                backgroundColor: 'transparent',
                alignSelf: 'center',
              }}>
              <Avatar
                rounded
                title="EN"
                source={{uri: data.avatar_url}}
                size={130}
              />
            </View>
            <Text
              style={{
                fontSize: 25,
                color: TEXT_COLOR,
                fontWeight: '300',
                alignSelf: 'center',
              }}>
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: TEXT_COLOR,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              @{data.login}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
              }}>
              <Iconnn title="Repos" link="repos-linl" count={repos} />
              <Iconnn title="Starred" link="stars-link" count={stars} />
              <Iconnn
                title="Following"
                link="following-link"
                count={following}
              />
              <Iconnn
                title="Followers"
                link="followers-link"
                count={followers}
              />
            </View>
          </View>

          <View
            style={{
              backgroundColor: BG_COLOR,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {activityData == null || activityData.length == 0 ? (
              <Text style={styles.heading}>No activty</Text>
            ) : (
              <View style={{flex: 1}}>
                <Text
                  style={{
                    marginHorizontal: 20,
                    marginVertical: 15,
                    fontWeight: 'bold',
                    color: TEXT_COLOR,
                  }}>
                  Latest Activities:
                </Text>
                <Animated.FlatList
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: true},
                  )}
                  data={activityData}
                  renderItem={renderItem}
                  keyExtractor={users => users.id}
                />
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
};
export default Details;
const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    flex: 1,
  },
  scrollView: {
    backgroundColor: BG_COLOR,
    flex: 1,
  },

  heading: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 5,
  },
  emptyContainer: {
    backgroundColor: BG_COLOR,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

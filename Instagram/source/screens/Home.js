import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList, View, Text} from 'react-native';

//Reduc imports
import {connect} from 'react-redux';
import {getPosts} from '../redux/action/post';
import propTypes from 'prop-types';

import LoaderContainer from '../components/LoaderContainer';
import PostItem from '../components/PostItem';

const Home = ({getPosts, postState, userDetails}) => {
  useEffect(() => {
    getPosts();
  }, []);

  if (postState.loading) {
    return <LoaderContainer />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={postState.posts}
        keyExtractor={item => item.uid}
        renderItem={({item, index, separators}) => (
          <PostItem item={item} keyy={item.uid} userDetails={userDetails} />
        )}
        // ListEmptyComponent={() => {
        //   return (
        //     <View
        //       style={[
        //         styles.container,
        //         {alignItems: 'center', justifyContent: 'center'},
        //       ]}>
        //       <Text style={{fontSize: 30, fontWeight: 'bold'}}>
        //         No items found
        //       </Text>
        //       <Icon name="warning" size={50} color="yellow" />
        //     </View>
        //   );
        // }}
      />
    </SafeAreaView>
  );
};
// Redux setup
const mapStateToProps = state => ({
  postState: state.post,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  getPosts,
};

Home.proptypes = {
  getPosts: propTypes.func.isRequired,
  postState: propTypes.object.isRequired,
  userDetails: propTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'green',
  },
});

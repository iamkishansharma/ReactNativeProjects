import React, {useState} from 'react';
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

//for file creation -- START
var RNFS = require('react-native-fs');
var path = RNFS.DocumentDirectoryPath + '/test.png';
//for file creation -- END

const PendingView = () => {
  return (
    <View
      style={{
        fles: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
};

const App = () => {
  const [image, setImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  function setImageDimension() {
    Image.getSize(
      image,
      (width, height) => {
        console.log(`The image dimensions are ${width}x${height}`);
        setImageWidth(width);
        setImageHeight(height);
      },
      error => {
        console.error(`Couldn't get the image size: ${error.message}`);
      },
    );
  }

  const takePicture = async camera => {
    try {
      const options = {quality: 0.9, base64: false};
      const data = await camera.takePictureAsync(options);

      setImage(data.uri);
    } catch (error) {
      console.console.warn(error);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#383CC1" />
      <View style={styles.container}>
        {image ? (
          /* <Text>Image is present</Text> */
          <ScrollView style={{flex: 1, width: '100%'}}>
            <View style={styles.clickedPreview}>
              {setImageDimension()}

              <Text style={styles.camText}>Here is your clicked picture</Text>
              <Image
                style={styles.clickedImage}
                source={{
                  uri: image,
                  width: imageWidth / 7,
                  height: imageHeight / 6,
                }}
              />
              <View style={{flex: 0, flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => {
                    setImage(null);
                  }}>
                  <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => {
                    setImage(null);
                  }}>
                  <Text>Exit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : (
          /* <Text>Image is NOT present</Text> */
          <RNCamera
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            flashMode={RNCamera.Constants.FlashMode.on}
            style={styles.preview}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'Do you want to use camera?',
              buttonPositive: 'Yes',
              buttonNegative: 'No',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio',
              message: 'Do you want to record audio?',
              buttonPositive: 'Yes',
              buttonNegative: 'No',
            }}>
            {({camera, status}) => {
              if (status !== 'READY') {
                return <PendingView />;
              }
              return (
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      takePicture(camera);
                    }}>
                    <Image
                      style={styles.captureButton}
                      source={require('./assets/camera.png')}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>
        )}
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#383CC1',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  preview: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'white',
    padding: 2,
    width: 100,
    height: 100,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderRadius: 150,
    borderWidth: 3,
    margin: 50,
  },
  clickedPreview: {
    flex: 1,
    width: '100%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camText: {
    backgroundColor: '#3498DB',
    color: 'white',
    width: '100%',
    borderRadius: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 25,
  },
  clickedImage: {
    borderRadius: 16,
    borderColor: 'green',
    borderWidth: 3,
    marginTop: 30,
    marginBottom: 80,
  },
  saveButton: {
    margin: 2,
    borderRadius: 8,
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
});

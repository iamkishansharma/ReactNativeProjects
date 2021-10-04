import {PermissionsAndroid, ToastAndroid} from 'react-native';
export const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      !granted['android.permission.READ_EXTERNAL_STORAGE'] === 'denied' &&
      !granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'denied'
    ) {
      console.log('Permission Given .....' + granted);
    }

    if (
      granted['android.permission.READ_EXTERNAL_STORAGE'] === 'denied' ||
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'denied'
    ) {
      ToastAndroid.show(
        "You can't proceed without permissions.",
        ToastAndroid.LONG,
      );
      requestPermission();
    }
  } catch (error) {
    console.log('Permission error!....' + error);
  }
};

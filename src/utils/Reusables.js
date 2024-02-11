import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect} from 'react';
import {Linking} from 'react-native';
import {PERMISSIONS, check, request} from 'react-native-permissions';

export const isNotEmpty = param => {
  return param != null && param !== undefined && param !== '';
};

export const saveLocalStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Error saveLocalStorage : ', error);
  }
};

export const getLocalStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (isNotEmpty(value)) {
      return value;
    }
  } catch (error) {
    console.log('Error getLocalStorage : ', error);
  }
};

export const deleteLocalStorage = async key => {
  try {
    const value = await AsyncStorage.removeItem(key);
    if (isNotEmpty(value)) {
      return value;
    }
  } catch (error) {
    console.log('Error deleteLocalStorage : ', error);
  }
};

export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function useDounce(effect, dependencies, delay) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

export const ALLOW_LOADER = 'on';
export const FREEZE_LOADER = 'off';

export const calculateMonthName = monthNumber => {
  switch (monthNumber) {
    case '01':
      return 'Jan';
    case '02':
      return 'Feb';
    case '03':
      return 'Mar';
    case '04':
      return 'Apr';
    case '05':
      return 'May';
    case '06':
      return 'Jun';
    case '07':
      return 'Jul';
    case '08':
      return 'Aug';
    case '09':
      return 'Sep';
    case '10':
      return 'Oct';
    case '11':
      return 'Nov';
    case '12':
      return 'Dec';
    default:
      return 'Jan';
  }
};

export const getToken = async () => {
  return await getLocalStorage('token');
};

export const consoleLog = (key, value) => {
  console.log(key, value);
};

export const download = remoteUrl => {
  consoleLog('URL : ', remoteUrl);

  Linking.canOpenURL(remoteUrl).then(supported => {
    if (supported) {
      return Linking.openURL(remoteUrl);
    } else {
      return Linking.openURL(remoteUrl);
    }
  });
};

export const NOTIFICATION_TYPE = 1;

export const getLectureButtonText = section => {
  if (
    !section.course_user ||
    (section.course_user && section.course_user.status === 'Not Started')
  ) {
    return 'Start Lecture';
  } else if (
    section.course_user &&
    section.course_user.status === 'In Progress'
  ) {
    return 'Continue Lecture';
  } else if (
    section.course_user &&
    (section.course_user.status === 'Completed' ||
      section.course_user.status === 'Ready To Test')
  ) {
    return 'Review Lecture';
  }
};

export const requestNotificationPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  return result;
};

export const checkNotificationPermission = async () => {
  const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  return result;
};

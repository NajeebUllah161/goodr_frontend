import axios from 'axios';
import {LOADER_OFF, LOADER_ON} from '../Types';
import {apiClient} from './axiosInstance';
import {STATUS_CODE} from '../../constants/theme';

const apiCall =
  (config, successType, loaderStatus = 'on', loaderStatusClose = 'on') =>
  async dispatch => {
    if (loaderStatus === 'on') {
      dispatch({type: LOADER_ON});
    }

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    console.log('REQ Params : ', config);
    const {data} = await apiClient({
      ...config,
      cancelToken: source.token,
    }).catch(function (error) {
      if (error?.code === 'ERR_NETWORK' || error?.message === 'Network Error') {
        console.log('Error Code : ', error.code);
        console.log('Error Message : ', error.message);
        dispatch({
          type: 'ERROR',
          payload: {
            title: 'Network Error',
            error: 'Please check your internet connectivity',
          },
        });
      }
      if (error.response) {
        if (error.response.status === STATUS_CODE.UNAUTHORIZED) {
          dispatch({type: successType, payload: error.response.data});
          dispatch({
            type: 'ERROR',
            payload: {title: 'Error', ...error.response.data},
          });
          if (loaderStatusClose === 'on') {
            dispatch({type: LOADER_OFF});
          }
          return;
        }
        if (error.response.status === 405) {
          dispatch({
            type: 'ERROR',
            payload: {
              title: 'Error 405',
              error: 'Method not allowed',
            },
          });
        }

        if (error.response.status === 500) {
          dispatch({
            type: 'ERROR',
            payload: {
              title: 'Error 500',
              error: 'Server Error',
            },
          });
        }

        console.log('Data Error : ', error.response.data);
        console.log('Status Error : ', error.response.status);
        console.log('Header Error : ', error.response.headers);
      } else if (error.request) {
        console.log('Request Error : ', error.request);
      } else {
        console.log('Message Error : ', error.message);
      }
      if (loaderStatusClose === 'on') {
        dispatch({type: LOADER_OFF});
      }
      console.log('Config Error : ', error.config);
    });
    dispatch({type: successType, payload: data});
    // dispatch({
    //   type: 'ERROR',
    //   payload: {title: 'Error', ...data},
    // });
    if (loaderStatusClose === 'on') {
      dispatch({type: LOADER_OFF});
    }
  };

export default apiCall;

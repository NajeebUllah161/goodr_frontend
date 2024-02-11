/* eslint-disable react-native/no-inline-styles */
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize as fp,
  responsiveHeight as hp,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {useUpdateEffect} from 'react-use';
import {RootStackParamList} from '../../Main';
import ArrowBlue from '../assets/images/arrow_blue.svg';
import DeleteIcon from '../assets/images/delete.svg';
import LogoutIcon from '../assets/images/logout.svg';
import {DeleteProductResponse} from '../classes/DeleteProductResponse';
import {LoginResponse} from '../classes/LoginResponse';
import {ProductsResponse} from '../classes/ProductResponse';
import EmptyListComponent from '../components/EmptyListComponent';
import Loader from '../components/Loader';
import {ASSETS, COLORS_PRIMARY, FONTS, SIZES} from '../constants';
import {END_POINTS, METHODS} from '../constants/theme';
import {DELETE_PRODUCT, PRODUCTS} from '../redux/Types';
import apiCall from '../redux/actions/apiCall';
import {consoleLog} from '../utils/Reusables';

export type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'product'
>;

const ProductScreen = ({navigation}: {navigation: any}) => {
  const [productsData, setProductsData] = useState<any>([]);
  const loginResponse: LoginResponse = useSelector(
    (state: any) => state.auth?.loginResponse,
  );
  const productsResponse: ProductsResponse = useSelector(
    (state: any) => state.product?.productResponse,
  );
  const deleteProductResponse: DeleteProductResponse = useSelector(
    (state: any) => state.product?.deleteProductResponse,
  );
  const loading = useSelector((state: any) => state.loader?.loaderStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1) Products Response
  useUpdateEffect(() => {
    if (productsResponse.data) {
      consoleLog('Success Products Response : ', productsResponse);
      setProductsData(productsResponse?.data);
    } else {
      consoleLog('Error Products Response : ', productsResponse.error);
    }
  }, [productsResponse]);

  // 2) Delete Product Response
  useUpdateEffect(() => {
    if (deleteProductResponse.data) {
      consoleLog('Success Delete Product Response : ', deleteProductResponse);
      fetchProducts();
    } else {
      consoleLog('Error Delete Product : ', deleteProductResponse.error);
    }
  }, [deleteProductResponse]);

  const fetchProducts = () => {
    const config = {
      url: END_POINTS.PRODUCTS,
    };

    dispatch<any>(apiCall(config, PRODUCTS));
  };

  const productDetailHandler = (id: number) => {
    navigation.navigate('productDetail', {id});
  };

  const deleteProductHandler = (id: number, name: string) => {
    Alert.alert('Delete', `Are you sure you want to delete ${name} ?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => executeDeletion(id),
        style: 'destructive',
      },
    ]);
  };

  const executeDeletion = (id: number) => {
    const config = {
      url: END_POINTS.DELETE_PRODUCT + `/${id}`,
      method: METHODS.DELETE,
    };
    dispatch<any>(apiCall(config, DELETE_PRODUCT));
  };

  const logoutHandler = () => {
    Alert.alert('Logout', 'Are you sure to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => navigation.goBack(),
        style: 'destructive',
      },
    ]);
  };

  type ProductProps = {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    url: string;
  };

  const Item = ({
    id,
    name,
    description,
    price,
    currency,
    url,
  }: ProductProps) => (
    <View key={id} style={styles.item}>
      <View style={{paddingVertical: 20, paddingStart: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FONTS.InterMedium,
              fontSize: fp(2),
              color: COLORS_PRIMARY?.certified,
            }}
            children={name}
          />
          {loginResponse?.data?.role === 'Admin' && (
            <TouchableOpacity onPress={() => deleteProductHandler(id, name)}>
              <DeleteIcon
                style={{marginEnd: SIZES.p16}}
                height={hp(2.9)}
                width={hp(2.9)}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{marginTop: SIZES.m16}}>
          <Text
            style={{
              fontFamily: FONTS.InterRegular,
              fontSize: fp(2.5),
              color: COLORS_PRIMARY.subHeading,
              width: '80%',
              lineHeight: SIZES.screenHeight > 926 ? 0 : 28,
            }}
            children={description}
          />
        </View>
        <View
          style={{
            marginTop: SIZES.m16,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLORS_PRIMARY.heading,
              fontSize: fp(1.9),
              fontFamily: FONTS.InterRegular,
            }}
            children={`${price} ${currency}`}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <View style={{width: '75%'}}>
            <View
              style={{
                height: 1,
                backgroundColor: COLORS_PRIMARY.notAssigned,
                marginTop: SIZES.m22,
                marginEnd: SIZES.m14,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => productDetailHandler(id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: SIZES.m16,
              }}>
              <Text
                style={{
                  fontFamily: FONTS.InterMedium,
                  color: COLORS_PRIMARY.blue,
                  marginEnd: SIZES.m6,
                  fontSize: fp(1.8),
                }}
                children={'Details'}
              />
              <ArrowBlue
                style={{marginTop: SIZES.m2}}
                height={hp(2.9)}
                width={hp(2.9)}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              borderRadius: hp(SIZES.screenHeight > 926 ? 4.7 : 3.5),
              height: hp(SIZES.screenHeight > 926 ? 9.4 : 7),
              width: hp(SIZES.screenHeight > 926 ? 9.4 : 7),
              justifyContent: 'center',
            }}>
            <Image
              style={{
                height: 80,
                width: 80,
              }}
              resizeMethod="resize"
              resizeMode="contain"
              source={{uri: url}}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={ASSETS.myEnrolledCoursesBg}
      style={styles.container}>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: COLORS_PRIMARY.white,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: SIZES.p16,
            marginTop: StatusBar.currentHeight,
            shadowColor: COLORS_PRIMARY.shadowColor,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}>
          <Text
            style={{
              fontSize: fp(2.2),
              color: COLORS_PRIMARY.heading,
              fontFamily: FONTS.InterSemiBold,
              fontWeight: '500',
            }}
            children="All Products"
          />
          <TouchableOpacity onPress={logoutHandler}>
            <LogoutIcon
              style={{marginEnd: SIZES.p16}}
              height={hp(2.9)}
              width={hp(2.9)}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={[styles.container, {padding: SIZES.p16}]}>
        {/* Flat list items  */}
        <View style={{marginTop: SIZES.m14, ...styles.container}}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            data={productsData}
            renderItem={({item}) => (
              <Item
                id={item?.id}
                name={item?.name}
                description={item?.description}
                price={item?.price}
                currency={item?.currency}
                url={item?.url}
              />
            )}
            keyExtractor={item => item.id}
            ListEmptyComponent={!loading ? EmptyListComponent : <></>}
          />
        </View>
      </View>
      {loading && <Loader />}
    </ImageBackground>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  item: {
    backgroundColor: COLORS_PRIMARY.white,
    marginVertical: 8,
    borderRadius: SIZES.r8,
  },
  title: {
    fontSize: 32,
  },
});
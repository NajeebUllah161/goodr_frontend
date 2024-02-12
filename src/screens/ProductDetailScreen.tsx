/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// SVG imports
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  responsiveFontSize as fp,
  responsiveHeight as hp,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {useUpdateEffect} from 'react-use';
import {RootStackParamList} from '../../Main';
import BackArrow from '../assets/images/back_arrow.svg';
import {ProductDetailsResponse} from '../classes/ProductDetailsResponse';
import Loader from '../components/Loader';
import {COLORS_PRIMARY, FONTS, SIZES} from '../constants';
import {APP_STRINGS, END_POINTS} from '../constants/theme';
import {SINGLE_PRODUCT} from '../redux/Types';
import apiCall from '../redux/actions/apiCall';
import {consoleLog} from '../utils/Reusables';

export type ProductDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'productDetail'
>;

const ProductDetailScreen = ({
  navigation,
  route,
}: {
  navigation: ProductDetailScreenNavigationProp;
  route: any;
}) => {
  const productDetailsResponse: ProductDetailsResponse = useSelector(
    (state: any) => state.product?.productDetailsResponse,
  );
  const loading = useSelector((state: any) => state.loader?.loaderStatus);
  const dispatch = useDispatch();

  const [title, setTitle] = useState<any>('');
  const [image, setImage] = useState<any>('');
  const [description, setDescription] = useState<any>('');

  useEffect(() => {
    fetchProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Products Response
  useUpdateEffect(() => {
    if (productDetailsResponse.data) {
      consoleLog('Success Product Details Response : ', productDetailsResponse);
      setTitle(productDetailsResponse?.data?.name);
      setImage(productDetailsResponse?.data?.url);
      setDescription(productDetailsResponse?.data?.description);
    } else {
      consoleLog('Error Product Details : ', productDetailsResponse.error);
    }
  }, [productDetailsResponse]);

  const fetchProductDetails = () => {
    const config = {
      url: END_POINTS.SINGLE_PRODUCT + `/${route?.params?.id}`,
    };

    dispatch<any>(apiCall(config, SINGLE_PRODUCT));
  };

  return (
    <View style={styles.root}>
      <SafeAreaView>
        <View style={styles.subContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
            style={styles.backArrow}>
            <BackArrow height={hp(2.1)} width={hp(2.1)} />
          </TouchableOpacity>
          <Text
            style={styles.productDetails}
            children={APP_STRINGS.PRODUCT_DETAILS}
          />
        </View>
      </SafeAreaView>
      <ScrollView
        bouncesZoom={true}
        automaticallyAdjustContentInsets={true}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <Pressable>
          <Image
            source={{uri: image}}
            style={styles.productImage}
            resizeMethod="resize"
          />
        </Pressable>
        <View style={styles.widthLine} />
        <View style={styles.containerLast}>
          <Text style={styles.title} children={title} />
          <Text style={styles.description} children={description} />
        </View>
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: SIZES.flex1,
    backgroundColor: COLORS_PRIMARY.white,
    zIndex: -1,
  },
  description: {
    fontFamily: FONTS.InterRegular,
    color: COLORS_PRIMARY.subHeading,
    fontSize: fp(1.8),
    lineHeight: SIZES.screenHeight > 926 ? 0 : 24,
    marginTop: hp(2.8),
  },
  title: {
    fontFamily: FONTS.InterMedium,
    color: COLORS_PRIMARY.heading,
    fontSize: fp(2),
    width: '80%',
  },
  containerLast: {
    backgroundColor: COLORS_PRIMARY.white,
    marginHorizontal: SIZES.p22,
    padding: SIZES.p8,
  },
  widthLine: {
    width: '100%',
    marginVertical: hp(2.5),
    height: StyleSheet.hairlineWidth * 4,
    backgroundColor: COLORS_PRIMARY.placeholder,
  },
  productImage: {
    height: hp(23),
    width: '100%',
    marginTop: hp(2),
  },
  productDetails: {
    fontSize: fp(2.2),
    color: COLORS_PRIMARY.heading,
    fontFamily: FONTS.InterMedium,
  },
  backArrow: {
    shadowColor: COLORS_PRIMARY.shadowColor,
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    padding: SIZES.p8,
    borderRadius: SIZES.r60,
    marginRight: SIZES.m10,
    marginLeft: SIZES.m4,
    backgroundColor: COLORS_PRIMARY.white,
  },
  subContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS_PRIMARY.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: SIZES.p8,
    shadowColor: COLORS_PRIMARY.shadowColor,
    marginTop: StatusBar.currentHeight,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  root: {flex: SIZES.flex1},
});

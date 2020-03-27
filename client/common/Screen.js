import {Dimensions, PixelRatio} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const onePixel = 1 / PixelRatio.get();

export default {
  screenWidth,
  screenHeight,
  onePixel,
};

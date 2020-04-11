import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Overlay} from 'react-native-elements';
import ProgressImage from 'react-native-image-progress';
import Progress from 'react-native-progress/Bar';
import {colors} from '../../common';

interface Props {
  imgVisible: boolean;
  imgUrl: string | null;
  setVisible: (bool: boolean) => void;
  setImgUrl: any
}
const BigPicModal = ({imgVisible, imgUrl, setVisible, setImgUrl}: Props) => (
  <Overlay isVisible={imgVisible} fullScreen>
    <TouchableWithoutFeedback
      onPress={() => {
        setVisible(false);
        setImgUrl(null);
      }}>
      <ProgressImage
        source={{uri: imgUrl}}
        resizeMode="center"
        style={{flex: 1}}
        indicator={Progress}
        indicatorProps={{color: colors.blue}}
      />
    </TouchableWithoutFeedback>
  </Overlay>
);

export default BigPicModal;

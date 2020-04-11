import React from 'react';
import {Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import colors from '../../common/Colors';

type Item = {
  name: string;
  avatarUrl: string;
};
interface Props {
  item: Item;
  index: number;
}
const FansView = ({item, index}: Props) => (
  <View>
    <ListItem
      title={item.name}
      leftAvatar={
        item.avatarUrl
          ? {source: {uri: item.avatarUrl}}
          : {icon: {name: 'user', type: 'antdesign', color: colors.blue}}
      }
      bottomDivider
      chevron
    />
  </View>
);

export default FansView;

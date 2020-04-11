import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import colors from '../../common/Colors';

interface Props {
  name: string;
  avatarUrl: string;
  isFollow: boolean;
  handleFollow: () => void;
  handleUnfollow: () => void;
}
const ExploreItem = (props: Props) => {
  return (
    <ListItem
      title={props.name}
      leftAvatar={
        props.avatarUrl
          ? {source: {uri: props.avatarUrl}}
          : {icon: {name: 'user', type: 'antdesign', color: colors.blue}}
      }
      bottomDivider
      rightElement={
        !props.isFollow ? (
          <Button
            title="关注"
            titleStyle={{fontSize: 13, marginTop: -2}}
            containerStyle={{width: 80, height: 30}}
            onPress={props.handleFollow}
          />
        ) : (
          <Button
            title="取消关注"
            titleStyle={{fontSize: 13, marginTop: -2}}
            containerStyle={{width: 80, height: 30}}
            onPress={props.handleUnfollow}
          />
        )
      }
      // rightIcon={{name: 'circle-with-plus', color: colors.blue, type: 'entypo', size: 28}}
    />
  );
};

export default ExploreItem;

const styles = StyleSheet.create({});

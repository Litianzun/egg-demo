import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import {Avatar, Image} from 'react-native-elements';
import BigPicModal from './BigpicModal';

type User = {
  name: string;
  avatarUrl: string;
};
export interface Props {
  title: string;
  content: string;
  createdAt: string;
  pictureUrl?: string;
  user?: User | null;
}
const NoteItem = (props: Props) => {
  let [imgVisible, setVisible] = React.useState(false);
  let [imgUrl, setImgUrl] = React.useState(null);
  let pictureArr = [];
  pictureArr = props.pictureUrl ? props.pictureUrl.split(';') : [];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.content}>{props.content}</Text>
      <View style={[styles.imageContainer, {marginLeft: -5}]}>
        {pictureArr.map((item, index) => {
          return (
            <TouchableHighlight
              key={index}
              onPress={() => {
                setVisible(true);
                setImgUrl((item as unknown) as null);
              }}
              style={{marginHorizontal: 5}}>
              <Image
                source={{uri: item}}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableHighlight>
          );
        })}
      </View>
      <View style={[styles.flex, {justifyContent: 'space-between'}]}>
        <View style={styles.creator_box}>
          <Avatar
            rounded
            source={
              props.user
                ? props.user.avatarUrl
                  ? {uri: props.user.avatarUrl}
                  : require('../../assets/images/account.png')
                : require('../../assets/images/account.png')
            }
            imageProps={{resizeMode: 'center'}}
            size={22}
          />
          <Text style={styles.creator_name}>
            {props.user ? props.user.name : '匿名'}
          </Text>
        </View>
        <Text style={styles.creator_time}>{props.createdAt}</Text>
      </View>
      <BigPicModal
        imgVisible={imgVisible}
        imgUrl={imgUrl}
        setVisible={setVisible}
        setImgUrl={setImgUrl}
      />
    </View>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  container: {
    width: '96%',
    borderRadius: 7,
    backgroundColor: '#fff',
    padding: 12,
    margin: '2%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
  },
  content: {
    color: '#888',
    fontSize: 15,
    marginTop: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  creator_box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  creator_name: {
    color: '#777',
    fontSize: 13,
    marginLeft: 7,
  },
  creator_time: {
    color: '#999',
    fontSize: 13,
    marginTop: 15,
  },
});

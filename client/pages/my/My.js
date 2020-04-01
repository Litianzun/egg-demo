import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  Card,
  Button,
  Avatar,
  Text as ElText,
  ListItem,
  Divider,
} from 'react-native-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../config/action';
import requestList from '../../config/requestList';
import ImagePicker from 'react-native-image-picker';

const List = [
  {title: '个人信息', redirect: 'Personal'},
  {title: '关注列表', redirect: ''},
  {title: '粉丝列表', redirect: ''},
];
class My extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.navigation = props.navigation;
  }

  logout = () => {
    Alert.alert('提示', '确认退出吗', [
      {
        text: '取消',
        onPress: () => {
          return;
        },
      },
      {
        text: '确定',
        onPress: () => {
          this.props.setToken('');
          this.navigation.navigate('Welcome');
        },
      },
    ]);
  };

  readyToUpload = () => {
    const options = {
      title: '请选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从相册选择',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log(response);
      if (!response.error) {
        if (response.didCancel) {
          return;
        }
        const source = {
          uri:
            Platform.OS == 'ios'
              ? response.uri.replace('file://', '')
              : response.uri,
          fileName: response.fileName || 'cash.jpg',
          fileType: response.type,
          base64: response.data,
        };
        this.uploadImg(source);
      }
    });
  };

  async uploadImg(source) {
    try {
      const qiniu_token = await requestList.getQiniuToken(null);
      let formData = new FormData();
      let file = {
        uri: source.uri,
        enctype: 'multipart/form-data',
        name: source.fileName,
        type: source.fileType,
      };
      formData.append(
        'key',
        `image/avatar/${parseInt(Math.random() * 100000)}.jpg`,
      );
      formData.append('file', file);
      formData.append('token', qiniu_token);
      const res = await fetch('https://up-z0.qiniup.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      let jsonRes = res;
      if (res.ok) {
        jsonRes = await res.json();
        let baseUrl = 'http://q7w4bz19x.bkt.clouddn.com/';
        let appUser = this.props.appUser;
        appUser.avatarUrl = baseUrl + jsonRes.key;
        this.props.setAppUser(appUser);
        this.forceUpdate();
      } else {
        console.log('图片上传失败');
      }
      console.log(jsonRes);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <SafeAreaView>
        <View style={styles.flex}>
          <Card
            containerStyle={{
              width: '96%',
              height: 160,
              padding: 8,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Avatar
                rounded
                source={
                  this.props.appUser.avatarUrl
                    ? {uri: this.props.appUser.avatarUrl}
                    : require('../../assets/images/account.png')
                }
                size={100}
                onPress={this.readyToUpload}
              />
              <View
                style={[
                  styles.flex,
                  {alignItems: 'flex-start', marginLeft: 20},
                ]}>
                <ElText h4>
                  {this.props.appUser ? this.props.appUser.name : '-'}
                </ElText>
                <Text>{this.props.appUser ? this.props.appUser.age : ''}</Text>
              </View>
            </View>
          </Card>
          <Divider style={{marginVertical: 10}} />
          {List.map((item, index) => (
            <ListItem
              key={index}
              title={item.title}
              bottomDivider
              chevron
              onPress={() => {
                this.navigation.navigate(item.redirect);
              }}
              containerStyle={{width: '100%'}}
            />
          ))}
          <Button
            title="退出登录"
            style={{marginTop: 20, width: 200}}
            onPress={this.logout}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
  },
});

// 将 store 中的状态映射（map）到当前组件的 props 中
function mapStateToProps(state) {
  return {
    token: state.reducers.newState.token,
    appUser: state.reducers.newState.appUser,
  };
}

// 将 actions 中定义的方法映射到当前组件的 props 中
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

// 将 store 和 当前组件连接（connect）起来
export default connect(mapStateToProps, mapDispatchToProps)(My);

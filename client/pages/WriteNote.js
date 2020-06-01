import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {colors} from '../common';
import ImagePicker from 'react-native-image-crop-picker';
import requestList from '../config/requestList';
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../config/action';
import BigPicModal from './components/BigpicModal';

class WriteNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      imgUrl: [],
      imgVisible: false,
      currentImgUrl: null,
    };
  }

  toDeleteImage = index => {
    let data = objDeepCopy(this.state.imgUrl);
    data.splice(index, 1);
    this.setState({
      imgUrl: data,
    });
  };

  // //弹出选择相册和拍照的选项
  // showCameraSheet = () => {
  //   requestPermission(
  //     PermissionsAndroid.PERMISSIONS.CAMERA,
  //     () => {
  //       this.cameraConfigure()
  //     },
  //     () => {
  //       this.cameraConfigure()
  //     }
  //   )
  // }

  checkParams = () => {
    const {title, content} = this.state;
    if (!title) {
      Toast.show('请填写标题', {
        position: Toast.positions.CENTER,
      });
      return false;
    } else if (!content) {
      Toast.show('请填写内容', {
        position: Toast.positions.CENTER,
      });
      return false;
    }
    return true;
  };

  async handleUpload() {
    const {title, content, imgUrl} = this.state;
    try {
      let urlPar = {
        title,
        content,
        pictureUrl: imgUrl && imgUrl.join(';'),
        userId: this.props.appUser.id,
      };
      if (!this.checkParams()) {
        return;
      }
      const res = await requestList.createNote(urlPar);
      console.log(res);
      if (res.status === 200) {
        Toast.show('发布成功!', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
        this.props.route.params.callback();
        this.props.navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async cameraConfigure() {
    try {
      let image = await ImagePicker.openPicker({
        multiple: true,
        maxFiles: 5,
      });
      console.log(image);
      if (image && image.length > 0) {
        for (let i = 0; i < image.length; i++) {
          this.uploadImg({
            uri: image[i].path,
            fileName: image[i].filename || 'cash.jpg',
            base64: image[i].data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async uploadImg(source) {
    try {
      const qiniu_token = await requestList.getQiniuToken(null);
      let formData = new FormData();
      let file = {
        uri: source.uri,
        enctype: 'multipart/form-data',
        name: source.fileName,
        // type: source.fileType,
      };
      formData.append(
        'key',
        `image/note/${parseInt(Math.random() * 100000)}.jpg`,
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
        let imgUrl = baseUrl + jsonRes.key;
        console.log(imgUrl);
        let imgArr = this.state.imgUrl;
        imgArr.push(imgUrl);
        this.setState({
          imgUrl: imgArr,
        });
        // this.handleUpload();
      } else {
        console.log('图片上传失败');
      }
      console.log(jsonRes);
    } catch (error) {
      console.log(error);
    }
  }
  setVisible = bool => {
    this.setState({
      imgVisible: bool,
    });
  };
  setImgUrl = url => {
    this.setState({
      currentImgUrl: url,
    });
  };

  render() {
    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Input
          label="标题"
          value={this.state.title}
          onChangeText={e => {
            this.setState({title: e});
          }}
          placeholder="请填写标题"
          containerStyle={{marginTop: 10}}
          numberOfLines={1}
          maxLength={20}
        />
        <Input
          label="内容"
          value={this.state.content}
          placeholder="请填写内容"
          onChangeText={e => {
            this.setState({
              content: e,
            });
          }}
          containerStyle={{marginTop: 10}}
          multiline
          maxLength={500}
          inputContainerStyle={{borderBottomWidth: 0}}
        />
        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
          {this.state.imgUrl &&
            this.state.imgUrl.length > 0 &&
            this.state.imgUrl.map((item, index) => {
              return (
                <View
                  style={styles.imgView}
                  // onPress={() => this.viewBigPicture(item)}
                  key={index}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.setVisible(true);
                      this.setImgUrl(item);
                    }}>
                    <Image
                      source={{uri: item}}
                      style={{width: 80, height: 80}}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableOpacity
                    onPress={() => this.toDeleteImage(index)}
                    style={{position: 'absolute', right: 3, top: 3}}>
                    <Image
                      source={require('../assets/images/delete1.png')}
                      style={{width: 12, height: 12}}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          <TouchableOpacity
            justify="center"
            style={styles.imgView}
            onPress={() => this.cameraConfigure()}>
            <Image
              source={require('../assets/images/camera.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
        <Button
          title="发布"
          containerStyle={{width: 200, height: 50, marginTop: 80}}
          onPress={() => this.handleUpload()}
        />
        <BigPicModal
          imgVisible={this.state.imgVisible}
          imgUrl={this.state.currentImgUrl}
          setVisible={this.setVisible}
          setImgUrl={this.setImgUrl}
        />
      </View>
    );
  }
}

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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WriteNote);

const styles = StyleSheet.create({
  imgView: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: colors.input,
    marginTop: 20,
    marginLeft: 13,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

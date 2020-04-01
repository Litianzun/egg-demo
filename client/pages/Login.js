import React, {Component} from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import {Overlay, Input, Button} from 'react-native-elements';
import {screen, colors} from '../common';
import requestList from '../config/requestList';
import VerificationCode from 'react-native-verification-code';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      code: '',
      mode: 'login',
      codeValidate: false,
      codeMsg: '',
    };
  }

  checkParams = () => {
    let result = true;
    const {account, password, code} = this.state;
    if (!account || !password) {
      return false;
    }
    return result;
  };
  async login() {
    let code = this.code;
    this.setState({
      codeValidate: true,
    });
    if (!this.checkParams()) {
      return;
    }
    if (code && code.state && code.state.code) {
      let currentCode = code.state.code.join('');
      if (this.state.code.toLowerCase() === currentCode.toLowerCase()) {
        const res = await requestList.login({
          name: this.state.account,
          password: this.state.password,
        });
        console.log(res);
        if (res.status === 200) {
          this.props.setToken(res.token)//保存token
          this.props.setAppUser(res.data)//保存用户信息
          this.props.navigate('Main');
          this.props.setVisible(false);
        }
      } else {
        this.setState({
          codeMsg: '验证码不一致',
        });
      }
    }
  }

  async regist() {
    const res = await requestList.register({
      name: this.state.account,
      password: this.state.password,
    });
    console.log(res);
  }

  render() {
    const {account, password, code, codeValidate} = this.state;
    return (
      <Overlay
        isVisible={this.props.visible}
        width={screen.screenWidth * 0.8}
        height={screen.screenHeight * 0.5}
        overlayBackgroundColor="#fff"
        onBackdropPress={() => {
          this.props.setVisible(!this.props.visible);
        }}>
        <View>
          <Text style={styles.title}>Light World</Text>
          <Input
            leftIcon={
              <Image
                source={require('../assets/images/account.png')}
                style={{width: 18, height: 18}}
              />
            }
            value={account}
            onChangeText={e => {
              this.setState({account: e});
            }}
            inputStyle={{paddingHorizontal: 8}}
            containerStyle={{marginTop: 20}}
            placeholder="请输入账号"
            errorMessage={!account && codeValidate ? '账号必须输入' : ''}
          />
          <Input
            leftIcon={
              <Image
                source={require('../assets/images/password.png')}
                style={{width: 18, height: 18}}
              />
            }
            value={password}
            onChangeText={e => {
              this.setState({password: e});
            }}
            containerStyle={{marginTop: 20}}
            inputStyle={{paddingHorizontal: 8}}
            placeholder="请输入密码"
            errorMessage={!password && codeValidate ? '请输入密码' : ''}
          />
          <View style={styles.flex}>
            <Input
              value={code}
              onChangeText={e => this.setState({code: e})}
              inputStyle={{paddingHorizontal: 8}}
              placeholder="请输入验证码"
              containerStyle={{width: screen.screenWidth * 0.4, marginTop: 20}}
              errorMessage={this.state.codeMsg}
            />
            <VerificationCode ref={e => (this.code = e)} />
          </View>
          {this.state.mode === 'login' ? (
            <View>
              <Button
                title="登录"
                style={{marginTop: 30}}
                onPress={() => this.login()}
              />
              <Text
                style={{color: '#666', marginTop: 15}}
                onPress={() => {
                  this.setState({
                    mode: 'regist',
                  });
                }}>
                没有账号？立即注册 >>
              </Text>
            </View>
          ) : (
            <View>
              <Button
                title="注册"
                style={{marginTop: 30}}
                onPress={() => this.regist()}
              />
              <Text
                style={{color: '#666', marginTop: 15}}
                onPress={() => {
                  this.setState({
                    mode: 'login',
                  });
                }}>
                已有账号？立即登录 >>
              </Text>
            </View>
          )}
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'arial',
  },
  flex: {
    flexDirection: 'row',
    // alignItems: 'center',
    width: screen.screenWidth * 0.8,
  },
});
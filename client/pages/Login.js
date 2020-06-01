import React, {useState} from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import {Overlay, Input, Button} from 'react-native-elements';
import {screen, colors} from '../common';
import requestList from '../config/requestList';
import VerifyCode from './components/Verifycode'

function checkParams(params) {
  let result = true;
  const {account, password} = params;
  if (!account || !password) {
    return false;
  }
  return result;
}

function Login(props) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('login');
  const [codeValidate, setCodeValidate] = useState(false);
  const [codeMsg, setCodeMsg] = useState('');
  const codeEl = React.useRef(null);

  return (
    <Overlay
      isVisible={props.visible}
      width={screen.screenWidth * 0.8}
      height={screen.screenHeight * 0.5}
      overlayBackgroundColor="#fff"
      onBackdropPress={() => {
        props.setVisible(!props.visible);
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
          onChangeText={e => setAccount(e)}
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
          secureTextEntry={true}
          value={password}
          onChangeText={e => setPassword(e)}
          containerStyle={{marginTop: 20}}
          inputStyle={{paddingHorizontal: 8}}
          placeholder="请输入密码"
          errorMessage={!password && codeValidate ? '请输入密码' : ''}
        />
        <View style={styles.flex}>
          <Input
            value={code}
            onChangeText={e => setCode(e)}
            inputStyle={{paddingHorizontal: 8}}
            placeholder="请输入验证码"
            containerStyle={{marginTop: 20, flex: 1}}
            errorMessage={codeMsg}
          />
          <VerifyCode ref={codeEl} />
        </View>
        {mode === 'login' ? (
          <View>
            <Button
              title="登录"
              style={{marginTop: 30}}
              onPress={async () => {
                try {
                  let _code = codeEl.current.code.current;
                  console.log(_code)
                  setCodeValidate(true);
                  if (
                    !checkParams({account,password})
                  ) {
                    return;
                  }
                  if (_code && _code.state && _code.state.code) {
                    let currentCode = _code.state.code.join('');
                    if (code.toLowerCase() === currentCode.toLowerCase()) {
                      const res = await requestList.login({
                        name: account,
                        password: password,
                      });
                      console.log(res);
                      if (res.status === 200) {
                        props.setToken(res.token); //保存token
                        props.setAppUser(res.data); //保存用户信息
                        props.navigate('Main');
                        props.setVisible(false);
                      }
                    } else {
                      setCodeMsg('验证码不一致');
                      throw {message: '验证码不一致'};
                    }
                  } else {
                    throw {message: '验证码有问题'};
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
            />
            <Text
              style={{color: '#666', marginTop: 15}}
              onPress={() => setMode('register')}>
              没有账号？立即注册 >>
            </Text>
          </View>
        ) : (
          <View>
            <Button
              title="注册"
              style={{marginTop: 30}}
              onPress={async () => {
                const res = await requestList.register({
                  name: account,
                  password: password,
                });
                console.log(res);
              }}
            />
            <Text
              style={{color: '#666', marginTop: 15}}
              onPress={() => setMode('login')}>
              已有账号？立即登录 >>
            </Text>
          </View>
        )}
      </View>
    </Overlay>
  );
}

export default Login;

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

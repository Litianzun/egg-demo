import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {ThemeProvider, Button, Avatar} from 'react-native-elements';
import {colors} from '../common';
import Login from './Login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../config/action';

const theme = {
  Button: {
    titleStyle: {
      color: '#eee',
    },
  },
};

const Welcome = ({navigation, ...rests}) => {
  console.log(rests);
  let [visible, setVisible] = React.useState(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <Avatar
            rounded
            icon={{name: 'key', type: 'antdesign'}}
            size="large"
            containerStyle={{marginBottom: 20}}
            overlayContainerStyle={{backgroundColor: colors.blue}}
          />
          <Text style={styles.title}>Light World</Text>
          <Button
            title="开始探索!"
            style={{marginTop: 20, width: 250}}
            onPress={() => {
              if(rests.token){
                navigation.navigate('Main')
              }else {
                setVisible(!visible);
              }
            }}
          />
          <Login visible={visible} setVisible={setVisible} {...navigation} {...rests} />
        </View>
      </ThemeProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#555',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'arial',
  },
});

// 将 store 中的状态映射（map）到当前组件的 props 中
function mapStateToProps(state) {
  return {
    token: state.reducers.newState.token,
    appUser: state.reducers.newState.appUser
  };
}

// 将 actions 中定义的方法映射到当前组件的 props 中
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

// 将 store 和 当前组件连接（connect）起来
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import requestList from '../../config/requestList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../config/action';
import {screen} from '../../common';

const List = [
  {title: '头像'},
  {title: '昵称', content: 'name'},
  {title: '性别', content: 'gender'},
  {title: '个人简介', content: 'introduction'},
];
class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
    };
  }

  componentDidMount() {
    this.getPersonalInfo();
  }

  async getPersonalInfo() {
    try {
      const res = await requestList.readUser({id: this.props.appUser.id});
      console.log(res);
      if (res.status === 200) {
        this.setState({
          detail: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleUpdate() {
    try {
      let info = this.state.detail;
      let urlPar = Object.assign({}, info);
      const res = await requestList.updateUser(urlPar, this.props.token);
      console.log(res);
      if (res.message === '修改成功') {
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const {detail} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.flex, {flex: 1}]}>
          {List.map((item, index) => (
            <ListItem
              key={index}
              title={item.title}
              bottomDivider
              rightAvatar={
                item.title === '头像' && detail
                  ? {source: {uri: detail.avatarUrl}}
                  : null
              }
              input={
                item.content !== undefined
                  ? {
                      value: detail[item.content] ? detail[item.content] : '',
                      onChangeText: text => {
                        detail[item.content] = text;
                        this.setState({
                          detail,
                        });
                      },
                      selectTextOnFocus: true,
                      multiline: item.content === 'introduction'
                    }
                  : null
              }
              // rightTitle={item.content && detail ? detail[item.content] : null}
              containerStyle={{width: '100%'}}
            />
          ))}
          <Button
            title="保存"
            style={{marginTop: 20, width: 200}}
            onPress={() => {
              Alert.alert('提示', '确认保存吗?', [
                {
                  text: '取消',
                  onPress: () => {
                    return;
                  },
                },
                {
                  text: '保存',
                  onPress: () => {
                    this.handleUpdate();
                  },
                },
              ]);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'column',
    alignItems: 'center',
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
export default connect(mapStateToProps, mapDispatchToProps)(Personal);

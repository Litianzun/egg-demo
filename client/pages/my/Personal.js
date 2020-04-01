import React, {Component} from 'react';
import {View, Text, SafeAreaView, TextInput} from 'react-native';
import {ListItem} from 'react-native-elements';
import requestList from '../../config/requestList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../config/action';

const List = [
  {title: '头像'},
  {title: '昵称', content: 'name'},
  {title: '密码', content: 'password'},
  {title: '性别', content: 'gender'},
  {title: '个人简介', content: 'introduction'},
];
class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: null,
    };
  }

  componentDidMount() {
    this.getPersonalInfo();
  }

  async getPersonalInfo() {
    try {
      const res = await requestList.readUser({id: this.props.appUser.id});
      console.log(res)
      if(res.status === 200){
          this.setState({
              detail: res.data
          })
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {detail} = this.state;
    return (
      <SafeAreaView>
        {List.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            bottomDivider
            rightAvatar={
              (item.title === '头像' && detail) ? {source: {uri: detail.avatarUrl}} : null
            }
            rightTitle={(item.content && detail) ? detail[item.content] : null}
          />
        ))}
      </SafeAreaView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Personal);

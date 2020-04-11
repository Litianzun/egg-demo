/**
 * 关注人列表
 */
import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import requestList from '../../config/requestList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../config/action';
import FansView from '../components/FansView';
import {screen} from '../../common';

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getList();
  }

  async getList() {
    try {
      let urlPar = {
        offset: 0,
        limit: 10,
        userId: this.props.appUser.id,
      };
      const res = await requestList.listFollow(urlPar);
      console.log(res);
      if (res.status === 200) {
        this.setState({
          data: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  _renderItem = info => {
    return <FansView {...info} />;
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          ListEmptyComponent={
            <View style={[styles.flex, {height: screen.screenHeight * 0.75}]}>
              <Text>暂无关注人哦～</Text>
            </View>
          }
          renderItem={this._renderItem}
          keyExtractor={(item, index) => String(item.id)}
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
export default connect(mapStateToProps, mapDispatchToProps)(Following);

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

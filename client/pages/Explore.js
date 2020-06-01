import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import requestList from '../config/requestList';
import ExploreItem from './components/ExploreItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../config/action';

let offset = 0,
  limit = 10;

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchkey: '',
      data: [],
      refreshing: false,
      hasMore: true,
      loadingMore: false, //防止重复加载
    };
  }

  changeSearchkey = value => {
    this.setState({
      searchkey: value,
    });
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      let oldData = this.state.data;
      let urlPar = {
        offset: offset,
        limit: limit,
        key: this.state.searchkey,
        userId: this.props.appUser.id,
      };
      console.log(urlPar);
      const res = await requestList.listUser(urlPar);
      console.log(res);
      if (res.status === 200) {
        let newData = oldData.concat(res.data);
        newData.map(item => {
          let flag = res.myFollow.some(item2 => item2.userId == item.id);
          if (flag) {
            item.isFollow = true;
          } else {
            item.isFollow = false;
          }
        });
        this.setState({
          data: newData.filter(item => item.id !== this.props.appUser.id),
          refreshing: false,
          hasMore: res.data.length >= limit,
          loadingMore: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleFollow(item, index) {
    try {
      let urlPar = {
        userId: item.id,
        fans: this.props.appUser.id,
      };
      let res = await requestList.follow(urlPar, this.props.token);
      console.log(res);
      if (res.status === 200) {
        let data = this.state.data;
        data[index].isFollow = true;
        this.setState({
          data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async handleUnfollow(item, index) {
    try {
      let urlPar = {
        userId: item.id,
        fans: this.props.appUser.id,
      };
      let res = await requestList.unfollow(urlPar, this.props.token);
      console.log(res);
      if (res.status === 200) {
        let data = this.state.data;
        data[index].isFollow = false;
        this.setState({
          data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  onSubmit = e => {
    offset = 0;
    this.setState(
      {
        data: [],
      },
      () => {
        this.getData();
      },
    );
  };

  onRefresh = () => {
    offset = 0;
    this.setState({refreshing: true, data: []}, () => {
      this.getData();
    });
  };
  onEndReached = () => {
    console.log('到底了');
    if (this.state.hasMore && !this.state.loadingMore) {
      offset = offset + limit;
      this.setState({
        loadingMore: true,
      });
      this.getData();
    } else {
      console.log('没有更多数据了');
    }
  };

  _renderItem = info => {
    return (
      <ExploreItem
        {...info.item}
        handleFollow={() => this.handleFollow(info.item, info.index)}
        handleUnfollow={() => this.handleUnfollow(info.item, info.index)}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <SearchBar
          placeholder="请输入用户名称查询"
          value={this.state.searchkey}
          onChangeText={this.changeSearchkey}
          containerStyle={styles.searchBox}
          inputContainerStyle={{backgroundColor: '#fff'}}
          onSubmitEditing={this.onSubmit}
        />
        <FlatList
          style={{flex: 1}}
          data={this.state.data}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={this._renderItem}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={this.onEndReached}
          ListFooterComponent={
            this.state.loadingMore ? (
              <ActivityIndicator size="small" />
            ) : !this.state.hasMore && this.state.data.length > 0 ? (
              <Text style={styles.bottomTip}>没有更多数据了</Text>
            ) : null
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: '#eee',
    borderTopColor: '#eee',
    borderBottomColor: '#eee',
  },
  bottomTip: {
    fontSize: 13,
    color: '#666',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Explore);

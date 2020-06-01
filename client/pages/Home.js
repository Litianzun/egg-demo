import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import NoteItem from './components/NoteItem';
import requestList from '../config/requestList';
import {colors} from '../common';

let offset = 0,
  limit = 5;
export default class Home extends Component {
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
      };
      console.log(urlPar);
      const res = await requestList.listNote(urlPar);
      console.log(res);
      if (res.status === 200) {
        let newData = oldData.concat(res.data);
        this.setState({
          data: newData,
          refreshing: false,
          hasMore: res.data.length >= limit,
          loadingMore: false,
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

  toWrite() {
    this.props.navigation.navigate('WriteNote', {
      callback: () => {
        this.onRefresh();
      },
    });
  }

  _renderItem = info => {
    return <NoteItem {...info.item} />;
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <SearchBar
          placeholder="请输入文章关键字查询"
          value={this.state.searchkey}
          onChangeText={this.changeSearchkey}
          containerStyle={styles.searchBox}
          inputContainerStyle={{backgroundColor: '#fff'}}
          onSubmitEditing={this.onSubmit}
        />
        <FlatList
          style={{flex: 1}}
          data={this.state.data}
          keyExtractor={item => String(item.noteId)}
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
        <TouchableOpacity style={styles.writeBt} onPress={() => this.toWrite()}>
          <Text style={styles.writeBt_text}>+</Text>
        </TouchableOpacity>
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
  writeBt: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.blue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 30,
  },
  writeBt_text: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '600',
    lineHeight: 40,
    textAlign: 'center',
  },
  bottomTip: {
    fontSize: 13,
    color: '#666',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
  },
});

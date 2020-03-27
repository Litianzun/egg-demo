import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView>
        <Text> My </Text>
      </SafeAreaView>
    );
  }
}

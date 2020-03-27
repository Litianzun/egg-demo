import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {ThemeProvider, Button, Avatar} from 'react-native-elements';
import {colors} from '../common';
import Login from './Login';

const theme = {
  Button: {
    titleStyle: {
      color: '#eee',
    },
  },
};

const Welcome = ({navigation}) => {
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
              setVisible(!visible);
            }}
          />
          <Login visible={visible} setVisible={setVisible} {...navigation} />
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

export default Welcome;

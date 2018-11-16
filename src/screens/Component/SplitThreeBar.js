import React, { Component } from 'react';
import {
  View, StyleSheet, Text
} from 'react-native';

class SplitThreeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'powderblue', justifyContent: 'center'}} >
          {this.props.left}
        </View>
        <View style={{flex: 2, backgroundColor: 'skyblue', justifyContent: 'center'}} >
          {this.props.center}
        </View>
        <View style={{flex: 2, backgroundColor: 'steelblue', justifyContent: 'center'}} >
          {this.props.right}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
});

export default SplitThreeBar;

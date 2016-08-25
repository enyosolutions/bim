import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Title from '../../../component/Title.js';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseStyles.colors.deepBlue
  },
  top: {
    backgroundColor: baseStyles.colors.deepBlue,
    height: height / 2
  },
  topContent: {
    justifyContent: 'center',
    flex: 1
  },
  bottom: {
    backgroundColor: baseStyles.colors.white
  },
  text: {
    color: baseStyles.colors.alternative,
    marginTop: 10,
    fontSize: 35,
    marginLeft: 50
  },
  lines: {
    borderBottomWidth: 1,
    borderBottomColor: baseStyles.colors.lightGrey,
    height: height / 6,
    paddingHorizontal: 25,
    justifyContent: 'center'
  },
  linkText: {
    color: baseStyles.colors.deepBlue
  }
});

export default class JackpotSelectDuration extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Title title={this.props.title} />
          <View style={styles.topContent}>
            <Text style={styles.text}>
              {this.props.subtitle || 'Compte à débiter' }
            </Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity onPress={()=> {
            this.props.confirm();
          }}>
            <View style={styles.lines}>
              <Text style={styles.linkText}>Un versement unique</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {
            this.props.confirm();
          }}>
            <View style={styles.lines}>
              <Text style={styles.linkText}>Tous les mois</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {
            this.props.confirm();
          }}>
            <View style={styles.lines}>
              <Text style={styles.linkText}>Tous les trimestres</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

JackpotSelectDuration.propTypes = {
  title: React.PropTypes.string
};
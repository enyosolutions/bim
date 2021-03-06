'use strict';

import React, { Component} from 'react';
import { View, Text, StyleSheet, Animated} from 'react-native';
import AppGuideline from '../../../app/AppGuideline';

const style = StyleSheet.create({
	title : {
		fontFamily : 'Montserrat-Bold',
		fontSize : 36,
		lineHeight : 36,
		letterSpacing: 1.5,
		left : -3,
		marginTop : 45,
	    color: AppGuideline.colors.alternative
	}
});

export default class Title extends Component {
	render(){

		let title =  this.props.children || 'B!M';
		return (
			<Animated.Text {...this.props} style={[style.title, this.props.style]}>{title.toUpperCase()}</Animated.Text>
		);
	}
}

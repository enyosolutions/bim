import React , { Component } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import asset from '../../../asset';

const styles = StyleSheet.create({
	triangle: {
		width : 0,
		height:0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderRightWidth: 8,
		borderTopWidth: 8,
		borderRightColor: 'transparent',
		borderTopColor: '#F0F3F5',
		alignSelf : 'flex-end',
	},
	triangleRight: {
		transform: [
			{rotate: '270deg'}
		]
	},
	triangleLeft: {
		transform: [
			{rotate: '180deg'}
		]
	},
	user : {
		flexDirection:'row',
		alignItems: 'flex-end',
		paddingTop :40
	},
	userLeft : {
		paddingLeft :40
	},
	userRight : {
		paddingRight:40
	},
	userImage :{
		position: 'absolute',
		bottom: 0,
		borderRadius:20,
		width:40,
		height:40
	},
	userImageRight :{
		right:2,
	},
	userImageLeft : {
		left:2,
	}
});


export class TriangleCorner extends Component {
	render() {
		return (
			<View style={[styles.triangle, this.props.style]} />
			)
	}
}

export class TriangleLeft extends Component {
	render() {
		return (
			<View  style={[styles.user,styles.userLeft, this.props.style]} >
			<Image source={asset.bot}  style={[styles.userImage, styles.userImageLeft]} />
			<TriangleCorner style={[styles.triangleLeft, this.props.style]}/>
			</View>
		)
	}
}

export class TriangleRight extends Component {
	render() {
		return (
			<View  style={[styles.user, styles.userRight, this.props.style]} >
			<Image source={asset.user}  style={[styles.userImage, styles.userImageRight]} />
			<TriangleCorner style={[styles.triangleRight, this.props.style]} />
			</View>
			)
	}
}

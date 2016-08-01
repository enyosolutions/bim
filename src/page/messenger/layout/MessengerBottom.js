'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MessengerButton from '../item/MessengerButton';

const styles = StyleSheet.create({
	button: {
		flex : 1,
		backgroundColor: '#F0F3F5',
		alignSelf: 'stretch',
	},
	box :{
		flex : 1,
		flexDirection : 'row-reverse'
	},
	container :{
		flex : 1,
		flexWrap : 'nowrap',
		flexDirection : 'column'
	}
});

class MessengerBottom extends Component {

	renderChoices(){

		let content = [];
		let buttons = [];

		let row = [];
		let limit = (this.props.choices.length >3) ? 1 : 0;
		this.props.choices.map((choice,index) => {
			row.push(choice);
			if(row.length > limit){
				buttons.push(row);
				row = [];
			}
		});

		buttons.map((el,index) => {

			content.push(
				<View key={index} style={styles.box} >
						{el.map((button,pos) => {
							return (<MessengerButton key={pos} onPress={this.props.onPress} style={styles.button} {...button} />)
						})}
				</View>
			);

		});

		return content;
	}


	render(){
		return (
			<View >
				<View  style={styles.container}  >
					{this.renderChoices()}
				</View>
			</View>
		);
	}
}



export default MessengerBottom;
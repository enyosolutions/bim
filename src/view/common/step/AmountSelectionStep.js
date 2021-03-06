import React from 'react';

import { Text, View, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import Title from '../title/Title';
import CenteredTitle from '../title/CenteredTitle';
import BackButton from '../button/BackButton';
import asset from '../../../app/AppAsset';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default
class AmountSelectionStep extends React.Component {

	constructor(props) {
		super(props);
		this.state = {amount: this.props.amount ?  this.props.amount : ''   };
	}

	render() {
		return (
			<View style={styles.container}>
			{ this.props.back && <BackButton image={asset.back_green} back={this.props.back} />}
			<Title>{this.props.title}</Title>
			<View style={styles.top}>
			<CenteredTitle>{this.props.subtitle || 'B!MMER LA SOMME DE' }</CenteredTitle>
			<Text
			ref="amountInput"
			style={{
				color: 'white',
				textAlign: 'center',
				fontSize: 40,
				height: 100,

				fontSize:36,
				fontFamily : 'Montserrat-Bold',
				width: null
			}}
			>{
				this.state.amount ?
				this.state.amount + ' €' :
				'Votre montant...'
			}</Text>
			</View>
			<TouchableOpacity style={{
                    // flex: 1,
                    backgroundColor: AppGuideline.colors.lightviolet,
                    padding: 15,
                    height: 70
                }}
                onPress={()=> {
                	this.props.confirm(this.state.amount)
                }}
                >
                <Text style={{padding: 10,
                	fontSize:15,
                	fontFamily : 'Montserrat-SemiBold', textAlign: 'center', color: '#fff' }}>CONFIRMER</Text>
                	</TouchableOpacity>
                	<View style={styles.bottom}>

                	{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, key) => {
                		return (<TouchableOpacity style={{}} key={key} onPress={()=> {
                			this.parseInput(value)
                		}}>
                		<Text style={styles.keyboardButton} onPress={()=> {
                			this.parseInput(value)
                		}} >{value}</Text>
                		</TouchableOpacity>);
                	})
                }
                <TouchableOpacity style={{}} onPress={()=> {
                	this.parseInput(',')
                }} >
                <Text style={styles.keyboardButton} >,</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{}}  onPress={()=> {
                	this.parseInput('0')
                }} >
                <Text style={styles.keyboardButton} >0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.keyboardImage , {alignItems:'center'}]} onPress={()=> {
                	this.parseInput('<')
                }}>
                <Image source={asset.keyboard['effacer']} style={{resizeMode: 'contain', width: 20}} />
                </TouchableOpacity>
                </View>
                </View>
                );
	}


	parseInput(input) {
		console.log(this.state.amount, input);
		var ln = this.state.amount ? this.state.amount.length : 0;
		var append = '';
		switch (input) {
			case '0':
			if (ln > 0) {
				append = '0';
			}
			break;
			case '<':
			console.log(this.amount, this.state.amount.substr(0, this.state.amount.length - 2));
			if (ln > 0) {
				append = this.state.amount.substr(0, this.state.amount.length - 1);
				this.setState({amount: append});
				append = undefined;
			}
			break;
			case '.':
			if (ln == '0') {
				append = '0.';
			}
			else if (this.state.amount.indexOf('.') == -1) {
				append = '.'
			}
			break;
			default:
			append = input + "";
		}

		if (append) {
			this.setState({amount: this.state.amount + append});
		}

	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue
	},
	top: {
		flex: 1,
		paddingTop: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: AppGuideline.colors.deepBlue
	},
	bottom: {
		backgroundColor: "white",
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		flexDirection: 'row',
	},
	keyboardButton: {
		padding: 20,
		width: width * 0.33,
		textAlign: 'center',
		fontSize: 22
	},
	keyboardImage: {
		padding: 20,
		width: width * 0.33
	}
});


AmountSelectionStep.propTypes = {
	title: React.PropTypes.string
};

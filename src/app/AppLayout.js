'use strict'
import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions,  StyleSheet, TouchableOpacity , Image, Animated, Easing, ScrollView, PanResponder} from 'react-native';
import Swiper from 'react-native-swiper';
import MenuView from '../view/menu/MenuView';
import {swipeTo} from '../view/menu/MenuAction';
import AppAsset from '../view/../app/AppAsset';
import {connect} from 'react-redux';
import {loadSession} from '../view/login/LoginAction';
import {setVisibility} from '../view/messenger/MessengerAction';
import { Actions } from 'react-native-router-flux';
import MessengerView from '../view/messenger/MessengerView';


const {width, height} = Dimensions.get('window');


class AppLayout extends Component {

	constructor(props){
		super(props);
		this.layout = [];
		this.state = {
			menuValue: new Animated.Value(0.0001),
			botValue: new Animated.Value(0.0001),
			scale: new Animated.Value(0.0001),
			showMessenger: false,
			borderRadius: new Animated.Value(width),
		};

		this.scroll = null;
	}

	componentDidMount(){
		this.scroll = this.refs.swiper.getScrollResponder();
		this.scroll.scrollTo({
			y: 0,
			x: width
		});
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({

			onStartShouldSetPanResponderCapture: (evt, gestureState) =>{
				console.log('App layout onStartShouldSetPanResponderCapture', gestureState);
				return true;
			},
			onMoveShouldSetPanResponderCapture: (evt, gestureState) =>{
				console.log('App layout onMoveShouldSetPanResponderCapture', gestureState);
				return true;
			},
			onStartShouldSetPanResponder: (evt, gestureState) =>{
				console.log('App layout onStartShouldSetPanResponder', gestureState);
				return true;
			},
			onMoveShouldSetPanResponder:  (evt, gestureState) =>{
				console.log('App layout onMoveShouldSetPanResponder', gestureState);
				return true;
			},
			onPanResponderTerminationRequest: (evt, gestureState) =>{
				console.log('App layout onStartShouldSetPanResponder', gestureState);
				return false;
			},
			onPanResponderRelease:this.handlePanResponderRelease.bind(this)
		});
	}

	handlePanResponderRelease(evt, gestureState) {

		if(gestureState.moveX == 0 && gestureState.moveY == 0){

			console.log('Click :', gestureState);

			if(this.props.menu.gesture.onPress != undefined){
				this.props.menu.gesture.onPress();
			}

		}else{

			let position = { x: gestureState.x0, y: gestureState.y0 };

			let horizontal = gestureState.x0 - gestureState.moveX;
			let vertical = gestureState.y0 - gestureState.moveY;
			let type = 'click';
			let direction = 'horizontal';
			let distance = Math.abs(horizontal);

			if(	(Math.abs(horizontal) >= Math.abs(vertical) )){
				let limit = width/3;
				if(distance > 10){
					type = 'small';
					if(distance > limit){
						type = 'large';
					}
				}
			}else{
				direction = 'vertical';
				distance = Math.abs(vertical);

				let limit = height/4;
				if(distance > 10){
					type = 'small';
					if(distance > limit){
						type = 'large';
					}
				}
			}

			switch(direction){
				case 'horizontal':{
					switch(type){
						case 'small':{
							if(this.props.menu.gesture.onHorizontalSwipe != undefined){
								this.props.menu.gesture.onHorizontalSwipe(horizontal , position);
							}
						}break;

						case 'large':{
							if(this.props.menu.gesture.onHorizontalLargeSwipe != undefined){
								this.props.menu.gesture.onHorizontalLargeSwipe(horizontal, position);
							}
						}break;
					}
				}break;

				case 'vertical':{
					switch(type){
						case 'small':{
							if(this.props.menu.gesture.onVerticalSwipe != undefined){
								this.props.menu.gesture.onVerticalSwipe(vertical, position);
							}
						}break;

						case 'large':{
							if(this.props.menu.gesture.onVerticalLargeSwipe != undefined){
								this.props.menu.gesture.onVerticalLargeSwipe(vertical, position);
							}
						}break;
					}

				}break;
			}
		}

		return true;
	}

	onLayout(ref, event){

		switch(ref){
			case 0 : ref = 'menu'; break;
			case 1 : ref = 'main'; break;
		}

		this.layout[ref] = event.nativeEvent.layout;

	}

	gotTo(item){
		this.props.dispatch(swipeTo('main'));
		item.action();
	}

	menu(){
		this.props.dispatch(swipeTo('menu'));
		this.props.dispatch(setVisibility(false));
	}


	showMessenger(){

		let animation = [];

		animation.push(
			Animated.timing(
				this.state.scale,
				{
					duration: 300,
					toValue: 30,
					easing: Easing.ease
				})
			);

		Animated.parallel(animation).start(()=>{
			this.setState({
				showMessenger:true
			});
		});

	}


	hideMessenger(){

		this.setState({
			showMessenger : false
		});

		let animation = [];
		animation.push(
			Animated.timing(
				this.state.scale,
				{
					duration: 300,
					toValue: 0,
					easing: Easing.ease
				})
			);

		Animated.parallel(animation).start();

	}

	componentWillReceiveProps(nextProps){

		if( nextProps.menu.goTo != this.props.menu.goTo ){

			this.swipeTo(nextProps.menu.goTo);

			if(this.state.showMessenger == false ){

				if(nextProps.menu.goTo == 'main' ){

					Animated.timing(
						this.state.menuValue,
						{
							toValue: 1,
							duration: 300,
							delay : 200,
							easing: Easing.ease
						}).start();

				}else {

					Animated.timing(
						this.state.menuValue,
						{
							duration: 300,
							delay : 200,
							toValue: 0,
							easing: Easing.ease
						}).start();
				}

			}


		}



		if(this.props.login.username != nextProps.login.username && nextProps.login.username !== false ){
			this.props.dispatch(setVisibility(true));
		}




	}

	swipeTo(ref, animated = true){
		if(this.layout[ref] != undefined  ){

			this.scroll.scrollTo({
				y: 0,
				x: this.layout[ref].x,
				animated
			});

		}
	}

	componentDidUpdate(prevProps, prevState) {

		if( prevProps.messenger.visibility !== this.props.messenger.visibility ){

			if( this.props.messenger.visibility == true ){

				this.showMessenger();

			}else{

				this.hideMessenger();

			}
		}

		if(this.state.showMessenger !== prevState.showMessenger || this.props.login.username != prevProps.login.username ){

			if(this.state.showMessenger == false ){

				Animated.timing(
					this.state.menuValue,
					{
						duration: 300,
						toValue: 0,
						easing: Easing.ease
					}).start();

			}else{

				if(this.props.login.username !== null && this.props.login.username !== false){

					Animated.timing(
						this.state.menuValue,
						{
							delay : 200,
							duration: 300,
							toValue: 1,
							easing: Easing.ease
						}).start();

				}

			}

		}


	}

	render() {

		let pageStyle = [{width: width, height: height}, style.slide];

		let pages = [
		<MenuView gotTo={this.gotTo.bind(this)} />,
		<View style={style.viewContainer} >
		{this.props.children}
		</View>
		];

		pages = pages.map((page, i) => {
			return <View style={pageStyle} onLayout={(event)=>{ this.onLayout(i,event);}} key={i}>{page}</View>
		});

		return (
			<View style={[style.container, {
				width: width,
				height: height
			}]}

			>
			<StatusBar hidden={true} />
			<ScrollView
			ref='swiper'
			horizontal={true}
			scrollEnabled={false}
			bounces={false}
			{...this._panResponder.panHandlers}
			>
			{pages}
			</ScrollView>
			{this.props.messenger.session != null  && (
				<Animated.View style={[style.messenger, {
					transform : [ {scale : this.state.scale }],
					backgroundColor : '#FFFFFF'
				} ]
			}>
			</Animated.View>
			)}
			{this.state.showMessenger == true && (
				<View style={{position: 'absolute',top: 0, right: 0,
				width: width,
				height: height}} >
				<MessengerView />
				</View>
				)}
			<TouchableOpacity style={[style.button]}   onPress={this.menu.bind(this)}>
			<Animated.Image source={AppAsset.close}  style={[style.bot,  { transform: [ {scale: this.state.menuValue}] } ]} />
			{(this.props.messenger.toSee > 0) && (
				<Animated.View style={[style.notificationBubble,  { transform: [ {scale: this.state.menuValue}] } ]}>
				<Text style={style.notificationText}>{this.props.messenger.toSee}</Text>
				</Animated.View>
			)}
			</TouchableOpacity>

			</View>);

	}
}



const style = StyleSheet.create({
	viewContainer: {
		flex: 1
	},
	notificationBubble : {

		borderRadius : 20,
		backgroundColor:'#FF2D5D' ,
		width: 20,
		height: 20,
		overflow : 'hidden',
		left : -40,
		top : -2,
	},
	notificationText : {
		color: '#FFFFFF',
		left: 6,
		position: 'absolute',
		fontFamily: 'Roboto-Black',
		fontSize:14
	},
	container: {
		backgroundColor: 'transparent',
		position: 'relative',
	},
	slide: {
		backgroundColor: 'transparent',
		overflow: 'hidden'
	},
	swipe: {
		backgroundColor: 'transparent',
		position: 'relative',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'transparent',
	},
	button :{
		position: 'absolute',
		top: 30,
		right: -10
	},
	messenger :{
		position: 'absolute',
		top: 0,
		borderRadius:30,
		width:60,
		height:60,
		right: -10
	},
	bot :{
		borderRadius:30,
		position: 'absolute',
		top : 0,
		right: 0,
		width:60,
		height:60
	},
})



function mapStateToProps(state) {
	return {
		menu : state.menu,
		card : state.card,
		messenger: state.messenger,
		login: state.login
	};
}

export default connect(mapStateToProps)(AppLayout);

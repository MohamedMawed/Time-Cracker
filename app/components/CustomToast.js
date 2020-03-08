

import React, { Component } from 'react';
import { Text, View, TextInput, ActivityIndicator, Image, TouchableOpacity, Animated } from 'react-native';

import metrics from 'app/config/metrics'

export class CustomToast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            transAnim: new Animated.Value(0),
            transAnim2: new Animated.Value(metrics.screenHeight),
            errorMessage:""
        };
    }
    componentDidMount() {
       global.openToast=this.open
    }
    open=(message)=>{
        this.setState({errorMessage:message},()=>{
            let delayTime = 0
            Animated.parallel([
                Animated.timing(
                    this.state.fadeAnim,
                    { toValue: 1, duration: 300, delay: delayTime,useNativeDriver: true },
                ),
                Animated.timing(
                    this.state.transAnim2,
                    { toValue: metrics.screenHeight*.8, duration: 300, delay: delayTime,useNativeDriver: true },
                )
            ]).start(()=>{
                setTimeout(this.close,1000)
            })
        })
    
    }
    close = () => {
        Animated.parallel([
            Animated.timing(
                this.state.fadeAnim,
                { toValue: 0, duration: 400,useNativeDriver: true },
            ),
            Animated.timing(
                this.state.transAnim2,
                { toValue: metrics.screenHeight, duration: 500,useNativeDriver: true },
            )
        ]).start()
    }
    render() {
        return (
            <Animated.View
                style={{
                    transform: [{ translateY: this.state.transAnim2 }],
                    // bottom:this.state.transAnim,
                    position: "absolute",
                    opacity: this.state.fadeAnim,
                    width: metrics.screenWidth * 0.8,
                    height: metrics.screenHeight * .1,
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                <View style={{
                    backgroundColor: "grey",
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius: metrics.borderRadius,
                }}>
                    <Text style={{
                        paddingHorizontal: metrics.screenWidth * 0.02,
                        paddingVertical: metrics.screenWidth * 0.01,
                        color: "#fff",
                        textAlign: "center",
                    }}>{this.state.errorMessage}</Text>
                </View>


            </Animated.View>

        )
    }
}
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
        }
    }

    getCameraPermissions=async()=>{
        console.log('getcamerapermissions')
        const { status }= await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPremissions:status === 'granted',
            buttonState:'clicked',
            scanned:false,
        })
    }

    handleBarCodeScan=async({type,data})=>{
            this.setState({
                scanned:true,
                scannedData:data,
                buttonState:'normal',
            })
        }
    

    render(){
        const hasCameraPremissions=this.state.hasCameraPremissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === 'clicked' && hasCameraPremissions){
            return(<BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarCodeScan} style={StyleSheet.absoluteFillObject}/>)
        }else if(buttonState==='normal'){
            return(
                <View style={styles.container}>
                    
                    <View>
                    <Image style={{width:150, height:150}}source={require('../assets/b.jpg')}/>
                    <Text style={{textAlign:'center', fontSize:30}}>BarCode Scanner</Text>
                    </View>

                    <Text style={styles.displayText}>
                        {hasCameraPremissions === true ? this.state.scannedData : 'Request Camera Permission'}
                    </Text>

                    <View style={styles.inputView}>
                    <TouchableOpacity style={styles.scanButton} onPress={()=>this.getCameraPermissions}>
                        <Text style={styles.buttonText}>Scan</Text>
                    </TouchableOpacity>
                    </View>

                </View>
            );
        }
    }

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
  });
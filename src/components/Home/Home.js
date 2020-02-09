import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './style';
import axios from 'axios';
import { authorizationHeader, appUrl } from '../../config';

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buttonActive: false,
      buttonText: 'Activate',
      loading: false
    }
  }

   onPressButton = () => {
     var self = this;
     this.setState({ buttonText: 'Waiting' });
     this.setState({ loading: true });
     const options = {
       headers: {'Authorization': authorizationHeader,
       'Content-Type': 'application/json'}
     };
     axios.post(appUrl+'/activation', {
         productId: "82jqp008d2l00",
         emirate: "Dubai"
     }, options)
     .then(function (response) {
         console.log(response, 'response');
         self.setState({ loading: false });
         self.setState({ buttonActive: true });
         self.setState({ buttonText: 'Activated' });
     })
     .catch(function (error) {
        console.log(error, 'error');
         self.setState({ loading: false });
         self.setState({ buttonActive: false });
         self.setState({ buttonText: 'Activate' });
     });
  }

  render() {

    var homeStyle = StyleSheet.create(styles);
    return (
      <View style={homeStyle.homeBg}>
        <Image source={require('../../images/logo.png')} style={homeStyle.logoImage} />
        <TouchableOpacity style={styles.activateButton} onPress={this.onPressButton}>
            { this.state.loading && <ActivityIndicator size="small" color="#fff" style={styles.buttonLoading} /> }
            { !this.state.buttonActive && !this.state.loading &&
             <Image source={require('../../images/arrow-up-circle-outline.png')} style={homeStyle.buttonLoading} />
            }
            { this.state.buttonActive && !this.state.loading &&
               <Image source={require('../../images/check-circle-outline.png')} style={homeStyle.buttonLoading} />
            }
            <Text style={styles.activateButtonText}>{this.state.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Home;

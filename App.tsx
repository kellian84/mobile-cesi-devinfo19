/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, { Component, useEffect, useState } from 'react';
import { RewardedAd, RewardedAdEventType, TestIds } from '@react-native-firebase/admob';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  Button,
  ImageBackground
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare const global: { HermesInternal: null | {} };
const adUnitId = TestIds.REWARDED;
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});
export default class App extends React.Component {
  state = {
    pubsEnabled: true,
    loaded: false,
    rewardCount: 0
  };
  componentDidMount() {
    rewarded.load();
    rewarded.onAdEvent((type, error, reward) => {
      if (type === 'closed') {
        rewarded.load()
      }
      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
        this.setState({ rewardCount: this.state.rewardCount + Number(reward.amount) });
      }
      console.log(type);
    })
    //rewarded.onAdEvent();
  }
  render() {
    return (
      <>
        <ImageBackground source={{ uri: 'https://image.noelshack.com/fichiers/2020/41/5/1602243478-background.jpg' }} style={{ width: '100%', height: '100%' }}>
          <StatusBar />
          <SafeAreaView>
            <View style={styles.container}>
              <View style={styles.Parentnumber}>
                <Text style={styles.number}>{ this.state.rewardCount }</Text>
              </View>
              <View style={styles.body}>
                <Button title="Show Rewarded Ad"
                  onPress={() => {
                    rewarded.show();
                  }}
                  
                />
              </View>
              <View style={styles.convertPoint}>
                <Button title="Convertir mes points" 
                onPress={() => {
                  console.log('Pas encore dev')
                }}
                />
              </View>

            </View>  
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container:
  {
    justifyContent: 'center',
  },
  body: {
    backgroundColor: Colors.white,
  },
  logoHeader:
  {
  },
  Parentnumber:
  {
    justifyContent: 'center',
    flexDirection: "row",
  },
  number:
  {
    justifyContent: 'center',
    color: Colors.white,
    fontSize: 300,
  },
  boutton:
  {
    backgroundColor: "#ac1a70",
    color: Colors.white,
    fontSize: 300,
  },

  convertPoint:
  {
    marginTop: 15,
  }
});

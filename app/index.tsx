import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.imageView]} >
        <Image
          source={require('@/assets/images/index-l.png')}
          style={styles.image}
        />
      </View>
      <View style={[styles.textView]} >
        <Link style={[styles.linkText]} href="/fish">nivasilan ko a among</Link>
      </View>
      <View style={[styles.imageView]} >
        <Image
          source={require('@/assets/images/index-r.png')}
          style={styles.image}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003F5E",
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkText: {
    fontSize: 36,
    color: "#FAF8F5",
    textAlign: 'center'
  },
  imageView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
});

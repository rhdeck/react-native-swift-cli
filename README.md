# react-native-swift-cli
Helpers for initializing and getting started with making Swift-based native modules for React Native.

[![npm version](https://badge.fury.io/js/react-native-swift-cli.svg?style=flat)](https://badge.fury.io/js/react-native-swift-cli)
[![platform](https://img.shields.io/badge/platform-iOS-lightgrey.svg?style=flat)](https://github.com/rhdeck/react-native-swift-cli)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat)](https://github.com/rhdeck/react-native-swift-cli/blob/master/LICENSE)


## Requirements
* XCode 9.0 or newer.
* React Native 0.49 or newer (haven't tested it lower than that)

## Install globally for development
*react-native-swift-cli* is a helper utility for initializing new swift-based components. 
```bash
yarn global add react-native-swift-cli
```
To learn how it works:
```bash
react-native-swift --help
```

## How to make a new Swift-based native module
*react-native-swift* lets you quickly create a new swift-based native module and get coding.
```bash
react-native-swift init myproject
open myproject/ios/*xcode*
code myproject
```
## Wrapping with a test app
*react-native-swift* also makes it easy to create a new almost-blank react-native app and add your swift component.
```bash
react-native-swift makeapp myprojecttest myproject
```

## Adding to your app
You can add the Swift-based native module to you app relatively easily. 
```bash
yarn add myproject
yarn add react-native-swift
react-native link
```
The *react-native-swift* package will, via react-native link, take care of compatibility between your react native and the Swift based component. 
Done! 

## How it works
Starting in XCode 9.0, you can create static libaries that contain swift code. [Just create swift code the way found on the react-native documentation](https://facebook.github.io/react-native/docs/native-modules-ios.html) and add it to a static library. For reasons unknown, a couple flags need to get set inside the Xcode project file for the app to work with the library. This package forces that issue by adding a blank swift file to the build phases of the app targets, and setting the swift version flag. 

Future versions of Xcode may get less stupid and obviate the need for this package! Hopefully the templates remain a little helpful.


Time for me to confess that this is my second FOSS project. Let me know how it works for you! @ me: @ray_deck on twitter and rhdeck on Github. 
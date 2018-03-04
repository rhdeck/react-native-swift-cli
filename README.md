# react-native-swift-cli

Helpers for initializing and getting started with making Swift-based native modules for React Native.

[![npm version](https://badge.fury.io/js/react-native-swift-cli.svg?style=flat)](https://badge.fury.io/js/react-native-swift-cli)
[![platform](https://img.shields.io/badge/platform-iOS-lightgrey.svg?style=flat)](https://github.com/rhdeck/react-native-swift-cli)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat)](https://github.com/rhdeck/react-native-swift-cli/blob/master/LICENSE)

# Requirements

* XCode 9.0 or newer.
* React Native 0.49 or newer (haven't tested it lower than that)

# Install globally for development

_react-native-swift-cli_ is a helper utility for initializing new swift-based components.

```bash
yarn global add react-native-swift-cli
```

To learn how it works:

```bash
react-native-swift --help
```

# How to make a new Swift-based native module

_react-native-swift_ lets you quickly create a new swift-based native module and get coding.

```bash
react-native-swift init myproject
open myproject/ios/*xcode*
code myproject
```

# Usage

This comes with scripts now!

## yarn bridge

Automatically build the bridge file from Swift to React-Native. No more objective-c coding! Uses [react-native-swift-bridge](https://npmjs.org/package/react-native-swift-bridge) for the building work - check that out for idiosyncracies.

## yarn watch

Will watch your swift files (in the module) for changes, and rebuild your objective-c module on the fly. Super-handy. Best practice is to run as background process so as not to lock up a terminal:

```bash
yarn watch &
```

## yarn addpod

Utilizes the magic of [react-native-pod](https://npmjs.com/package/react-native-pod) to add Cocoapod dependencies to your module. Here's how:

```bash
yarn addpod TwilioVideo --podversion 2.0.0-beta1
```

NOte that this does not install the pod - it just tells your module to list it as a required pod in `package.json`. Then apps that require it will bring the pod to the party through their own `react-native link` process.

## yarn removepod

Undo. `yarn removepod TwilioVideo`

# Wrapping with a test app

Don't develop native code from your static library. Never works well. Lots of XCode red lights. Best practice is to work from the context of a runnable app.

`react-native-swift` makes it easy to create a new almost-blank react-native app and add your swift module.

```bash
react-native-swift makeapp myprojecttest myproject
```

# Adding the module to an existing app

You can add the Swift-based native module to you app relatively easily.

```bash
cd /path/to/myapp
yarn add link:/path/to/myproject # local link
# yarn add @me/myproject # npm registered
# yarn add meongithub/myproject # github fetch
yarn add react-native-swift
react-native link
```

The _react-native-swift_ package will, via react-native link, take care of compatibility between your react native and the Swift based component.
Done!

Well, almost. **If** you are using a CocoaPod, you will want to do the following:

```
yarn add react-native-pod react-native-fix-pod-links
react-native link
```

Note that `react-native-fix-pod-links` is only necessary if you are using the locally linked project approach above.

## How it works

Starting in XCode 9.0, you can create static libaries that contain swift code. [Just create swift code the way found on the react-native documentation](https://facebook.github.io/react-native/docs/native-modules-ios.html) and add it to a static library. For reasons unknown, a couple flags need to get set inside the Xcode project file for the app to work with the library. This package forces that issue by adding a blank swift file to the build phases of the app targets, and setting the swift version flag.

Future versions of Xcode may get less stupid and obviate the need for `react-native-swift`! Hopefully the templates in this package remain helpful.

Time for me to confess that this is my second FOSS project. Let me know how it works for you! @ me: @ray_deck on twitter and rhdeck on Github.

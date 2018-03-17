import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native";
import { NativeMod, BasicView, CameraView } from "rnswifttemplate";

export default class App extends Component {
  state = {
    instructions: "Template Instructions",
    counter: 0,
    cameraFront: true
  };
  async componentWillMount() {
    var me = this;
    NativeMod.addListener(arr => {
      this.setState(previousState => {
        const newcounter = previousState.counter + 1;
        const newmessage = "Again a number: " + newcounter.toString();
        setTimeout(() => {
          NativeMod.emitMessage(newmessage, 0);
        }, 500);
        return {
          instructions: "Received message: " + arr.message,
          counter: newcounter
        };
      });
    });
    await NativeMod.emitMessage("Starting");
    try {
      const reply = await NativeMod.demoWithPromise("Hello there");
      console.log("Got a promise back", reply);
      this.setState({ promiseMessage: reply });
    } catch (e) {
      console.log("Got an error back");
      this.setState({ promiseMessage: "failed promise!" });
    }
  }
  render() {
    const constMessage = "My constant startTime is " + NativeMod.startTime;
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <View
          style={{ flex: 0.75, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.welcome}>Welcome to React Native Swift!</Text>
          <Text>{constMessage}</Text>
          <Text style={styles.instructions}>
            Edit App.js and your plugin index.js for live edits.
          </Text>
          <Text style={styles.welcome}>{this.state.instructions}</Text>
          <Text style={styles.welcome}>
            Promise: {this.state.promiseMessage}
          </Text>
        </View>
        <View
          style={{
            flex: 0.25,
            justifyContent: "center",
            alignItems: "center",
            borderTopWidth: 2,
            borderTopColor: "gray"
          }}
        >
          <View style={{ height: 40 }}>
            <Text>
              Starting with a basic native view. That's the green thing. Pretty
              boring.
            </Text>
          </View>
          <BasicView style={{ height: 50, width: "50%" }} />
        </View>
        <View style={{ flex: 1, borderTopWidth: 2, borderTopColor: "gray" }}>
          <View style={{ height: 60, width: "100%", alignItems: "center" }}>
            <Text>
              This is a native camera view. You can control direction via props
              (set through the button below). Tap the image to take a photo.
            </Text>
          </View>
          <Button
            title="Flip camera"
            onPress={() => {
              console.log("Hi there setting");
              this.setState(({ cameraFront }) => {
                return {
                  cameraFront: !cameraFront,
                  cameraText: cameraFront ? "Looking forward" : "Looking back"
                };
              });
            }}
          />
          <View style={{ height: 20, width: "100%", alignItems: "center" }}>
            <Text>{this.state.cameraText}</Text>
          </View>
          <TouchableOpacity
            onPress={async () => {
              const result = await CameraView.takePicture();
              console.log(result);
              const newText = result
                ? "Took a picture!"
                : "Error taking picture";
              this.setState({ cameraText: newText });
            }}
          >
            <CameraView
              style={{ width: "100%", height: "100%" }}
              cameraFront={this.state.cameraFront}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

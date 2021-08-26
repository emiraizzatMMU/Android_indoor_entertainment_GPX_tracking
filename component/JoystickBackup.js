import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import { JOYSTICK_SIZE } from "../utils/AppConstant";

class JoystickBackup extends React.Component {
  state = {
    dir: "",
  };

  handleDir = (dir) => () => {
    this.setState(
      {
        dir,
      },
      () => {
        console.log("dir:", this.state.dir);
      }
    );
  };

  render() {
    const { step } = this.state;

    const JoystickArea = ({ color, dir }) => {
      return (
        <TouchableWithoutFeedback
          onPressIn={this.handleDir(dir)}
          onPressOut={this.handleDir("")}
        >
          <View
            style={{ backgroundColor: color, height: "33%", width: "33%" }}
          />
        </TouchableWithoutFeedback>
      );
    };

    const JoystickSmallArea = ({ color, dir }) => {
      return (
        <TouchableWithoutFeedback
          onPressIn={this.handleDir(dir)}
          onPressOut={this.handleDir("")}
        >
          <View
            style={{ backgroundColor: color, height: "50%", width: "50%" }}
          />
        </TouchableWithoutFeedback>
      );
    };

    return (
      <View
        style={{
          height: JOYSTICK_SIZE,
          width: JOYSTICK_SIZE,
          borderRadius: JOYSTICK_SIZE / 2,
          // overflow: "hidden",
          flexDirection: "row",
          flexWrap: "wrap",
          transform: [{ rotate: "45deg" }],
        }}
      >
        <JoystickArea color="blue" dir="N" />
        <View
          style={{
            backgroundColor: "green",
            height: "33%",
            width: "33%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <JoystickSmallArea color="blue" dir="N" />
          <JoystickSmallArea color="yellow" dir="E" />
          <JoystickSmallArea color="blue" dir="N" />
          <JoystickSmallArea color="yellow" dir="E" />
        </View>
        <JoystickArea color="yellow" dir="E" />
        <View
          style={{
            backgroundColor: "pink",
            height: "33%",
            width: "33%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <JoystickSmallArea color="blue" dir="W" />
          <JoystickSmallArea color="blue" dir="W" />
          <JoystickSmallArea color="maroon" dir="S" />
          <JoystickSmallArea color="maroon" dir="S" />
        </View>

        <View style={{ backgroundColor: "red", height: "33%", width: "33%" }} />
        <View
          style={{
            backgroundColor: "pink",
            height: "33%",
            width: "33%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <JoystickSmallArea color="yellow" dir="W" />
          <JoystickSmallArea color="yellow" dir="W" />
          <JoystickSmallArea color="white" dir="S" />
          <JoystickSmallArea color="white" dir="S" />
        </View>
        <JoystickArea color="maroon" dir="E" />
        <View
          style={{
            backgroundColor: "black",
            height: "33%",
            width: "33%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <JoystickSmallArea color="maroon" dir="W" />
          <JoystickSmallArea color="white" dir="W" />
          <JoystickSmallArea color="maroon" dir="S" />
          <JoystickSmallArea color="white" dir="S" />
        </View>

        <JoystickArea color="white" dir="E" />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default JoystickBackup;

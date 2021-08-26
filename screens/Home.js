import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import { JOYSTICK_SIZE, STEP_SENSITIVITY } from "../utils/AppConstant";
import { AntDesign } from "@expo/vector-icons";
// import AxisPad from "react-native-axis-pad";

class Home extends React.Component {
  state = {
    x: 0,
    y: 0,
    z: 0,
    step: 0,
    dir: "",
  };

  componentDidMount() {
    this.subscription = Accelerometer.addListener((accelerometerData) => {
      Accelerometer.setUpdateInterval(100);
      let { x, y, z } = accelerometerData;
      this.setState({
        x,
        y,
        z,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.x != this.state.x ||
      prevState.y != this.state.y ||
      prevState.z != this.state.z
    ) {
      let { x, y, z, step } = this.state;

      let val = Math.sqrt(x * x + y * y + z * z);
      val = Math.abs(val);

      if (val >= STEP_SENSITIVITY) {
        this.setState({
          step: step + 1,
        });
      }
    }
  }

  componentWillUnmount() {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  }

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

  handleMenu = () => {
    console.log("menu");
  };

  handleButtonA = () => {
    console.log("A");
  };

  handleButtonB = () => {
    console.log("B");
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
      <View style={styles.container}>
        <View style={styles.joystickContainer}>
          {/* <AxisPad
          resetOnRelease={true}
          autoCenter={true}
          size={150}
          handlerSize={75}
          onValue={({ x, y }) => {
            // values are between -1 and 1
            // console.log(x, y);
          }}
        ></AxisPad> */}
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

            <View
              style={{ backgroundColor: "red", height: "33%", width: "33%" }}
            />
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
        </View>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              transform: [{ rotate: "90deg" }],
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 50,
            }}
          >
            <TouchableOpacity onPress={this.handleMenu}>
              <AntDesign
                name="menufold"
                size={30}
                style={{ marginBottom: 15 }}
              />
            </TouchableOpacity>
            <Text style={styles.stepText}>Step: {step}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 4,
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <View
            style={{
              width: "50%",
              height: "50%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "red",
            }}
          >
            <TouchableOpacity
              onPress={this.handleButtonB}
              style={styles.joystickButtonContainer}
            >
              <Text style={styles.joystickButtonText}>B</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "50%", height: "50%" }} />
          <View style={{ width: "50%", height: "50%" }} />
          <View
            style={{
              width: "50%",
              height: "50%",
              backgroundColor: "yellow",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={this.handleButtonA}
              style={styles.joystickButtonContainer}
            >
              <Text style={styles.joystickButtonText}>A</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 50,
    alignItems: "center",
  },
  joystickContainer: {
    backgroundColor: "red",
    flex: 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    fontSize: 15,
  },
  joystickButtonContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  joystickButtonText: {
    fontSize: 50,
    textAlign: "center",
    transform: [{ rotate: "90deg" }],
  },
});

export default Home;

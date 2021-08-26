import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import {
  JOYSTICK_SENSITIVITY,
  JOYSTICK_SIZE,
  STEP_SENSITIVITY,
} from "../utils/AppConstant";
import { AntDesign } from "@expo/vector-icons";
import AxisPad from "react-native-axis-pad";

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
    if (prevState.dir !== this.state.dir) {
      console.log("dir: ", this.state.dir);
    }
  }

  componentWillUnmount() {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  }

  handleDir = ({ x, y }) => {
    let posVal = JOYSTICK_SENSITIVITY;
    let negVal = JOYSTICK_SENSITIVITY * -1;
    let dir = "";

    if (x < negVal || x > posVal || y < negVal || y > posVal) {
      if (x < 0) {
        if (y > x * -1) {
          dir = "E";
        } else if (y < x) {
          dir = "W";
        } else {
          dir = "S";
        }
      } else if (x > 0) {
        if (y < x * -1) {
          dir = "W";
        } else if (y > x) {
          dir = "E";
        } else {
          dir = "N";
        }
      }
    }

    this.setState({
      dir,
    });
  };

  handleMenu = () => {
    console.log("menu");
  };

  handleButtonAShort = () => {
    console.log("short A");
  };

  handleButtonALong = () => {
    console.log("long A");
  };

  handleButtonBShort = () => {
    console.log("short B");
  };

  handleButtonBLong = () => {
    console.log("long B");
  };

  render() {
    const { step } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.joystickContainer}>
          <AxisPad
            resetOnRelease={true}
            autoCenter={true}
            size={JOYSTICK_SIZE}
            handlerSize={JOYSTICK_SIZE * (2 / 3)}
            onValue={this.handleDir}
          ></AxisPad>
        </View>
        <View style={styles.controlMenuContainer}>
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
                size={40}
                style={{ marginBottom: 20 }}
              />
            </TouchableOpacity>
            <Text style={styles.stepText}>STEP</Text>
            <Text style={styles.stepNumber}>{step}</Text>
          </View>
        </View>
        <View style={styles.gameButtonContainer}>
          <View
            style={[
              styles.gameButton,
              {
                backgroundColor: "lightcoral",
              },
            ]}
          >
            <TouchableOpacity
              onPress={this.handleButtonBShort}
              onLongPress={this.handleButtonBLong}
              style={styles.gameButtonTouchable}
            >
              <Text style={styles.gameButtonText}>B</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gameButton} />
          <View style={styles.gameButton} />
          <View
            style={[
              styles.gameButton,
              {
                backgroundColor: "mediumspringgreen",
              },
            ]}
          >
            <TouchableOpacity
              onPress={this.handleButtonAShort}
              onLongPress={this.handleButtonALong}
              style={styles.gameButtonTouchable}
            >
              <Text style={styles.gameButtonText}>A</Text>
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
    flex: 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  controlMenuContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  gameButtonContainer: {
    flex: 4,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  stepText: {
    fontSize: 12,
  },
  stepNumber: {
    fontSize: 21,
  },
  gameButton: {
    width: "50%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  gameButtonTouchable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  gameButtonText: {
    fontSize: 50,
    textAlign: "center",
    transform: [{ rotate: "90deg" }],
  },
});

export default Home;

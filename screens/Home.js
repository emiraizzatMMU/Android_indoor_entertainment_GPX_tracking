import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import { STEP_SENSITIVITY } from "../utils/AppConstant";

//import { Pedometer } from "expo-legacy";

class Home extends React.Component {
  state = {
    x: 0,
    y: 0,
    z: 0,
    step: 0,
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

  render() {
    const { step } = this.state;

    return (
      <View style={styles.container}>
        <Text>Walk! And watch this go up: {step}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  text: {
    fontSize: 40,
  },
});

export default Home;

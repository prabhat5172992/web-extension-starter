import React from "react";
import { tConvert } from "./helper";

const greetings = {
  morning: "Good morning",
  noon: "Good afternoon",
  evening: "Good evening",
  night: "Good night",
};
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      greeting: greetings.morning,
    };
    this.startTime = this.startTime.bind(this);
  }

  componentDidMount() {
    this.startTime();
  }

  startTime() {
    let today = new Date();
    let h = today.getHours();
    let greeting;
    if (h > 6 && h < 12) {
      greeting = greetings.morning;
    } else if (h >= 12 && h < 17) {
      greeting = greetings.noon;
    } else if (h >= 17 && h < 20) {
      greeting = greetings.evening;
    } else {
      greeting = greetings.night;
    }
    this.setState({ greeting });
    setTimeout(this.startTime, 1000);
  }

  displayTime() {
    const dateValue = Date().split("GMT")[0].trim();
    const [d1, d2] = dateValue.split(new Date().getUTCFullYear());
    return (
      <h3>
        {d1.trim()} {tConvert(d2.trim())}
      </h3>
    );
  }

  render() {
    return (
      <div className="App">
        <div>
          <div>
            <h1>{this.state.greeting}</h1>
          </div>
          <div>{this.displayTime()}</div>
        </div>
      </div>
    );
  }
}

export default App;

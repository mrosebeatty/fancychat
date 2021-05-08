import "./App.css";
import React, { Component } from "react";
import SignUpForm from "../src/components/SignUpForm";

class App extends Component {
  state = {
    hasSignedUp: false,
  };

  handleSignUp = (e) => {
    e.preventDefault()
    this.setState({
      hasSignedUp: !this.state.hasSignedUp
    }

    )
  };
  render() {
    return (
      <div className="App">
        <SignUpForm onSignUp={this.handleSignUp} />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
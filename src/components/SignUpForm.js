import React, { Component } from "react";

class SignUpForm extends Component {
  state ={
      email: '',
      password: ''
  }
handleChange = (e) => {
    console.log(e)
}
updateEmail = (e) => {
    this.setState({
        email: e.target.value
    })
}
updatePassword = (e)=> {
    this.setState({
        password: e.target.value
    })
}
onSubmit = (e) => {
    e.preventDefault()
    this.props.onSignUp(this.state)
    this.setState({
        email: '',
        password:''
    })
}

    render() {
    return (
    <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="Email" value={this.state.email} onChange ={this.updateEmail} />
        <input type="password" placeholder='Password' value={this.state.password} onChange={this.updatePassword}/>
        <button type='submit'>Sign Up</button>
    </form>
    )
  }
}

export default SignUpForm;
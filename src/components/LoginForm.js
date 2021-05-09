import React, { Component } from "react";

class LoginForm extends Component {
    state= {
        email: '',
        password: ''
    }

    updateEmail =(e) => {
        this.setState({
            email: e.target.value
        })

    }
    updatePassword =(e) => {
        this.setState({
            password: e.target.value
        })
    }

    login = (e) => {
        e.preventDefault()
        this.props.onLogin(this.state)
        this.setState({
            email: '',
            password: ''
        })
    }

   
  render() {
    return <form onSubmit={this.login}>
        <input type="email" placeholder="Email..." value={this.state.email}
        onChange={this.updateEmail}/>
        <input type="password" placeholder='Password'
        value={this.state.password}
        onChange={this.updatePassword} />
        <button type="submit">Login</button>
    </form>;
  }
}

export default LoginForm;


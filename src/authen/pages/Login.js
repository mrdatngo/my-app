import React, { Component } from 'react';
import { login } from '../api/index'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: "",
                password: "",
            },
            message: {
                err: "",
                success: "",
            },
            loading: false,
        }
    }

    btnLogin = () => {
        this.setState({ loading: true, message: {}})
        login(this.state.data).then(res => {
            if (res.data.token) {
                console.log("Login successful!")
                localStorage.setItem("token", res.data.token)
                // redirect to homepage
                setTimeout(() => {
                    window.location.href = "/"
                }, 1000)
                this.setState({ message: { success: "Successful!"}} )
            }
            this.setState({ loading: false})
        }).catch(err => {
            console.log(err.response);
            this.setState({ loading: false});
            this.setState({ message: { err: err.response.data.err}} )
        })
    }

    onDataChange = (event) => {
        this.setState({ data: { ...this.state.data, [event.target.name]: event.target.value } })
    }

    render() {
        let { message, loading } = this.state;
        return (
            <div>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" onChange={this.onDataChange} />
                <br/>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" onChange={this.onDataChange}/>
                <br/>
                { loading && <p style={{color: "green"}}> Login... </p>}
                <p style={{color: "red"}}> { message.err } </p>
                <p style={{color: "green"}}> { message.success}</p>
                <button onClick={this.btnLogin}>Login</button>
            </div>
        );
    }
}

export default Login;

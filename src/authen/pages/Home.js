import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div>
                HomePage
                <button onClick={
                    localStorage.removeItem("token")
                }>Logout</button>
            </div>
        );
    }
}

export default Home;

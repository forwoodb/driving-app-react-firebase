import React, {Component} from 'react';
import Main from './Components/Main';
import {auth, provider}  from './firebase.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // Persist Login Across Refresh
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
           user: user.uid,
         });
      }
    });
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user: user.uid,
        });
      });
      // window.location = '/';
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
      window.location = '/';
  }

  render() {
    return (
      <div className="App">
        <Main
          user={this.state.user}
          logout={this.logout}
          login={this.login}
        />
      </div>
    );
  }
}

export default App;

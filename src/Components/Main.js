import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';

// Components
import HeaderNavbar from './Navbar.js';
import NewOrder from './NewOrder.js';
import OrdersList from './OrdersList.js';
import EditOrder from './EditOrder.js';
import Analysis from './Analysis.js';


class Main extends Component {
  constructor() {
    super();
    this.__isMounted = false;
    this.state = {
      orders: [],
    }
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  componentDidMount() {
    this.__isMounted = true;
    firebase.database().ref('orders').on('value', (snapshot) => {
      const data = snapshot.val();
      let orders = [];

      let user;
      if (this.props.user) {
        user = this.props.user;
      } else {
        user = 'demo';
      }

      for (var order in data) {
        if (data[order].user === user) {
          orders.push({
            id: order,
            user: data[order].user,
            ...data[order]
          })
        }
      }

      this.__isMounted &&
      this.setState({
        orders: orders,
      })
    })
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  deleteOrder(delOrder) {
    firebase.database().ref('orders/' + delOrder).remove();
  }

  render() {
    return (
      <div className="container">
        <Router>
          <HeaderNavbar
            user={this.props.user}
            logout={this.props.logout}
            login={this.props.login}
          />
          <Route exact path="/">
            <NewOrder user={this.props.user}/>
          </Route>
          <Route path="/OrdersList">
            <OrdersList
              user={this.props.user}
              login={this.login}
              orders={this.state.orders}
              onDelete={this.deleteOrder}
            />
          </Route>
          <Route path="/Analysis">
            <Analysis user={this.props.user} orders={this.state.orders}/>
          </Route>
          <Route path="/Edit/:id" exact component={EditOrder}/>
        </Router>
      </div>
    );
  }
}

export default Main;
import React, {Component} from 'react';
import * as firebase from 'firebase';
// import axios from 'axios';

export default class AnalysisUberEats extends Component {
  constructor() {
    super();

    this.state = {
      numberOrders: '',
      averageTime: '',
      averageDistance: '',
      dollarOrder: '',
      dollarHour: '',
      dollarMile: '',
    }

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
          orders.push({...data[order]})
        }
      }

      // UberEats
      let uberEats = orders.filter(order => order.platform === 'UberEats');

      let averageTime = uberEats.reduce(function(total, order) {
        return total + Number(order.duration);
      }, 0)/uberEats.length;

      let averageDistance = uberEats.reduce(function(total, order) {
        return total + Number(order.distance);
      }, 0)/uberEats.length;

      let dollarOrder = uberEats.reduce(function(total, order) {
        return total + Number(order.earnings);
      }, 0)/uberEats.length;

      let dollarHour = uberEats.reduce(function(total, order) {
        return total + Number(order.earnings);
      }, 0)/uberEats.length/averageTime * 60;

      let dollarMile = uberEats.reduce(function(total, order) {
        return total + Number(order.earnings);
      }, 0)/uberEats.length/averageDistance;

      this.__isMounted &&
      this.setState({
        numberOrders: uberEats.length,
        averageTime: averageTime.toFixed(2),
        averageDistance: averageDistance.toFixed(2),
        dollarOrder: dollarOrder.toFixed(2),
        dollarHour: dollarHour.toFixed(2),
        dollarMile: dollarMile.toFixed(2),
      });
    });
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  render() {
    return (
      <tr>
        <td className="text-center">UberEats</td>
        <td className="text-center">{this.state.numberOrders}</td>
        <td className="text-center">{this.state.averageTime}</td>
        <td className="text-center">{this.state.averageDistance}</td>
        <td className="text-center">{this.state.dollarOrder}</td>
        <td className="text-center">{this.state.dollarHour}</td>
        <td className="text-center">{this.state.dollarMile}</td>
      </tr>
    );
  }
}
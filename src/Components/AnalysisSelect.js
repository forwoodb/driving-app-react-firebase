import React, {Component} from 'react';
import * as firebase from 'firebase';

export default class AnalysisSelect extends Component {
  constructor() {
    super();

    this.state = {
      platform: 'All',
      numberOrders: '',
      averageTime: '',
      averageDistance: '',
      dollarOrder: '',
      dollarHour: '',
      dollarMile: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData(platformValue) {
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

      if (platformValue === 'All') {
        orders = orders;
      } else if (platformValue) {
        orders = orders.filter(order => order.platform === platformValue);
      }


      let averageTime = orders.reduce(function(total, order) {
        return total + Number(order.duration);
      }, 0)/orders.length;

      let averageDistance = orders.reduce(function(total, order) {
        return total + Number(order.distance);
      }, 0)/orders.length;

      let dollarOrder = orders.reduce(function(total, order) {
        return total + Number(order.earnings);
      }, 0)/orders.length;

      let dollarHour = orders.reduce(function(total, order) {
        return total + Number(order.earnings);
      }, 0)/orders.length/averageTime * 60;

      let dollarMile = orders.reduce(function(total, order) {
        return total + Number(order.earnings);
      }, 0)/orders.length/averageDistance;

      this.__isMounted &&
      this.setState({
        platform: platformValue,
        numberOrders: orders.length,
        averageTime: averageTime.toFixed(2),
        averageDistance: averageDistance.toFixed(2),
        dollarOrder: dollarOrder.toFixed(2),
        dollarHour: dollarHour.toFixed(2),
        dollarMile: dollarMile.toFixed(2),
      });
      // console.log(platformValue);
    });
  }

  componentDidMount() {
    this.__isMounted = true;
    this.getData(this.state.platform);
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  handleChange(e) {
    this.getData(e.target.value);
    console.log(e.target.value);
  }

  render() {
    return (
      <tr>
        <td className="text-center">
          <select value={this.state.platform} onChange={this.handleChange}>
            <option>All</option>
            <option>DoorDash</option>
            <option>GrubHub</option>
            <option>UberEats</option>
          </select>
        </td>
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
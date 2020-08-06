import React, {Component} from 'react';
// import * as firebase from 'firebase';

export default class AnalysisSelect extends Component {
  constructor() {
    super();
    this.state = {
      platform: 'All',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      platform: e.target.value,
    })
  }

  render() {
    let orders = this.props.orders;
    let platform = this.state.platform;

    if (platform === 'All') {
      orders = this.props.orders;
    } else if (platform) {
      orders = orders.filter(order => order.platform === platform);
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

    return (
      <tr>
        <td className="text-center">All</td>
        <td className="text-center">
          <select name="platform" value={this.state.platform} onChange={this.handleChange}>
            <option>All</option>
            <option>DoorDash</option>
            <option>GrubHub</option>
            <option>UberEats</option>
          </select>
        </td>
        <td className="text-center">{orders.length}</td>
        <td className="text-center">{averageTime.toFixed(2)}</td>
        <td className="text-center">{averageDistance.toFixed(2)}</td>
        <td className="text-center">{dollarOrder.toFixed(2)}</td>
        <td className="text-center">{dollarHour.toFixed(2)}</td>
        <td className="text-center">{dollarMile.toFixed(2)}</td>
      </tr>
    );
  }
}
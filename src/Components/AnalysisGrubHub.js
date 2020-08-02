import React, {Component} from 'react';
import * as firebase from 'firebase';
// import axios from 'axios';

export default class AnalysisGrubHub extends Component {
  constructor() {
    super();

    this.state = {
      numberOrdersGrubHub: '',
      averageTimeGrubHub: '',
      averageDistanceGrubHub: '',
      dollarOrder: '',
      dollarMinuteGrubHub: '',
      dollarMileGrubHub: '',
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

      // GrubHub
      let grubHub = orders.filter(order => order.platform === 'GrubHub');

      let averageTimeGrubHub = grubHub.reduce(function(total, order) {
        return total + Number(order.duration);
      }, 0)/grubHub.length;

      let averageDistanceGrubHub = grubHub.reduce(function(total, order) {
        return total + Number(order.distance);
      }, 0)/grubHub.length;

      let dollarOrder = grubHub.reduce(function(total, order) {
        return total + Number(order.earnings);
      }, 0)/grubHub.length;

      let dollarMinuteGrubHub = grubHub.reduce(function(total, order) {
        return total + Number(order.earnings);
      }, 0)/grubHub.length/averageTimeGrubHub * 60;

      let dollarMileGrubHub = grubHub.reduce(function(total, order) {
        return total + Number(order.earnings);
      }, 0)/grubHub.length/averageDistanceGrubHub;

      this.__isMounted &&
      this.setState({
        numberOrdersGrubHub: grubHub.length,
        averageTimeGrubHub: averageTimeGrubHub.toFixed(2),
        averageDistanceGrubHub: averageDistanceGrubHub.toFixed(2),
        dollarOrder: dollarOrder.toFixed(2),
        dollarMinuteGrubHub: dollarMinuteGrubHub.toFixed(2),
        dollarMileGrubHub: dollarMileGrubHub.toFixed(2),
      });
    })
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  render() {
    return (
      <tr>
        <td className="text-center">GrubHub</td>
        <td className="text-center">{this.state.numberOrdersGrubHub}</td>
        <td className="text-center">{this.state.averageTimeGrubHub}</td>
        <td className="text-center">{this.state.averageDistanceGrubHub}</td>
        <td className="text-center">{this.state.dollarOrder}</td>
        <td className="text-center">{this.state.dollarMinuteGrubHub}</td>
        <td className="text-center">{this.state.dollarMileGrubHub}</td>
      </tr>
    );
  }
}
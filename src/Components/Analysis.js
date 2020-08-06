import React, {Component} from 'react';
// import * as firebase from 'firebase';

// Components
import AnalysisAll from './AnalysisAll.js';
import AnalysisSelect from './AnalysisSelect.js';
import AnalysisSelectLocation from './AnalysisSelectLocation.js';

export default class Analysis extends Component {
  render() {
    // Orders
    let orders = this.props.orders;

    let platforms = orders.map(order => order.platform);
    platforms = [...new Set(platforms)].sort();
    console.log(platforms);

    let averageTime = orders.reduce(function(total, order) {
      return total + parseFloat(order.duration);
    }, 0)/orders.length;

    let averageDistance = orders.reduce(function(total, order) {
      return total + parseFloat(order.distance);
    }, 0)/orders.length;

    let dollarOrder = orders.reduce(function(total, order) {
      return total + parseFloat(order.earnings);
    }, 0)/orders.length;

    let dollarHour = orders.reduce(function(total, order) {
      return total + parseFloat(order.earnings);
    }, 0)/orders.length/averageTime * 60;

    let dollarMile = orders.reduce(function(total, order) {
      return total + parseFloat(order.earnings);
    }, 0)/orders.length/averageDistance;

    return (
      <div>
        <h1>Platform</h1>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Platform</th>
              <th># of Orders</th>
              <th>Average Time</th>
              <th>Average Distance</th>
              <th>$/Order</th>
              <th>$/Hour</th>
              <th>$/Mile</th>
            </tr>
          </thead>
          <tbody>
            <AnalysisAll
              user={this.props.user}
              numberOrders={orders.length}
              averageTime={averageTime.toFixed(2)}
              averageDistance={averageDistance.toFixed(2)}
              dollarOrder={dollarOrder.toFixed(2)}
              dollarHour={dollarHour.toFixed(2)}
              dollarMile={dollarMile.toFixed(2)}
            />
            {
              platforms.map((platform, index) => {
                let platformOrders = orders.filter(order => order.platform === platform);

                let averageTime = platformOrders.reduce(function(total, order) {
                  return total + parseFloat(order.duration);
                }, 0)/platformOrders.length;

                let averageDistance = platformOrders.reduce(function(total, order) {
                  return total + parseFloat(order.distance);
                }, 0)/platformOrders.length;

                let dollarOrder = platformOrders.reduce(function(total, order) {
                  return total + parseFloat(order.earnings);
                }, 0)/platformOrders.length;

                let dollarHour = platformOrders.reduce(function(total, order) {
                  return total + parseFloat(order.earnings);
                }, 0)/platformOrders.length/averageTime * 60;

                let dollarMile = platformOrders.reduce(function(total, order) {
                  return total + parseFloat(order.earnings);
                }, 0)/platformOrders.length/averageDistance;

                return (
                  <tr key={index}>
                    <td className="text-center">{platform}</td>
                    <td className="text-center">{platformOrders.length}</td>
                    <td className="text-center">{averageTime.toFixed(2)}</td>
                    <td className="text-center">{averageDistance.toFixed(2)}</td>
                    <td className="text-center">{dollarOrder.toFixed(2)}</td>
                    <td className="text-center">{dollarHour.toFixed(2)}</td>
                    <td className="text-center">{dollarMile.toFixed(2)}</td>
                  </tr>
                );
              })
            }
          </tbody>
          <thead>
            <tr>
              <th>Location</th>
              <th>Platform</th>
              <th># of Orders</th>
              <th>Average Time</th>
              <th>Average Distance</th>
              <th>$/Order</th>
              <th>$/Hour</th>
              <th>$/Mile</th>
            </tr>
          </thead>
          <tbody>
            <AnalysisSelectLocation
              user={this.props.user}
              orders={this.props.orders}
            />

            <AnalysisSelect
              user={this.props.user}
              orders={this.props.orders}
            />
          </tbody>
        </table>
      </div>
    );
  }
}
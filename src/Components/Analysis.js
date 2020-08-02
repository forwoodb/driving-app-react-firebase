import React, {Component} from 'react';
import * as firebase from 'firebase';

// Components
import AnalysisUberEats from './AnalysisUberEats.js';
import AnalysisGrubHub from './AnalysisGrubHub.js';
import AnalysisDoorDash from './AnalysisDoorDash.js';
import AnalysisAll from './AnalysisAll.js';
import AnalysisSelect from './AnalysisSelect.js';
import AnalysisSelectLocation from './AnalysisSelectLocation.js';

export default class Analysys extends Component {
  render() {
    // Orders
    let orders = this.props.orders;



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
            <AnalysisDoorDash
              user={this.props.user}
              orders={this.props.orders}
              numberOrders={orders.length}
              averageTime={averageTime.toFixed(2)}
              averageDistance={averageDistance.toFixed(2)}
              dollarOrder={dollarOrder.toFixed(2)}
              dollarHour={dollarHour.toFixed(2)}
              dollarMile={dollarMile.toFixed(2)}
            />
            <AnalysisGrubHub user={this.props.user}/>
            <AnalysisUberEats user={this.props.user}/>
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
            {
            //   this.props.orders.map((order, id) => {
            //   return <AnalysisSelectLocation
            //     user={this.props.user} orders={this.props.orders}
            //     id={order.id}
            //     locations={order.location}
            //   />
            // })
            }

            <AnalysisSelect user={this.props.user}/>
          </tbody>
        </table>
      </div>
    );
  }
}
import React, {Component} from 'react';
// import * as firebase from 'firebase';

// Components
import AnalysisSelectLocation from './AnalysisSelectLocation.js';

class Analysis extends Component {
  render() {
    // Orders
    let orders = this.props.orders;

    let platforms = orders.map(order => order.platform);
    platforms = [...new Set(platforms)].sort();
    console.log(platforms);

    function averageTime(data) {
      return (
        data.reduce(function(total, order) {
          return total + parseFloat(order.duration);
        }, 0)/data.length
      );
    }

    function averageDistance(data) {
      return (
        data.reduce(function(total, order) {
          return total + parseFloat(order.distance);
        }, 0)/data.length
      );
    }

    function dollarOrder(data) {
      return (
        data.reduce(function(total, order) {
          return total + parseFloat(order.earnings);
        }, 0)/data.length
      );
    }

    function dollarHour(data) {
      return (
        data.reduce(function(total, order) {
          return total + parseFloat(order.earnings);
        }, 0)/data.length/averageTime(data) * 60
      );
    }

    function dollarMile(data) {
      return (
        data.reduce(function(total, order) {
          return total + parseFloat(order.earnings);
        }, 0)/data.length/averageDistance(data)
      );
    }

    console.log(dollarHour(orders));

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
            <AnalysisPlatform
              user={this.props.user}
              platform="All"
              numberOrders={orders.length}
              averageTime={averageTime(orders).toFixed(2)}
              averageDistance={averageDistance(orders).toFixed(2)}
              dollarOrder={dollarOrder(orders).toFixed(2)}
              dollarHour={dollarHour(orders).toFixed(2)}
              dollarMile={dollarMile(orders).toFixed(2)}
            />
            {
              platforms.map((platform, index) => {
                let platformOrders = orders.filter(order => order.platform === platform);

                return (
                  <AnalysisPlatform
                    user={this.props.user}
                    key={index}
                    platform={platform}
                    numberOrders={platformOrders.length}
                    averageTime={averageTime(platformOrders).toFixed(2)}
                    averageDistance={averageDistance(platformOrders).toFixed(2)}
                    dollarOrder={dollarOrder(platformOrders).toFixed(2)}
                    dollarHour={dollarHour(platformOrders).toFixed(2)}
                    dollarMile={dollarMile(platformOrders).toFixed(2)}
                  />
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
          </tbody>
        </table>
      </div>
    );
  }
}

function AnalysisPlatform(props) {
  return (
    <tr>
      <td className="text-center">{props.platform}</td>
      <td className="text-center">{props.numberOrders}</td>
      <td className="text-center">{props.averageTime}</td>
      <td className="text-center">{props.averageDistance}</td>
      <td className="text-center">{props.dollarOrder}</td>
      <td className="text-center">{props.dollarHour}</td>
      <td className="text-center">{props.dollarMile}</td>
    </tr>
  );
}

export default Analysis;
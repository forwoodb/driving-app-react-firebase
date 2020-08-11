import React, {Component} from 'react';

// Components
import AnalysisSelect from './AnalysisSelect.js';
import Platform from './Platform.js';
import Time from './Time.js';

class Analysis extends Component {
  constructor() {
    super();
    this.averageTime = this.averageTime.bind(this);
    this.averageDistance = this.averageDistance.bind(this);
    this.dollarHour = this.dollarHour.bind(this);
    this.dollarHour = this.dollarHour.bind(this);
    this.dollarMile = this.dollarMile.bind(this);
  }

  averageTime(data) {
    return (
      data.reduce(function(total, order) {
        return total + parseFloat(order.duration);
      }, 0)/data.length
    );
  }

  averageDistance(data) {
    return (
      data.reduce(function(total, order) {
        return total + parseFloat(order.distance);
      }, 0)/data.length
    );
  }

  dollarOrder(data) {
    return (
      data.reduce(function(total, order) {
        return total + parseFloat(order.earnings);
      }, 0)/data.length
    );
  }

  dollarHour(data) {
    return (
      data.reduce(function(total, order) {
        return total + parseFloat(order.earnings);
      }, 0)/data.length/this.averageTime(data) * 60
    );
  }

  dollarMile(data) {
    return (
      data.reduce(function(total, order) {
        return total + parseFloat(order.earnings);
      }, 0)/data.length/this.averageDistance(data)
    );
  }

  render() {
    let orders = this.props.orders;

    let platforms = orders.map(order => order.platform);
    platforms = [...new Set(platforms)].sort();

    let locations = orders.map(order => order.location);
    locations = [...new Set(locations)].sort();





    // console.log(orders);

    return (
      <div>
        <h1>Platform</h1>
        <Platform
          orders={orders}
          platforms={platforms}
          numberOrders={orders.length}
          averageTime={(data) => this.averageTime(data).toFixed(2)}
          averageDistance={(data) => this.averageDistance(data).toFixed(2)}
          dollarOrder={(data) => this.dollarOrder(data).toFixed(2)}
          dollarHour={(data) => this.dollarHour(data).toFixed(2)}
          dollarMile={(data) => this.dollarMile(data).toFixed(2)}
        />
        <table className="table table-striped table-hover">
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
            <AnalysisSelect
              user={this.props.user}
              orders={this.props.orders}
            />
            {
              locations.map((location, index) => {
                let locationOrders = orders.filter(order => order.location === location);
                // let platform = orders.filter(order => order.platform);

                return (
                  <AnalysisLocation
                    user={this.props.user}
                    key={index}
                    location={location}
                    numberOrders={locationOrders.length}
                    averageTime={this.averageTime(locationOrders).toFixed(2)}
                    averageDistance={this.averageDistance(locationOrders).toFixed(2)}
                    dollarOrder={this.dollarOrder(locationOrders).toFixed(2)}
                    dollarHour={this.dollarHour(locationOrders).toFixed(2)}
                    dollarMile={this.dollarMile(locationOrders).toFixed(2)}
                  />
                );
              }).sort((x,y) => {
                return y.props.dollarHour - x.props.dollarHour;
              })
            }
          </tbody>
        </table>
        <Time
          orders={orders}
          averageTime={(data) => this.averageTime(data).toFixed(2)}
          averageDistance={(data) => this.averageDistance(data).toFixed(2)}
          dollarOrder={(data) => this.dollarOrder(data).toFixed(2)}
          dollarHour={(data) => this.dollarHour(data).toFixed(2)}
          dollarMile={(data) => this.dollarMile(data).toFixed(2)}
        />
      </div>
    );
  }
}

class Location extends Component {
  render() {
    return (
      <table className="table table-striped table-hover">
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
      </table>
    );
  }
}

function AnalysisLocation(props) {
  return (
    <tr>
      <td className="text-center">{props.location}</td>
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
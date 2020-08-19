import React, {Component} from 'react';

// Components
import AnalysisSelect from './AnalysisSelect.js';
import Platform from './Platform.js';

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
        if (isNaN(order.duration)) {
          return order.duration = 0;
        }
        return total + (parseFloat(order.duration) || 0);
      }, 0)/data.length
    );
  }

  averageDistance(data) {
    return (
      data.reduce(function(total, order) {
        return total + (parseFloat(order.distance) || 0);
      }, 0)/data.length || 0
    );
  }

  dollarOrder(data) {
    return (
      data.reduce(function(total, order) {
        return total + (parseFloat(order.earnings) || 0);
      }, 0)/data.length || 0
    );
  }

  dollarHour(data) {
    return (
      data.reduce(function(total, order) {
        return total + (parseFloat(order.earnings) || 0);
      }, 0)/data.length/this.averageTime(data) * 60 || 0
    );
  }

  dollarMile(data) {
    return (
      data.reduce(function(total, order) {
        return total + (parseFloat(order.earnings) || 0);
      }, 0)/data.length/this.averageDistance(data) || 0
    );
  }

  render() {
    let orders = this.props.orders;

    let platforms = orders.map(order => order.platform);
    platforms = [...new Set(platforms)].sort();

    let locations = orders.map(order => order.location);
    locations = [...new Set(locations)].sort();

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
        <AnalysisSelect
          user={this.props.user}
          orders={orders}
          locations={locations}
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

export default Analysis;
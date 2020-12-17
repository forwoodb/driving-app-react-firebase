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

    let areas = orders.map(order => order.area);
    areas = [...new Set(areas)].sort();

    let days = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ]

    let times = [
      "00:00:00",
      "01:00:00",
      "02:00:00",
      "03:00:00",
      "04:00:00",
      "05:00:00",
      "06:00:00",
      "07:00:00",
      "08:00:00",
      "09:00:00",
      "10:00:00",
      "11:00:00",
      "12:00:00",
      "13:00:00",
      "14:00:00",
      "15:00:00",
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",
      "20:00:00",
      "21:00:00",
      "22:00:00",
      "23:00:00",
      "24:00:00",
    ]

    return (
      <div>
        <h1>Platform</h1>
        <AnalysisSelect
          user={this.props.user}
          orders={orders}
          locations={locations}
          areas={areas}
          days={days}
          times={times}
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
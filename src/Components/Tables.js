import React, {Component} from 'react';
import Platform from './Platform.js';
import Day from './Day.js';
import Time from './Time.js';
import Area from './Area.js';
import Location from './Location.js';

export default class Tables extends Component {
  render() {
    const orders = this.props.orders;
    const table = this.props.table;

    if (table === 'day') {
      return (
        <Day
          orders={orders}
          averageTime={this.props.averageTime}
          averageDistance={this.props.averageDistance}
          dollarOrder={this.props.dollarOrder}
          dollarHour={this.props.dollarHour}
          dollarMile={this.props.dollarMile}
        />
      )
    } else if (table === 'time') {
      return (
        <Time
          orders={orders}
          averageTime={this.props.averageTime}
          averageDistance={this.props.averageDistance}
          dollarOrder={this.props.dollarOrder}
          dollarHour={this.props.dollarHour}
          dollarMile={this.props.dollarMile}
        />
      )
    } else if (table === 'area') {
      return (
        <Area
          orders={orders}
          averageTime={this.props.averageTime}
          averageDistance={this.props.averageDistance}
          dollarOrder={this.props.dollarOrder}
          dollarHour={this.props.dollarHour}
          dollarMile={this.props.dollarMile}
          areas={this.props.areas}
        />
      )
    } else if (table === 'location') {
      return (
        <Location
          orders={orders}
          averageTime={this.props.averageTime}
          averageDistance={this.props.averageDistance}
          dollarOrder={this.props.dollarOrder}
          dollarHour={this.props.dollarHour}
          dollarMile={this.props.dollarMile}
          locations={this.props.locations}
        />
      )
    } else {
      return (
        <Platform
          orders={orders}
          numberOrders={orders.length}
          averageTime={this.props.averageTime}
          averageDistance={this.props.averageDistance}
          dollarOrder={this.props.dollarOrder}
          dollarHour={this.props.dollarHour}
          dollarMile={this.props.dollarMile}
        />
      )
    }
  }
}
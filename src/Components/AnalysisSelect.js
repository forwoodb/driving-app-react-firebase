import React, {Component} from 'react';
import {LocationHeader} from './Location.js';
import Time from './Time.js';
import Location from './Location.js';
import Day from './Day.js';

export default class AnalysisSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: this.props.orders,
      locations: [],
      location: '',
      days: [],
      day: '',
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value,
    })
  }

  handlePlatformChange(e) {
    this.setState({
      platform: e.target.value,
    })
  }

  handleDayChange(e) {
    this.setState({
      day: e.target.value,
    })
  }

  render() {
    let orders = this.props.orders;
    let location = this.state.location;
    let platform = this.state.platform;
    let day = this.state.day;
    // let locations = orders.map(order => order.location);
    // locations = [...new Set(locations)].sort();

    if (location) {
      orders = orders.filter(order => order.location === location);
    }

    if (platform === 'All') {
      orders = this.props.orders;
    } else if (platform) {
      orders = orders.filter(order => order.platform === platform);
    }

    if (day === 'All') {
      orders = this.props.orders;
    } else if (day) {
      orders = orders.filter(order => order.date.includes(day));
    }

    return (
      <div>
      <table className="table table-striped table-hover">
        <LocationHeader/>
        <tbody>
          <tr>
            <td className="text-center">
              <input
                value={this.state.location} onChange={this.handleLocationChange}
                list="locations" name="location" id="location"
              />
              <datalist id="locations">
                {this.props.locations.sort().map((location, index) => {
                  return <option key={index} value={location}/>
                })}

              </datalist>
            </td>
            <td className="text-center">
              <select value={this.state.platform} onChange={this.handlePlatformChange}>
                <option>All</option>
                <option>DoorDash</option>
                <option>GrubHub</option>
                <option>UberEats</option>
              </select>
            </td>
            <td className="text-center">
              <select value={this.state.day} onChange={this.handleDayChange}>
                <option>All</option>
                <option>Mon</option>
                <option>Tue</option>
                <option>Wed</option>
                <option>Thu</option>
                <option>Fri</option>
                <option>Sat</option>
                <option>Sun</option>
              </select>
            </td>
            <td className="text-center">{orders.length}</td>
            <td className="text-center">{this.props.averageTime(orders)}</td>
            <td className="text-center">{this.props.averageDistance(orders)}</td>
            <td className="text-center">{this.props.dollarOrder(orders)}</td>
            <td className="text-center">{this.props.dollarHour(orders)}</td>
            <td className="text-center">{this.props.dollarMile(orders)}</td>
          </tr>
        </tbody>
      </table>

      <Day
        orders={orders}
        averageTime={this.props.averageTime}
        averageDistance={this.props.averageDistance}
        dollarOrder={this.props.dollarOrder}
        dollarHour={this.props.dollarHour}
        dollarMile={this.props.dollarMile}
      />
      <Time
        orders={orders}
        averageTime={this.props.averageTime}
        averageDistance={this.props.averageDistance}
        dollarOrder={this.props.dollarOrder}
        dollarHour={this.props.dollarHour}
        dollarMile={this.props.dollarMile}
      />
      <Location
        orders={orders}
        locations={this.props.locations}
        platform={platform}
        day={day}
        averageTime={this.props.averageTime}
        averageDistance={this.props.averageDistance}
        dollarOrder={this.props.dollarOrder}
        dollarHour={this.props.dollarHour}
        dollarMile={this.props.dollarMile}
      />
      </div>
    );
  }
}


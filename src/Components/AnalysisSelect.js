import React, {Component} from 'react';
import {SelectHeader} from './Location.js';
import Platform from './Platform.js';
import Time from './Time.js';
import Location from './Location.js';
import Area from './Area.js';
import Day from './Day.js';

export default class AnalysisSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: this.props.orders,
      locations: [],
      areas: [],
      location: '',
      area: '',
      days: [],
      day: '',
      times: this.props.times,
      time: '',
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value,
    })
  }

  handleAreaChange(e) {
    this.setState({
      area: e.target.value,
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

  handleTimeChange(e) {
    this.setState({
      time: e.target.value,
    })
  }

  render() {
    let orders = this.props.orders;
    let location = this.state.location;
    let area = this.state.area;
    let platform = this.state.platform;
    let day = this.state.day;
    let time = this.state.time;
    // let locations = orders.map(order => order.location);
    // locations = [...new Set(locations)].sort();

    if (location) {
      orders = orders.filter(order => order.location === location);
    }

    if (area) {
      orders = orders.filter(order => order.area === area);
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

    if (time === 'All') {
      orders = this.props.orders;
    } else if (time >= "00:00:00" && time < "10:00:00") {
      orders = orders.filter((order) => {
          return (
            order.time >= time && order.time < ('0' + (parseInt(time) + 1) + ':00:00')
            ||
            order.startTime >= time && order.startTime < ('0' + (parseInt(time) + 1) + ':00:00')
          )
        }
      );
    } else if (time >= "10:00:00") {
      orders = orders.filter((order) => {
          return (
            order.time >= time && order.time < (parseInt(time) + 1 + ':00:00')
            ||
            order.startTime >= time && order.startTime < (parseInt(time) + 1 + ':00:00')
          )
        }
      );
    }

    return (
      <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className="text-center">Location</th>
            <th className="text-center">Area</th>
            <th className="text-center">Platform</th>
            <th className="text-center">Day</th>
            <th className="text-center">Time</th>
          </tr>
        </thead>
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
              <input
                value={this.state.area} onChange={this.handleAreaChange}
                list="areas" name="area" id="area"
              />
              <datalist id="areas">
                {this.props.areas.sort().map((area, index) => {
                  return <option key={index} value={area}/>
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
            <td className="text-center">
              <select value={this.state.time} onChange={this.handleTimeChange}>
                <option>All</option>
                <option>00:00:00</option>
                <option>01:00:00</option>
                <option>02:00:00</option>
                <option>03:00:00</option>
                <option>04:00:00</option>
                <option>05:00:00</option>
                <option>06:00:00</option>
                <option>07:00:00</option>
                <option>08:00:00</option>
                <option>09:00:00</option>
                <option>10:00:00</option>
                <option>11:00:00</option>
                <option>12:00:00</option>
                <option>13:00:00</option>
                <option>14:00:00</option>
                <option>15:00:00</option>
                <option>16:00:00</option>
                <option>17:00:00</option>
                <option>18:00:00</option>
                <option>19:00:00</option>
                <option>20:00:00</option>
                <option>21:00:00</option>
                <option>22:00:00</option>
                <option>23:00:00</option>
              </select>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th className="text-center"># of Orders</th>
            <th className="text-center">Average Time</th>
            <th className="text-center">Average Distance</th>
            <th className="text-center">$/Order</th>
            <th className="text-center">$/Hour</th>
            <th className="text-center">$/Mile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{orders.length}</td>
            <td className="text-center">{this.props.averageTime(orders)}</td>
            <td className="text-center">{this.props.averageDistance(orders)}</td>
            <td className="text-center">{this.props.dollarOrder(orders)}</td>
            <td className="text-center">{this.props.dollarHour(orders)}</td>
            <td className="text-center">{this.props.dollarMile(orders)}</td>
          </tr>
        </tbody>
      </table>

      <Platform
        orders={orders}
        numberOrders={orders.length}
        averageTime={this.props.averageTime}
        averageDistance={this.props.averageDistance}
        dollarOrder={this.props.dollarOrder}
        dollarHour={this.props.dollarHour}
        dollarMile={this.props.dollarMile}
      />
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
      <Area
        orders={orders}
        areas={this.props.areas}
        platform={platform}
        day={day}
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


import React, {Component} from 'react';
import {LocationHeader} from './Location.js';
import Time from './Time.js';
import Location from './Location.js';

export default class AnalysisSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: this.props.orders,
      locations: [],
      location: '',
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
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

  render() {
    let orders = this.props.orders;
    console.log(orders);
    let location = this.state.location;
    let platform = this.state.platform;
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
            <td className="text-center">{orders.length}</td>
            <td className="text-center">{this.props.averageTime(orders)}</td>
            <td className="text-center">{this.props.averageDistance(orders)}</td>
            <td className="text-center">{this.props.dollarOrder(orders)}</td>
            <td className="text-center">{this.props.dollarHour(orders)}</td>
            <td className="text-center">{this.props.dollarMile(orders)}</td>
          </tr>
        </tbody>
      </table>

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


import React, {Component} from 'react';

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
    let location = this.state.location;
    let platform = this.state.platform;

    let locations = orders.map(order => order.location);
    locations = [...new Set(locations)];

    if (location) {
      orders = orders.filter(order => order.location === location);
    }

    if (platform === 'All') {
      orders = orders;
    } else if (platform) {
      orders = orders.filter(order => order.platform === platform);
    }


    let averageTime = orders.reduce(function(total, order) {
      return total + Number(order.duration);
    }, 0)/orders.length;

    let averageDistance = orders.reduce(function(total, order) {
      return total + Number(order.distance);
    }, 0)/orders.length;

    let dollarOrder = orders.reduce(function(total, order) {
      return total + Number(order.earnings);
    }, 0)/orders.length;

    let dollarHour = orders.reduce(function(total, order) {
      return total + Number(order.earnings);
    }, 0)/orders.length/averageTime * 60;

    let dollarMile = orders.reduce(function(total, order) {
      return total + Number(order.earnings);
    }, 0)/orders.length/averageDistance;

    return (
      <tr>
        <td className="text-center">
          <input
            value={this.state.location} onChange={this.handleLocationChange}
            list="locations" name="location" id="location"
          />
          <datalist id="locations">
            {locations.sort().map((location, index) => {
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
        <td className="text-center">{averageTime.toFixed(2)}</td>
        <td className="text-center">{averageDistance.toFixed(2)}</td>
        <td className="text-center">{dollarOrder.toFixed(2)}</td>
        <td className="text-center">{dollarHour.toFixed(2)}</td>
        <td className="text-center">{dollarMile.toFixed(2)}</td>
      </tr>
    );
  }
}


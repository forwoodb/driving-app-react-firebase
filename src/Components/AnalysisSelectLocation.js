import React, {Component} from 'react';
import * as firebase from 'firebase';

export default class AnalysisSelectLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: this.props.orders,
      locations: [],
      location: '',
      numberOrders: '',
      averageTime: '',
      averageDistance: '',
      dollarOrder: '',
      dollarHour: '',
      dollarMile: '',
    }
    this.getData = this.getData.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
  }

  getData(locationValue, platformValue) {
    firebase.database().ref('orders').on('value', (snapshot) => {
      const data = snapshot.val();
      let orders = [];

      let user;
      if (this.props.user) {
        user = this.props.user;
      } else {
        user = 'demo';
      }
      for (var order in data) {
        if (data[order].user === user) {
          orders.push({...data[order]})
        }
      }

      // Locations list
      console.log(orders);
      let locations = orders.map(order => order.location);
      locations = [...new Set(locations)];
      console.log(locations);
      //

      if (locationValue === '') {
        orders = orders;
      } else if (locationValue) {
        orders = orders.filter(order => order.location === locationValue);
      }

      if (platformValue === 'All') {
        orders = orders;
      } else if (platformValue) {
        orders = orders.filter(order => order.platform === platformValue);
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

      this.__isMounted &&
      this.setState({
        locations: locations,
        location: locationValue,
        platform: platformValue,
        numberOrders: orders.length,
        averageTime: averageTime.toFixed(2),
        averageDistance: averageDistance.toFixed(2),
        dollarOrder: dollarOrder.toFixed(2),
        dollarHour: dollarHour.toFixed(2),
        dollarMile: dollarMile.toFixed(2),
      });
    });
  }

  componentDidMount() {
    this.__isMounted = true;
    this.getData(this.state.location, this.state.platform);
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  handleLocationChange(e) {
    this.getData(e.target.value, this.state.platform);
    console.log(e.target.value);
  }

  handlePlatformChange(e) {
    this.getData(this.state.location, e.target.value);
    console.log(e.target.value);
  }

  render() {
    // console.log(this.props.orders);
    return (
      <tr>
        <td className="text-center">
          <input
            value={this.props.location} onChange={this.handleLocationChange}
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
        <td className="text-center">{this.state.numberOrders}</td>
        <td className="text-center">{this.state.averageTime}</td>
        <td className="text-center">{this.state.averageDistance}</td>
        <td className="text-center">{this.state.dollarOrder}</td>
        <td className="text-center">{this.state.dollarHour}</td>
        <td className="text-center">{this.state.dollarMile}</td>
      </tr>
    );
  }
}
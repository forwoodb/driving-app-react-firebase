import React, {Component} from 'react';
import * as firebase from 'firebase';
// import AnalysisSelectLocation from './AnalysisSelectLocation';

export default class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      location: '',
      platform: 'All Platforms',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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
      // console.log(orders);
      let locations = orders.map(order => order.location);
      locations = [...new Set(locations)];
      // console.log(locations);
      //

      if (locationValue === '') {
        orders = orders;
      } else if (locationValue) {
        orders = orders.filter(order => order.location === locationValue);
      }

      if (platformValue === 'All Platforms') {
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
    this.getData(this.state.location);
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

  handleSubmit(e) {
    e.preventDefault();
    const newOrder = {
      order_id: Number(new Date()),
      user: this.props.user ? this.props.user : 'demo',
      date: new Date().toDateString(),
      time: new Date().toTimeString(),
      location: e.target.location.value,
      platform: e.target.platform.value,
      duration: e.target.duration.value,
      distance: e.target.distance.value,
      earnings: e.target.earnings.value,
    }
    firebase.database().ref('orders').push(newOrder)
    this.setState({
      location: '',
    })
    e.target.elements.duration.value = '';
    e.target.elements.distance.value = '';
    e.target.elements.earnings.value = '';
  }

  render() {
    // console.log(this.props.orders);

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row mb-3">
            <div className="col input-group-sm">
              <input
                className="form-control"
                type="text" placeholder="Location"
                value={this.state.location} onChange={this.handleLocationChange}
                list="locations"
                name="location"
              />
              <datalist id="locations">
                {this.state.locations.sort().map((location, index) => {
                  return <option key={index} value={location}/>
                })}

              </datalist>
            </div>
            <div className="col input-group-sm">
              <select
                className="form-control"
                name="platform"
                type="text"
                value={this.state.platform} onChange={this.handlePlatformChange}
              >
                <option>All Platforms</option>
                <option>DoorDash</option>
                <option>GrubHub</option>
                <option>UberEats</option>
              </select>
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col input-group-sm">
                <input
                  type="text"
                  name="duration"
                  className="form-control"
                  placeholder="Duration"
                />
            </div>
            <div className="col input-group-sm">
                <input
                  type="text"
                  name="distance"
                  className="form-control"
                  placeholder="Distance"
                />
            </div>
            <div className="col input-group-sm">
              <input
                type="text"
                name="earnings"
                className="form-control"
                placeholder="Earnings"
              />
            </div>
          </div>
          <button className="btn btn-success btn-sm mb-3" type="submit">Add</button>
        </form>
        <LocationData
          dollarHour={this.state.dollarHour}
          dollarMile={this.state.dollarMile}
          numberOrders={this.state.numberOrders}
          dollarOrder={this.state.dollarOrder}
          averageTime={this.state.averageTime}
          averageDistance={this.state.averageDistance}
        />
      </div>
    );
  }
}

class LocationData extends Component {
  render() {
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className="text-center">$/Hour</th>
            <th className="text-center">$/Mile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{this.props.dollarHour}</td>
            <td className="text-center">{this.props.dollarMile}</td>
          </tr>
          <tr>
            <th className="text-center"># of Orders</th>
            <th className="text-center">$/Order</th>
          </tr>
          <tr>
            <td className="text-center">{this.props.numberOrders}</td>
            <td className="text-center">{this.props.dollarOrder}</td>
          </tr>
          <tr>
            <th className="text-center">Average Time</th>
            <th className="text-center">Average Distance</th>
          </tr>
          <tr>
            <td className="text-center">{this.props.averageTime}</td>
            <td className="text-center">{this.props.averageDistance}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
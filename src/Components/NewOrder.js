import React, {Component} from 'react';
import firebase from '../firebase.js';
import LocationData from './LocationData.js';
import LocationInput from './LocationInput.js';


export default class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      area: '',
      platform: 'All Platforms',
      startTime: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.startTime = this.startTime.bind(this);
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

      if (locationValue) {
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

  startTime(e) {
    this.setState({
      startTime: new Date().toTimeString(),
    })
  }

  handleLocationChange(e) {
    this.getData(e.target.value, this.state.platform);
  }

  handlePlatformChange(e) {
    this.getData(this.state.location, e.target.value);
  }

  handleStartTimeChange(e) {
    this.setState({
      startTime: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const newOrder = {
      order_id: Number(new Date()),
      user: this.props.user ? this.props.user : 'demo',
      date: new Date().toDateString(),
      startTime: e.target.startTime.value,
      location: e.target.location.value,
      area: e.target.area.value,
      platform: e.target.platform.value,
      duration: e.target.duration.value,
      distance: e.target.distance.value,
      earnings: e.target.earnings.value,
    }
    firebase.database().ref('orders').push(newOrder)
    this.setState({
      location: '',
      startTime: '',
    })
    e.target.elements.area.value = '';
    e.target.elements.duration.value = '';
    e.target.elements.distance.value = '';
    e.target.elements.earnings.value = '';

    console.log(e.target.platform.value);
  }

  render() {
    return (
      <div className="mb-5">
        <div className="my-3">
          <form className="row g-3" onSubmit={this.handleSubmit}>
            <div className="col-12">
              <button type="button" onClick={this.startTime}>Enter Timestamp</button>
            </div>
            <div className="col-lg-6">
              <input
                className="form-control"
                type="text"
                name="startTime"
                placeholder="Start Time"
                value={this.state.startTime} onChange={this.handleStartTimeChange}
              />
            </div>
            <div className="col-lg-6">
              <LocationInput
                location={this.state.location}
                locations={this.props.locations} 
                onChange={this.handleLocationChange}
              />
            </div>
            <div className="col-6">
              <input
                className="form-control"
                type="text"
                name="area"
                className="form-control"
                placeholder="Area"
                list="areas"
              />
              <datalist id="areas">
                {this.props.areas.sort().map((area, index) => {
                  return <option key={index} value={area}/>
                })}
              </datalist>
            </div>
            <div className="col-6">
              <select
                className="form-control"
                type="text"
                name="platform"
                value={this.state.platform} onChange={this.handlePlatformChange}
              >
                <option>All Platforms</option>
                <option>DoorDash</option>
                <option>GrubHub</option>
                <option>UberEats</option>
              </select>
            </div>
            <div className="col-4">
              <input
                type="text"
                name="duration"
                className="form-control"
                placeholder="Duration"
              />
            </div>
            <div className="col-4">
                <input
                  type="text"
                  name="distance"
                  className="form-control"
                  placeholder="Distance"
                />
            </div>
            <div className="col-4">
              <input
                type="text"
                name="earnings"
                className="form-control"
                placeholder="Earnings"
              />
            </div>
            <div className="col">
              <button className="btn btn-success">Add</button>
            </div>
          </form>
        </div>


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


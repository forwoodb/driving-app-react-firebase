import React, {Component} from 'react';
import firebase from '../firebase.js';

export default class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      location: '',
      platform: '',
      startTime: '',
      date: '',
      duration: '',
      distance: '',
      earnings: '',
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleEarningsChange = this.handleEarningsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getLocations() {
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
      let locations = orders.map(order => order.location);
      locations = [...new Set(locations)];

      this.setState({
        locations: locations,
      })
    });
  }

  componentDidMount() {
    firebase.database().ref('orders/' + this.props.match.params.id).on('value', (snapshot) => {
      const data = snapshot.val();
      // let orders = [];
      //
      let user;
      if (this.props.user) {
        user = this.props.user;
      } else {
        user = 'demo';
      }

      console.log(user);
      //
      // for (var order in data) {
      //   if (data[order].user === user) {
      //     orders.push({...data[order]})
      //   }
      // }
      // console.log(orders);
      //
      // // Locations list
      // let locations = orders.map(order => order.location);
      // locations = [...new Set(locations)];
      // console.log(locations);

      this.getLocations()

      this.setState({
        location: data.location,
        platform: data.platform,
        startTime: data.startTime || data.time,
        date: data.date,
        duration: data.duration,
        distance: data.distance,
        earnings: data.earnings,
      })
    })
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

  handleStartTimeChange(e) {
    this.setState({
      startTime: e.target.value,
    })
  }

  handleDateChange(e) {
    this.setState({
      date: e.target.value,
    })
  }

  handleDurationChange(e) {
    this.setState({
      duration: e.target.value,
    })
  }

  handleDistanceChange(e) {
    this.setState({
      distance: e.target.value,
    })
  }

  handleEarningsChange(e) {
    this.setState({
      earnings: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const editOrder = {
      location: e.target.location.value,
      platform: e.target.platform.value,
      startTime: e.target.startTime.value,
      date: e.target.date.value,
      duration: e.target.duration.value,
      distance: e.target.distance.value,
      earnings: e.target.earnings.value,
    }
    firebase.database().ref('orders/' + this.props.match.params.id).update(editOrder);

    window.location = "/OrdersList";
  }

  getStyle() {
    return {
      marginTop: '50px',
      marginBottom: '50px',
    };
  }

  render() {
    console.log(this.state.locations);
    return (
      <div>
        <h2 className="text-center">Edit Order</h2>
        <form onSubmit={this.handleSubmit} style={this.getStyle()}>
          <div className="form-row mb-3">
            <div className="col input-group-sm">
              <label htmlFor="startTime">Start Time</label>
              <input
                className="form-control"
                type="text"
                name="startTime"
                value={this.state.startTime}
                onChange={this.handleStartTimeChange}
              />
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col input-group-sm">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  className="form-control"
                  name="location"
                  type="text"
                  value={this.state.location}
                  onChange={this.handleLocationChange}
                  list="locations"
                />
                <datalist id="locations">
                  {this.state.locations.sort().map((location, index) => {
                    return <option key={index} value={location}/>
                  })}
                </datalist>
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col input-group-sm">
                <label htmlFor="platform">Platform</label>
                <select
                  id="platform"
                  className="form-control"
                  name="platform"
                  type="text"
                  value={this.state.platform}
                  onChange={this.handlePlatformChange}
                >
                  <option>All Platforms</option>
                  <option>UberEats</option>
                  <option>GrubHub</option>
                  <option>DoorDash</option>
                </select>
            </div>
            <div className="col input-group-sm">
              <label htmlFor="date">Date</label>
              <input
                className="form-control"
                type="text"
                name="date"
                value={this.state.date}
                onChange={this.handleDateChange}
              />
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col input-group-sm">
              <label htmlFor="time">Duration</label>
              <input
                type="text"
                name="duration"
                value={this.state.duration}
                id="duration"
                className="form-control"
                onChange={this.handleDurationChange}
              />
            </div>
            <div className="col input-group-sm">
              <label htmlFor="distance">Distance</label>
              <input
                type="text"
                name="distance"
                value={this.state.distance}
                id="distance"
                className="form-control"
                onChange={this.handleDistanceChange}
              />
            </div>
            <div className="col input-group-sm">
              <label htmlFor="earnings">Earnings</label>
              <input
                type="text"
                name="earnings"
                value={this.state.earnings}
                id="earnings"
                className="form-control"
                onChange={this.handleEarningsChange}
              />
            </div>
          </div>
          <button className="btn btn-primary btn-sm mb-3" type="submit">Update</button>
        </form>
      </div>
    );
  }
}
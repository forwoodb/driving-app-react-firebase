import React, {Component} from 'react';
import * as firebase from 'firebase';

export default class EditOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      platform: '',
      duration: '',
      distance: '',
      earnings: '',
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleEarningsChange = this.handleEarningsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('orders/' + this.props.match.params.id).on('value', (snapshot) => {
      const data = snapshot.val();
      this.setState({
        location: data.location,
        platform: data.platform,
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
    return (
      <div>
        <h1>Edit Order</h1>
        <form onSubmit={this.handleSubmit} style={this.getStyle()}>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  className="form-control"
                  name="location"
                  type="text"
                  value={this.state.location}
                  onChange={this.handleLocationChange}
                />
            </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="platform">Platform</label>
                <select
                  id="platform"
                  className="form-control"
                  name="platform"
                  type="text"
                  value={this.state.platform}
                  onChange={this.handlePlatformChange}
                >
                  <option>Any</option>
                  <option>UberEats</option>
                  <option>GrubHub</option>
                  <option>DoorDash</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
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
            </div>
            <div className="col">
              <div className="form-group">
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
            </div>
            <div className="col">
              <div className="form-group">
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
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">Update</button>
          </div>
        </form>
      </div>
    );
  }
}
import React, { Component } from 'react';
import firebase from '../firebase.js';

import OrdersList from './OrdersList.js';

export default class UpdateArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateOrders: [],
      location: '',
      // updateLocation: '',
      area: '',
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
    // this.handleUpdateLocationChange = this.handleUpdateLocationChange.bind(this);
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value,
    })
  }

  // handleUpdateLocationChange(e) {
  //   this.setState({
  //     updateLocation: e.target.value,
  //   })
  // }

  handleAreaChange(e) {
    this.setState({
      area: e.target.value,
    })
  }

  handleSubmit(e) {
    // e.preventDefault();
    let orders = this.props.orders;
    let location = this.state.location;

    // const updateLocation = {
    //   location: e.target.updateLocation.value,
    // }

    const updateArea = {
      area: e.target.updateArea.value,
    }

    // if (updateLocation !== '') {
    //   orders = orders.filter(order => order.location === location)
    //   orders.forEach((order) => {
    //     firebase.database().ref('orders').child(order.id).update(updateLocation);
    //   });
    // }

    if (location) {
      orders = orders.filter(order => order.location === location)
      orders.forEach((order) => {
        firebase.database().ref('orders').child(order.id).update(updateArea);
      });
    }

    e.target.elements.location.value = '';
    // e.target.elements.updateLocation.value = '';
    e.target.elements.updateArea.value = '';
  }

  render() {
    let orders = this.props.orders;
    let location = this.state.location;
    let updateArea = this.state.area;

    if (location) {
      orders = orders.filter(order => order.location === location)
      orders.map((order) => {
        this.state.updateOrders.push(order)
      })
    }

    return (
      <div>
        <form className="my-3" onSubmit={this.handleSubmit}>
          <input
            id="location"
            name="location"
            list="locations"
            onChange={this.handleLocationChange}
            placeholder="Search Location"
          />
          <datalist id="locations">
            {this.props.locations.sort().map((location, index) => {
              return <option key={index} value={location}/>
            })}

          </datalist>
          {/*<input
            id="updateLocation"
            name="updateLocation"
            list="locations"
            onChange={this.handleUpdateLocationChange}
            placeholder="Update Location"
          />
          <datalist id="locations">
            {this.props.locations.sort().map((location, index) => {
              return <option key={index} value={location}/>
            })}

          </datalist>
          <button className="btn-sm btn-success">Update Location</button>
          */}
          <input
            name="updateArea"
            list="areas"
            placeholder="Update Area"
            onChange={this.handleAreaChange}
          />
          <datalist id="areas">
            {this.props.areas.sort().map((area, index) => {
              return <option key={index} value={area}/>
            })}

          </datalist>
          <button className="btn-sm btn-success">Update Area</button>
        </form>
        <OrdersList orders={orders} onDelete={this.props.onDelete}/>
      </div>
    );
  }
}
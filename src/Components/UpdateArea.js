import React, { useState } from 'react';
import firebase from '../firebase.js';

import OrdersList from './OrdersList.js';

const UpdateArea = (props) => {
  const updateOrders = useState([]);
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  const handleAreaChange = (e) => {
    setArea(e.target.value)
  }

  const handleSubmit = (e) => {
    let orders = props.orders;

    const updateArea = {
      area: e.target.updateArea.value,
    }

    if (location) {
      orders = orders.filter(order => order.location === location)
      orders.forEach((order) => {
        firebase.database().ref('orders').child(order.id).update(updateArea);
      });
    }

    e.target.elements.location.value = '';
    e.target.elements.updateArea.value = '';
  }

  let orders = props.orders;

  if (location) {
    orders = orders.filter(order => order.location === location)
    orders.map((order) => {
      return updateOrders.push(order)
    })
  }

  return (
    <div>
      <form className="my-3" onSubmit={handleSubmit}>
        <input
          id="location"
          name="location"
          list="locations"
          onChange={handleLocationChange}
          placeholder="Search Location"
        />
        <datalist id="locations">
          {props.locations.sort().map((location, index) => {
            return <option key={index} value={location}/>
          })}

        </datalist>
        <input
          name="updateArea"
          list="areas"
          placeholder="Update Area"
          onChange={handleAreaChange}
        />
        <datalist id="areas">
          {props.areas.sort().map((area, index) => {
            return <option key={index} value={area}/>
          })}

        </datalist>
        <button className="btn-sm btn-success">Update Area</button>
      </form>
      <OrdersList orders={orders} onDelete={props.onDelete}/>
    </div>
  );
}

export default UpdateArea;
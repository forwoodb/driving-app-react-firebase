import React, {Component} from 'react';
// import firebase from '../firebase.js';

import {Link} from 'react-router-dom';


class OrdersList extends Component {
  render() {
    return (
      <table className="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th scope="col" className="text-center">Date</th>
            <th scope="col" className="text-center">Time</th>
            <th scope="col" className="text-center">Location</th>
            <th scope="col" className="text-center">Platform</th>
            <th scope="col" className="text-center">Duration</th>
            <th scope="col" className="text-center">Distance</th>
            <th scope="col" className="text-center">Earnings</th>
            <th scope="col" className="text-center"></th>
            <th scope="col" className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {this.props.orders.sort((x,y) => {
            return y.order_id - x.order_id;
          })
          .map(order =>
            <Order
              key={order.order_id}
              id={order.id}
              order={order}
              date={order.date}
              time={order.time}
              location={order.location}
              platform={order.platform}
              duration={order.duration}
              distance={order.distance}
              earnings={order.earnings}
              onDelete={() => this.props.onDelete(order.id)}
            />
          )}
        </tbody>
      </table>
    );
  }
}

function Order(props) {
  return (
    <tr>
      <td className="text-center" width="275px">{props.date}</td>
      <td className="text-center" width="275px">{props.time}</td>
      <td className="text-center" width="275px">{props.location}</td>
      <td className="text-center" width="275px">{props.platform}</td>
      <td className="text-center" width="275px">{props.duration}</td>
      <td className="text-center" width="275px">{props.distance}</td>
      <td className="text-center" width="275px">${props.earnings}</td>
      <td className="text-center">
        <Link to={"/Edit/" + props.id}>
          <button type="button" className="btn btn-primary">
            Edit
          </button>
        </Link>
      </td>
      <td className="text-center">
        <button className="btn btn-danger" onClick={() => {props.onDelete(props.order.order_id)}}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default OrdersList;
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Try form attribute for edit
class OrdersList extends Component {
  render() {
    function compareTime(a,b) {
      let comparison = 0;
      if (a.startTime < b.startTime) {
        comparison = 1
      } else if (a.startTime > b.startTime) {
        comparison = -1;
      }
      return comparison;
    }
    return (
      <div>
      <table className="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th scope="col" className="text-center">Date</th>
            <th scope="col" className="text-center">Time</th>
            <th scope="col" className="text-center">Location</th>
            <th scope="col" className="text-center">Area</th>
            <th scope="col" className="text-center">Platform</th>
            <th scope="col" className="text-center">Duration</th>
            <th scope="col" className="text-center">Distance</th>
            <th scope="col" className="text-center">Earnings</th>
            <th scope="col" className="text-center"></th>
            <th scope="col" className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {this.props.orders
            .sort((x,y) => {
              let dateX = new Date(x.date);
              let dateY = new Date(y.date);
              return dateY - dateX || compareTime(x,y);
            })
          .map(order =>
            <Order
              key={order.order_id}
              id={order.id}
              order={order}
              date={order.date}
              startTime={order.startTime || order.time}
              location={order.location}
              area={order.area}
              platform={order.platform}
              duration={order.duration}
              distance={Number(order.distance).toFixed(2)}
              earnings={Number(order.earnings).toFixed(2)}
              onDelete={() => this.props.onDelete(order.id)}
            />
          )}
        </tbody>
      </table>
      </div>
    );
  }
}

function Order(props) {
  return (
    <tr>
      <td className="text-center" width="275px">{props.date}</td>
      <td className="text-center" width="275px">{props.startTime}</td>
      <td className="text-center" width="275px">{props.location}</td>
      <td className="text-center" width="275px">{props.area}</td>
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
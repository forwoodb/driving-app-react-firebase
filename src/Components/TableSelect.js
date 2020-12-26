import React, {Component} from 'react';
import Tables from './Tables.js';

export default class TableSelect extends Component {
  constructor() {
    super();
    this.state = {
      table: '',
    }
    this.handleLocationClick = this.handleLocationClick.bind(this);
    this.handleAreaClick = this.handleAreaClick.bind(this);
    this.handlePlatformClick = this.handlePlatformClick.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleTimeClick = this.handleTimeClick.bind(this);
  }

  handleLocationClick() {
    this.setState({
      table: 'location',
    })
  }

  handleAreaClick() {
    this.setState({
      table: 'area',
    })
  }

  handlePlatformClick() {
    this.setState({
      table: 'platform',
    })
  }

  handleDayClick() {
    this.setState({
      table: 'day',
    })
  }

  handleTimeClick() {
    this.setState({
      table: 'time',
    })
  }

  render() {
    console.log(this.state.table);
    return (
      <div>
        <h1>Select Table</h1>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <a className="nav-link" onClick={this.handlePlatformClick}>Platform</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={this.handleDayClick}>Day</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={this.handleTimeClick}>Time</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={this.handleAreaClick}>Area</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={this.handleLocationClick}>Location</a>
          </li>
        </ul>
        <Tables
          orders={this.props.orders}
          table={this.state.table}
          averageTime={this.props.averageTime}
          averageDistance={this.props.averageDistance}
          dollarOrder={this.props.dollarOrder}
          dollarHour={this.props.dollarHour}
          dollarMile={this.props.dollarMile}
          areas={this.props.areas}
          locations={this.props.locations}
        />
      </div>
    );
  }
}
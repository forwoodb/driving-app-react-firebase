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

  getStyle() {
    return {
      marginRight: '4px',
      marginLeft: '4px',
      paddingRight: '0px',
      paddingLeft: '0px',
    }
  }

  render() {
    return (
      <div className="mb-5">
        <h2>Select Table</h2>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item" style={this.getStyle()}>
            <button className="nav-link" onClick={this.handlePlatformClick} style={this.getStyle()}>Platform</button>
          </li>
          <li className="nav-item" style={this.getStyle()}>
            <button className="nav-link" onClick={this.handleDayClick} style={this.getStyle()}>Day</button>
          </li>
          <li className="nav-item" style={this.getStyle()}>
            <button className="nav-link" onClick={this.handleTimeClick} style={this.getStyle()}>Time</button>
          </li>
          <li className="nav-item" style={this.getStyle()}>
            <button className="nav-link" onClick={this.handleAreaClick} style={this.getStyle()}>Area</button>
          </li>
          <li className="nav-item" style={this.getStyle()}>
            <button className="nav-link" onClick={this.handleLocationClick} style={this.getStyle()}>Location</button>
          </li>
        </ul>
        <Tables
          orders={this.props.orders}
          table={this.state.table}
          averageTime={this.props.averageTime}
          minMile={this.props.minMile}
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
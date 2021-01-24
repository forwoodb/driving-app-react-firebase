import React, {Component} from 'react';

export default class LocationInput extends Component {
  render() {
    return (
      <div>
        <input
          className="form-control"
          type="text" placeholder="Location"
          name="location"
          value={this.props.location} onChange={this.props.onChange}
          list="locations"
        />
        <datalist id="locations">
          {this.props.locations.sort().map((location, index) => {
            return <option key={index} value={location}/>
          })}
        </datalist>
      </div>
    );
  }
}
import React, {Component} from 'react';

export default class AreaInput extends Component {
  render() {
    return (
      <div class="input-group-sm">
        <input
          className="form-control"
          type="text" placeholder="Area"
          name="area"
          value={this.props.area} onChange={this.props.onChange}
          list="areas"
        />
        <datalist id="areas">
          {this.props.areas.sort().map((area, index) => {
            return <option key={index} value={area}/>
          })}
        </datalist>
      </div>
    );
  }
}
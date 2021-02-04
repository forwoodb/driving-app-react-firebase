import React from 'react';

export default function LocationInput(props) {
  return (
    <div className="input-group-sm">
      <input
        className="form-control"
        type="text" placeholder="Location"
        name="location"
        value={props.location} onChange={props.onChange}
        list="locations"
      />
      <datalist id="locations">
        {props.locations.sort().map((location, index) => {
          return <option key={index} value={location}/>
        })}
      </datalist>
    </div>
  );
}
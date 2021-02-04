import React from 'react';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';

export default function Location(props) {
  const renderTableData = () => {
    return props.locations.map((location, index) => {
      let locationOrders = props.orders.filter(order => order.location === location);
      if (locationOrders.length > 0) {
        return (
          <AnalysisData
            user={props.user}
            key={index}
            category={location}
            numberOrders={locationOrders.length}
            dollarOrder={props.dollarOrder(locationOrders)}
            dollarHour={props.dollarHour(locationOrders)}
            averageTime={props.averageTime(locationOrders)}
            averageDistance={props.averageDistance(locationOrders)}
            dollarMile={props.dollarMile(locationOrders)}
          />
        );
      // } else {
      //   return false; <-- fixes lint warning, but breaks sort, try for(each, in) loop
      }
    }).sort((x,y) => {
      return y.props.dollarHour - x.props.dollarHour;
    })
  }

  return (
    <AnalysisTable
      categoryTitle="Location"
      tableData={renderTableData()}
    />
  );
}
import React from 'react';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';

export default function Area(props) {
  const renderTableData = () => {
    return props.areas.map((area, index) => {
      let areaOrders = props.orders.filter(order => order.area === area);
      if (area && areaOrders.length > 0) {
        return (
          <AnalysisData
            user={props.user}
            key={index}
            category={area}
            numberOrders={areaOrders.length}
            dollarOrder={props.dollarOrder(areaOrders)}
            dollarHour={props.dollarHour(areaOrders)}
            averageTime={props.averageTime(areaOrders)}
            averageDistance={props.averageDistance(areaOrders)}
            dollarMile={props.dollarMile(areaOrders)}
            averageWait={props.averageWait(areaOrders)}
          />
        );
      // } else {
      //   return false;
      }
    })
    .sort((x,y) => {
      return y.props.dollarHour - x.props.dollarHour;
    })
  }

  return (
    <AnalysisTable
      categoryTitle="Area"
      tableData={renderTableData()}
    />
  );
}
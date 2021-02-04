import React from 'react';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';

export default function Day(props) {
  const renderTableData = () => {
    let days = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ]


    return days.map((day, index) => {
      let dayOrders = props.orders.filter(order => order.date.includes(day));
      if (dayOrders.length > 0) {
        return (
          <AnalysisData
            user={props.user}
            key={index}
            category={day}
            numberOrders={dayOrders.length}
            dollarOrder={props.dollarOrder(dayOrders)}
            dollarHour={props.dollarHour(dayOrders)}
            averageTime={props.averageTime(dayOrders)}
            averageDistance={props.averageDistance(dayOrders)}
            dollarMile={props.dollarMile(dayOrders)}
          />
        );
      } else {
        return false;
      }
    })
  }


  return (
    <AnalysisTable
      categoryTitle="Day"
      tableData={renderTableData()}
    />
  );
}
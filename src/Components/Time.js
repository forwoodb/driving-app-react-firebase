import React from 'react';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';

export default function Time(props) {
  const renderTableData = () => {
    let times = [
      "00:00:00",
      "01:00:00",
      "02:00:00",
      "03:00:00",
      "04:00:00",
      "05:00:00",
      "06:00:00",
      "07:00:00",
      "08:00:00",
      "09:00:00",
      "10:00:00",
      "11:00:00",
      "12:00:00",
      "13:00:00",
      "14:00:00",
      "15:00:00",
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",
      "20:00:00",
      "21:00:00",
      "22:00:00",
      "23:00:00",
      "24:00:00",
    ]


    return (
      times.map((time, index, times) => {
        let timeOrders = props.orders.filter(order => order.startTime >= time && order.startTime < times[index + 1])

        if (timeOrders.length > 0) {
          return (
            <AnalysisData
              user={props.user}
              key={index}
              category={time}
              numberOrders={timeOrders.length}
              dollarOrder={props.dollarOrder(timeOrders)}
              dollarHour={props.dollarHour(timeOrders)}
              averageTime={props.averageTime(timeOrders)}
              averageDistance={props.averageDistance(timeOrders)}
              dollarMile={props.dollarMile(timeOrders)}
              // averageWait={props.averageWait(timeOrders)}
            />
          );
        } else {
          return false;
        }
      })
    )
  }


  return (
    <AnalysisTable
      categoryTitle="Time"
      tableData={renderTableData()}
    />
  );
}
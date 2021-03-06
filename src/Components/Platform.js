import React from 'react';
import AnalysisData from './AnalysisData';
import AnalysisTable from './AnalysisTable';

export default function Platform(props) {

  const renderTableData = () => {
    const orders = props.orders;

    let platforms = orders.map(order => order.platform);
    platforms = [...new Set(platforms)].sort();


    return platforms.map((platform, index) => {
      let platformOrders = props.orders.filter(order => order.platform === platform);

      return (
        <AnalysisData
          user={props.user}
          key={index}
          category={platform}
          numberOrders={platformOrders.length}
          averageTime={props.averageTime(platformOrders)}
          // minMile={props.minMile(platformOrders)}
          averageDistance={props.averageDistance(platformOrders)}
          dollarOrder={props.dollarOrder(platformOrders)}
          dollarHour={props.dollarHour(platformOrders)}
          dollarMile={props.dollarMile(platformOrders)}
        />
      )
    })
  }

  return (
    <AnalysisTable
      categoryTitle="Platform"
      tableData={renderTableData()}
    />
  );
}
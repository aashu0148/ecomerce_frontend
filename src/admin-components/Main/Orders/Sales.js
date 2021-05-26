import React from "react";
import { Line } from "react-chartjs-2";

function Sales(props) {
  const currYear = new Date().getFullYear();
  const prevYear = new Date().getFullYear() - 1;
  const orders = props.data.filter(
    (item) => item.year === currYear || item.year === prevYear
  );

  const currYearSales = new Array(new Date().getMonth() + 1);
  for (let i = 0; i < new Date().getMonth() + 1; ++i) currYearSales[i] = 0;
  const prevYearSales = new Array(12);
  for (let i = 0; i < 12; ++i) prevYearSales[i] = 0;

  orders.forEach((order) => {
    if (order.year === currYear && order.isDelivered)
      currYearSales[order.month - 1] += order.price;
  });
  orders.forEach((order) => {
    if (order.year === prevYear && order.isDelivered)
      prevYearSales[order.month - 1] += order.price;
  });

  const data = {
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Augest",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: `Sales ${currYear}`,
        data: currYearSales,
        borderColor: ["#a354ef"],
        backgroundColor: ["#a354ef"],
        pointBackgroundColor: ["#a354ef"],
        pointBorderColor: ["#a354ef"],
      },
      {
        label: `Sales ${prevYear}`,
        data: prevYearSales,
        borderColor: ["#f08080"],
        backgroundColor: ["#f08080"],
        pointBackgroundColor: ["#f08080"],
        pointBorderColor: ["#f08080"],
      },
    ],
  };

  const options = {
    options: {
      title: {
        display: true,
        text: "Sales in last 2 years",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              // stepSize: 10,
              // max: 200,
            },
          },
        ],
      },
    },
  };

  return (
    <div
      style={{
        minWidth: "600px",
        maxWidth: "950px",
        width: "100%",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "start" }}>Sales in last Two Years</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default Sales;

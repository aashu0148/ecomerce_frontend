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
    if (order.year === currYear) currYearSales[order.month - 1] += order.price;
  });
  orders.forEach((order) => {
    if (order.year === prevYear) prevYearSales[order.month - 1] += order.price;
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
        borderColor: ["#7cd629"],
        backgroundColor: ["#7cd629"],
        pointBackgroundColor: ["#7cd629"],
        pointBorderColor: ["#7cd629"],
      },
    ],
  };

  const options = {
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
            max: 200,
          },
        },
      ],
    },
  };

  return (
    <div
      style={{
        minWidth: "600px",
        maxWidth: "950px",
        width: "100%",
        textAlign: "center",
        margin: "auto",
      }}
    >
      <h2>Sales in last Two Years</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default Sales;

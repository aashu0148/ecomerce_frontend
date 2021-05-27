import React from "react";
import { Doughnut } from "react-chartjs-2";

function OrderType(props) {
  const currYear = new Date().getFullYear();
  const orders = props.data.filter((item) => item.year === currYear);

  const monthlySale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let totalSale = 0;

  orders.forEach((order) => {
    if (order.isDelivered) {
      monthlySale[order.month - 1] += order.price;
    }

    totalSale += order.price;
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
        label: "Type distribution",
        data: monthlySale,
        backgroundColor: [
          "#FFEFD5",
          "#00FFFF",
          "#e4144d",
          "#4169E1",
          "#5ae6b3",
          "coral",
          "#FFDEAD",
          "thistle",
          "#8B008B",
          "#B0C4DE",
          "#F08080",
          "violet",
          "#008080",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        margin: "auto",
        minWidth: "250px",
        maxWidth: "450px",
        width: "100%",
        // textAlign: "center",
      }}
    >
      <h2>Sales this year</h2>
      <h4>₹{totalSale}</h4>
      <Doughnut data={data} />
    </div>
  );
}

export default OrderType;

import React from "react";
import { Doughnut } from "react-chartjs-2";

function OrderDistribution(props) {
  let completed = 0,
    total = 0,
    cancelled = 0;
  props.data.forEach((item) => {
    if (item.isCancelled) ++cancelled;
    if (item.isDelivered) ++completed;
    ++total;
  });
  let processing = total - (completed + cancelled);

  const data = {
    labels: ["Completed", "Processing", "Cancelled"],
    datasets: [
      {
        label: "Orders distribution",
        data: [completed, processing, cancelled],
        backgroundColor: ["#a55fe0", "skyblue", "coral"],
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
        textAlign: "center",
      }}
    >
      <h2>Orders </h2>
      <h4>Total - {total}</h4>
      {!processing && !completed && !cancelled ? (
        <p style={{ margin: "20px 0" }}>No orders found</p>
      ) : (
        <Doughnut data={data} />
      )}
    </div>
  );
}

export default OrderDistribution;

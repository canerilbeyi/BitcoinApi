import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";

const Graph = () => {
  const [data, setData] = useState([
    {
      name: "EUR",
      data: [],
    },
    {
      name: "USD",
      data: [],
    },
    {
      name: "GBP",
      data: [],
    },
  ]);
  const [time, setTime] = useState([]);

  const chartDataOptions = {
    chart: {
      height: 350,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#77B6EA", "#545454", "#FF0000"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Bitcoin Chart",
      align: "left",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: time,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  const getData = async () => {
    const res = await axios.get(apiUrl);
    setData((prevState) => {
      return prevState.map((item) => {
        return {
          ...item,
          data: [...item.data, res.data.bpi[item.name].rate_float].slice(-10),
        };
      });
    });
    setTime((prevState) => [...prevState, res.data.time.updated].slice(-10));
  };

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      console.log("interval");
      getData();
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Chart
        options={chartDataOptions}
        series={data}
        type="line"
        width={"100%"}
        height={450}
      />
    </div>
  );
};

export default Graph;

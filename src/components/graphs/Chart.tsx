import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Chart = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const isDarkMode = theme === "dark";

  const options = {
    series: [
      {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: true,
      },
      background: isDarkMode ? "#252525" : "#fff",
      foreColor: isDarkMode ? "#fff" : "#373d3f",
    },
    colors: ["#1456F5"],
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
        columnWidth: "70%",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: [isDarkMode ? "#fff" : "#304758"],
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      position: "bottom",
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
        theme: theme,
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        show: true,
        formatter: function (val: any) {
          return val + "%";
        },
        style: {
          colors: isDarkMode ? "#fff" : "#373d3f",
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#90A4AE",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    title: {
      text: "Monthly Product Use",
      floating: false,
      offsetY: 0,
      align: "center",
      style: {
        color: isDarkMode ? "#fff" : "#444",
        fontSize: "20px",
        fontWeight: "bold",
      },
    },
  };

  return (
    <div className="w-full bg-white dark:bg-[#252525] p-4 rounded-lg shadow-md">
      <ReactApexChart
        style={{ width: "100%" }}
        //@ts-ignore
        options={options}
        series={options.series}
        height={500}
        width="100%"
        type="bar"
      />
    </div>
  );
};

export default Chart;

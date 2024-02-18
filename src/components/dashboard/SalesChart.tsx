import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ParticipantDomainChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 3,
      borderColor: "rgba(0,0,0,0.1)",
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
      ],
    },
  };

  const series = [
    {
      name: "Domain Rank",
      data: [0, 71, 40, 28, 31, 42, 108, 97],
    },
    {
      name: "Participant Count",
      data: [0, 11, 38, 45, 62, 34, 52, 41],
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Participant Count & Domain Rank</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Summary
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height={390}
          options={options}
          series={series}
        />
      </CardBody>
    </Card>
  );
};

export default ParticipantDomainChart;

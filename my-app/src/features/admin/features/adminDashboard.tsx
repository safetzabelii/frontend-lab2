import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { observer } from "mobx-react";
import StatisticsCard from "../assets/statistics-card";
import StatisticsChart from "../assets/statistics-chart";
import statisticsChartsData from "../assets/statistics-charts-data";


export default observer(function AdminDashboard(){

    

    
    return (
        <div className="mt-12">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
              <StatisticsCard
                    key={"title"}

                    icon={React.createElement(UserIcon, {
                        className: "w-6 h-6 text-white",
                    })}
                    footer={<Typography className="font-normal text-blue-gray-600">
                        <strong className="text-green-500">1</strong>
                        &nbsp;"Verfied users"
                        <strong className="text-red-500">1</strong>
                        &nbsp;"Unverfied users"
                    </Typography>}
                     title={"Users"}
                     value={"total"}

                />
                    
          </div>
          <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
            {statisticsChartsData.map((props) => (
              <StatisticsChart
                key={props.title}
                {...props}
                footer={
                  <Typography
                    variant="small"
                    className="flex items-center font-normal text-blue-gray-600"
                  >
                    <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                    &nbsp;{props.footer}
                  </Typography>
                }
              />
            ))}
          </div>
          </div>
      );


    
});
import React, { useEffect, useState } from "react";
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
import StatisticsCard from "./statistics-card";
import statisticsChartsData from "./statistics-charts-data";
import StatisticsChart from "./statistics-chart";
import { Link } from "react-router-dom";
import agent from "../../../app/api/agent";


export default observer(function AdminDashboard(){

    const [totalUsers, setTotalUsers] = useState(0);
    const [verifiedUsers, setVerifiedUsers] = useState(0);
    const [unverifiedUsers, setUnverifiedUsers] = useState(0);

    useEffect(() => {
      const fetchUserStats = async () => {
        try {
          const response = await agent.Users.getAllUsersForAdminDashboardDisplay();
          const users = response.data;
          setTotalUsers(users.length);
          setVerifiedUsers(users.filter((user: { isEmailVerified: any; }) => user.isEmailVerified).length);
          setUnverifiedUsers(users.filter((user: { isEmailVerified: any; }) => !user.isEmailVerified).length);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserStats();
    }, []);

    return (
        <div className="admin-dashboard-container mt-12">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
              <Link to="/dashboard/topOrders">
                <Card className="bg-gradient-to-br from-gray-300 to-blue-500">
                <CardHeader className="bg-gray-200 border-b-2 border-white-500">
                  <Typography color="indigo-500" className="text-lg font-medium">
                    Top Sellers
                  </Typography>
                </CardHeader>
                  <CardBody>
                    <IconButton color="white" ripple={true}>
                      <ArrowUpIcon className="w-5 h-5" />
                    </IconButton>
                  </CardBody>
                </Card>
              </Link>
              <StatisticsCard
                key={"title"}
                icon={React.createElement(UserIcon, {
                      className: "bg-gradient-to-br from-gray-500 to-blue-300 border-t border-blue-gray-50 p-3",
                  })}
                  footer={<Typography className="font-normal text-blue-gray-600">
                      <strong className="text-green-500">{verifiedUsers}</strong>
                      &nbsp;"Verfied users"
                      <strong className="text-red-500">{unverifiedUsers}</strong>
                      &nbsp;"Unverfied users"
                  </Typography>}
                   title={"Users"}
                   value={totalUsers.toString()}
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
import {
  
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/alert";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

interface props {
  chart: any;
  title: string;
  description: string;
  footer: any;
}

export function StatisticsChart({ chart, title, description, footer } : props) {
  return (
    <Card className="bg-gradient-to-br from-gray-300 to-white-500">
      <CardHeader variant="gradient" color="blue" className="bg-gradient-to-br from-gray-300 to-blue-500">
        <Chart {...chart}/>

      </CardHeader>
      <CardBody className="p-6 bg-gradient-to-br from-gray-300 to-white-500">
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {description}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsChart.defaultProps = {
  
  footer: null,
};

StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default StatisticsChart;

import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";
import Axios from 'axios';

import Chart from "./charts";

class UsersByRoles extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  async componentDidMount() {

    const res = await Axios.get('/api/dashboard/details2');

    const designers = res.data.designersActive;
    const customers = res.data.customersActive;
    const sum = designers + customers;

    const a = [
      ((customers / sum) * 100).toFixed(2),
      ((designers / sum) * 100).toFixed(2), 
    ]

    const chartData = {
        datasets: [
            {
                hoverBorderColor: "#ffffff",
                data: a,
                backgroundColor: [
                    "rgba(0,123,255,0.9)",
                    "rgba(0,123,255,0.5)",
                ]
            }
        ],
        labels: [
            "Customer",
            "Designer",
        ]
    }

    const chartConfig = {
      type: "pie",
      data: chartData,
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      }
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col>
              <FormSelect
                size="sm"
                value="last-week"
                style={{ maxWidth: "130px" }}
                onChange={() => {}}
              >
                <option value="last-week">Last Week</option>
                <option value="today">Today</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </FormSelect>
            </Col>
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
              <a href="#">View full report &rarr;</a>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

UsersByRoles.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};

export default UsersByRoles;

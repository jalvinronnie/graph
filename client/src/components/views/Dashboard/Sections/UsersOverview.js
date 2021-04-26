import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, CardHeader, CardBody } from "shards-react";

import RangeDatePicker from "./RangeDatePicker";
import Chart from "./charts";
import Axios from "axios";

class UsersOverview extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  data = {
    labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: "Current Month",
        fill: "start",
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3,
        data: []
      },
      // {
      //   label: "Past Month",
      //   fill: "start",
      //   backgroundColor: "rgba(255,65,105,0.1)",
      //   borderColor: "rgba(255,65,105,1)",
      //   pointBackgroundColor: "#ffffff",
      //   pointHoverBackgroundColor: "rgba(255,65,105,1)",
      //   borderDash: [3, 3],
      //   borderWidth: 1,
      //   pointRadius: 0,
      //   pointHoverRadius: 2,
      //   pointBorderColor: "rgba(255,65,105,1)",
      //   data: []
      // }
    ]
  }

  state = {
    chartData: this.data
  }

  createDataArray(perdatesales, start, end) {
    const today = new Date();
    const aMonthAgo = (today) => new Date(new Date(today).getTime() - 30 * 24 * 60 * 60 * 1000);

    end = end || today;
    start = start || aMonthAgo(end);

    const perdatesalesObj = {};

    perdatesales.forEach(sale => {
      perdatesalesObj[sale._id] = sale;
    })

    const salesArray = [];
    const labels = [];

    for(let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      let it = new Date(d.getTime());
      salesArray.push({
        d: it,
        sales: perdatesalesObj[it.toLocaleDateString().split('/').reverse().join('-')] || 0
      });

      const [a, b] = it.toLocaleDateString().split('/');
      labels.push(`${a}/${b}`);
    }

    const count = salesArray.map(sale => sale.sales.count);
    const sales = salesArray.map(sale => sale.sales.sales);

    return [[sales, count], labels, salesArray];
  }

  async componentDidMount() {

    const result = await Axios.get('/api/dashboard/details3')
    console.log(result);
    const [[sales, count], labels, salesArray] = this.createDataArray(result.data.salesPerDate);

    await this.setState(prev => (
      {
        ...prev,
        salesArray,
        chartData: {
          ...prev.chartData,
          labels,
          datasets: prev.chartData.datasets.map((dataset, index) => ({
            ...dataset,
            data: !index ? sales: count
          }))
        }
      }
    ));

    console.log('state',this.state)

    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top"
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return index % 2 !== 0 ? "" : tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using Ks for thousands.
                  return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                }
              }
            }
          ]
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false
        }
      },
      ...this.props.chartOptions
    };

    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: this.state.chartData,
      options: chartOptions
    });

    // They can still be triggered on hover.
    const buoMeta = BlogUsersOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[
      this.state.chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    BlogUsersOverview.render();
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader>
          <h4 className="m-0">{title}</h4>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              <RangeDatePicker />
            </Col>
            <Col>
              <Button
                size="sm"
                className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
              >
                View Full Report &rarr;
              </Button>
            </Col>
          </Row>
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}

UsersOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};


export default UsersOverview;

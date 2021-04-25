import "bootstrap/dist/css/bootstrap.min.css";
import "../../../shards-dashboards.1.1.0.min.css";
import { Row, Col as ShardCol } from 'shards-react';
import { Typography, Card, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import UserOverview from './Sections/UsersOverview';
import Axios from 'axios';
import UsersByRoles from './Sections/UsersByRoles';

const { Text, Title } = Typography;

const initData = [
    {
        title: 'Products sold',
        value: '...'
    },
    {
        title: 'Revenue generated',
        value: '...'
    },
    {
        title: 'Designers active',
        value: '...'
    },
    {
        title: 'Customers active',
        value: '...'
    },
    {
        title: 'Transactions happened',
        value: '...'
    },
    {
        title: 'Avg. designer revenue',
        value: '...'
    },
];

/**
 * 1. Number of products sold
 * 2. Sales revenue generated
 * 3. No. of designers
 * 4. No. of customers
 * 5. Payments happened chart
 * 6. Average designer revenue
 */

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState(initData);

    useEffect(() => {

        Axios.get('/api/dashboard/details')
            .then(res => {
                setDashboardData([
                    {
                        title: 'Products sold',
                        value: res.data.productsSold
                    },
                    {
                        title: 'Revenue generated',
                        value: `$${res.data.revenueGenerated}`
                    },
                    {
                        title: 'Designers active',
                        value: res.data.designersActive
                    },
                    {
                        title: 'Customers active',
                        value: res.data.customersActive
                    },
                    {
                        title: 'Transactions happened',
                        value: res.data.numOfTransactions
                    },
                    {
                        title: 'Avg. designer revenue',
                        value: `$${res.data.avgDesignerRevenue}`
                    },
                ])
            })
            .catch(err => console.log(err));

    }, []);

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Row
                gutter={[24, 24]}
                justify="space-around"
                align="center"
            >
                {
                    dashboardData.map(data => (
                        <Col xs={24} lg={4} md={8} sm={12}>
                            <Card>
                                <Text strong type="secondary">{data['title'].toUpperCase()}</Text>
                                <Title level={2}>{data['value']}</Title>
                            </Card>
                        </Col>
                    ))
                }
            </Row>

            <Row>
                <ShardCol lg="8" md="12" sm="12" className="my-4">
                    <UserOverview />
                </ShardCol>
                <ShardCol lg="4" md="6" sm="12" className="my-4">
                    <UsersByRoles title="User distribution"/>
                </ShardCol>
            </Row>
        </div>
    );
}

export default Dashboard;
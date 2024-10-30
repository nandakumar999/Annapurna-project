import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const SalesDashboard = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get('http://localhost:8080/order');
                console.log(response);
                setSalesData(response.data);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };
        fetchSales();
    }, []);

    // Only create chartData if salesData has content
    const chartData = salesData.length > 0 ? {
        labels: salesData.map(sale => sale.date),
        datasets: [{
            label: 'Sale',
            data: salesData.map(sale => sale.quanity    ),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
        }],
    } : null;

    return (
        <div>
            <h2>Sales</h2>
            {chartData ? <Line data={chartData} /> : <p>Loading...</p>}
        </div>
    );
};

export default SalesDashboard;

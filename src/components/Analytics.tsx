import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, BarElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './Analytics.css';

// Register the components
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/analytics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnalyticsData(response.data);
      } catch (err) {
        setError('Failed to fetch analytics data.');
      }
    };

    fetchAnalytics();
  }, [token]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="analytics-container">
      <h2>Spending Analytics</h2>
      
      <div className="charts">
        <div className="chart-container">
          <h3>Category Wise Expense</h3>
          <Pie
            data={{
              labels: analyticsData.category_spending.map((item: any) => item.category),
              datasets: [{
                data: analyticsData.category_spending.map((item: any) => item.total),
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40',
                ],
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true, 
            }}
            height={200} 
            width={300} 
          />
        </div>

        <div className="chart-container">
          <h3>Monthly Expenses</h3>
          <Bar
            data={{
              labels: analyticsData.monthly_expenses.map((item: any) => item.month),
              datasets: [{
                label: 'Expenses',
                data: analyticsData.monthly_expenses.map((item: any) => item.total),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true, 
            }}
            height={200} 
            width={300} 
          />
        </div>

        <div className="chart-container">
          <h3>Daily Expenses</h3>
          <Bar
            data={{
              labels: analyticsData.daily_expenses.map((item: any) => item.day),
              datasets: [{
                label: 'Expenses',
                data: analyticsData.daily_expenses.map((item: any) => item.total),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true, 
            }}
            height={200}
            width={300}
          />
        </div>
      </div>

      <h3>Budget Overview</h3>
      <table className="budget-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Budget Amount</th>
            <th>Total Expenses</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
        {analyticsData.budget_expense_data.map((budget: any) => (
            <tr key={budget.id}>
            <td className={Number(budget.budget_amount) >= Number(budget.total_expenses) ? 'green' : 'red'}>{budget.category}</td>
            <td className={Number(budget.budget_amount) >= Number(budget.total_expenses) ? 'green' : 'red'}>
                ${Number(budget.budget_amount).toFixed(2)}
            </td>
            <td className={Number(budget.budget_amount) >= Number(budget.total_expenses) ? 'green' : 'red'}>${Number(budget.total_expenses).toFixed(2)}</td>
            <td className={Number(budget.budget_amount) >= Number(budget.total_expenses) ? 'green' : 'red'}>{new Date(budget.start_date).toLocaleDateString()}</td>
            <td className={Number(budget.budget_amount) >= Number(budget.total_expenses) ? 'green' : 'red'}>{new Date(budget.end_date).toLocaleDateString()}</td>
            </tr>
        ))}
        </tbody>

      </table>
    </div>
  );
};

export default Analytics;

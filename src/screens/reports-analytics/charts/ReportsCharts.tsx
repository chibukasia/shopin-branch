"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Dummy data for reports charts
const performanceData = [
  { month: 'Jan', revenue: 32000, orders: 450, customers: 280 },
  { month: 'Feb', revenue: 35000, orders: 480, customers: 310 },
  { month: 'Mar', revenue: 38000, orders: 520, customers: 340 },
  { month: 'Apr', revenue: 42000, orders: 580, customers: 380 },
  { month: 'May', revenue: 45000, orders: 620, customers: 410 },
  { month: 'Jun', revenue: 48000, orders: 680, customers: 450 },
  { month: 'Jul', revenue: 52000, orders: 720, customers: 480 },
  { month: 'Aug', revenue: 48000, orders: 680, customers: 450 },
  { month: 'Sep', revenue: 45000, orders: 620, customers: 410 },
  { month: 'Oct', revenue: 42000, orders: 580, customers: 380 },
  { month: 'Nov', revenue: 38000, orders: 520, customers: 340 },
  { month: 'Dec', revenue: 35000, orders: 480, customers: 310 },
];

const categoryPerformance = [
  { category: 'Electronics', revenue: 18500, percentage: 41 },
  { category: 'Accessories', revenue: 12000, percentage: 27 },
  { category: 'Gaming', revenue: 8900, percentage: 20 },
  { category: 'Others', revenue: 5830, percentage: 12 },
];

const customerSegments = [
  { segment: 'New Customers', value: 35, color: '#3b82f6' },
  { segment: 'Returning Customers', value: 45, color: '#10b981' },
  { segment: 'VIP Customers', value: 20, color: '#f59e0b' },
];

const ReportsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Performance Trend Chart */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Annual Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : name === 'orders' ? 'Orders' : 'Customers'
                ]}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="customers"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" width={100} />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Customer Segments */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ segment, percent }) => `${segment} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsCharts;

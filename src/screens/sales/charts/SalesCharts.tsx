"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Dummy data for charts
const revenueData = [
  { date: '2024-01-01', revenue: 2400, orders: 12, customers: 8 },
  { date: '2024-01-02', revenue: 1398, orders: 8, customers: 6 },
  { date: '2024-01-03', revenue: 9800, orders: 25, customers: 18 },
  { date: '2024-01-04', revenue: 3908, orders: 15, customers: 12 },
  { date: '2024-01-05', revenue: 4800, orders: 18, customers: 14 },
  { date: '2024-01-06', revenue: 3800, orders: 14, customers: 10 },
  { date: '2024-01-07', revenue: 4300, orders: 16, customers: 13 },
  { date: '2024-01-08', revenue: 5200, orders: 20, customers: 15 },
  { date: '2024-01-09', revenue: 6100, orders: 22, customers: 17 },
  { date: '2024-01-10', revenue: 4800, orders: 18, customers: 14 },
  { date: '2024-01-11', revenue: 3900, orders: 15, customers: 11 },
  { date: '2024-01-12', revenue: 5500, orders: 21, customers: 16 },
  { date: '2024-01-13', revenue: 4200, orders: 17, customers: 13 },
  { date: '2024-01-14', revenue: 3800, orders: 14, customers: 10 },
  { date: '2024-01-15', revenue: 4600, orders: 19, customers: 15 },
];

const productSalesData = [
  { name: 'Wireless Headphones', sales: 12, revenue: 3599.88 },
  { name: 'Smart Watch', sales: 8, revenue: 1196.00 },
  { name: 'Bluetooth Speaker', sales: 15, revenue: 674.85 },
  { name: 'Gaming Mouse', sales: 6, revenue: 1199.94 },
  { name: 'USB Cable', sales: 20, revenue: 500.00 },
  { name: 'Laptop Stand', sales: 4, revenue: 319.96 },
  { name: 'Mechanical Keyboard', sales: 3, revenue: 449.97 },
  { name: 'Phone Case', sales: 18, revenue: 359.82 },
];

const paymentMethodData = [
  { name: 'Card', value: 65, color: '#3b82f6' },
  { name: 'Cash', value: 25, color: '#10b981' },
  { name: 'Bank Transfer', value: 10, color: '#8b5cf6' },
];

const SalesCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Trend Chart */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Revenue Trend (Last 15 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value, name) => [
                  name === 'revenue' ? `$${value}` : value,
                  name === 'revenue' ? 'Revenue' : name === 'orders' ? 'Orders' : 'Customers'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productSalesData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'sales' ? value : `$${value}`,
                  name === 'sales' ? 'Sales' : 'Revenue'
                ]}
              />
              <Bar dataKey="sales" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Methods Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethodData.map((entry, index) => (
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

export default SalesCharts;

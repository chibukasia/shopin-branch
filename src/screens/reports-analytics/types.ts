export interface ReportData {
  id: string;
  title: string;
  type: 'sales' | 'inventory' | 'customer' | 'financial' | 'performance';
  generatedDate: string;
  period: string;
  status: 'completed' | 'generating' | 'failed';
  fileUrl?: string;
  summary: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    growthRate: number;
  };
}

export interface AnalyticsMetric {
  name: string;
  value: number;
  previousValue: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  unit: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface PerformanceInsight {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'warning' | 'error' | 'info';
  impact: 'high' | 'medium' | 'low';
  recommendation?: string;
}

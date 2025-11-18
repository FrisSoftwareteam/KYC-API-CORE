"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  UserPlus,
  TrendingUp,
  TrendingDown,
  Search,
  Calendar,
  Building2,
  Award,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Sample data
const employeeData = [
  { month: "Jan", hires: 12, departures: 8, total: 245 },
  { month: "Feb", hires: 15, departures: 5, total: 255 },
  { month: "Mar", hires: 18, departures: 7, total: 266 },
  { month: "Apr", hires: 22, departures: 9, total: 279 },
  { month: "May", hires: 16, departures: 6, total: 289 },
  { month: "Jun", hires: 20, departures: 8, total: 301 },
];

const departmentData = [
  { name: "Engineering", value: 85, color: "#0088FE" },
  { name: "Sales", value: 45, color: "#00C49F" },
  { name: "Marketing", value: 32, color: "#FFBB28" },
  { name: "HR", value: 18, color: "#FF8042" },
  { name: "Finance", value: 25, color: "#8884D8" },
  { name: "Operations", value: 38, color: "#82CA9D" },
];

const performanceData = [
  { rating: "Excellent", count: 45 },
  { rating: "Good", count: 89 },
  { rating: "Average", count: 67 },
  { rating: "Below Average", count: 23 },
  { rating: "Poor", count: 8 },
];

const ageData = [
  { range: "20-25", count: 32 },
  { range: "26-30", count: 68 },
  { range: "31-35", count: 54 },
  { range: "36-40", count: 41 },
  { range: "41-45", count: 28 },
  { range: "46-50", count: 19 },
  { range: "50+", count: 15 },
];

const salaryData = [
  { department: "Engineering", average: 95000 },
  { department: "Sales", average: 72000 },
  { department: "Marketing", average: 68000 },
  { department: "Finance", average: 78000 },
  { department: "HR", average: 65000 },
  { department: "Operations", average: 58000 },
];

const satisfactionData = [
  { month: "Jan", score: 7.2 },
  { month: "Feb", score: 7.4 },
  { month: "Mar", score: 7.1 },
  { month: "Apr", score: 7.6 },
  { month: "May", score: 7.8 },
  { month: "Jun", score: 8.1 },
];

export default function AdminChart() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">301</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +4.2% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Hires</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +25% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Turnover Rate
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.7%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.3% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Satisfaction
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.1</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.3 from last month
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="compensation">Compensation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hiring Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Trends</CardTitle>
                  <CardDescription>
                    Monthly hiring and departure trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      hires: {
                        label: "New Hires",
                        color: "hsl(var(--chart-1))",
                      },
                      departures: {
                        label: "Departures",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <LineChart data={employeeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="hires"
                        stroke="var(--color-hires)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-hires)" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="departures"
                        stroke="var(--color-departures)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-departures)" }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Department Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                  <CardDescription>
                    Employee count by department
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Employees",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Employee Satisfaction Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Employee Satisfaction Trend</CardTitle>
                <CardDescription>
                  Monthly satisfaction scores (1-10 scale)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    score: {
                      label: "Satisfaction Score",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <AreaChart data={satisfactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[6, 9]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="var(--color-score)"
                      fill="var(--color-score)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Ratings Distribution</CardTitle>
                <CardDescription>
                  Employee performance review results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Employees",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="count"
                      fill="var(--color-count)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
                <CardDescription>
                  Employee distribution by age groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Employees",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <BarChart data={ageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="count"
                      fill="var(--color-count)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compensation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Salary by Department</CardTitle>
                <CardDescription>
                  Compensation analysis across departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    average: {
                      label: "Average Salary",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <BarChart data={salaryData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="department" type="category" width={100} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => [
                            `$${value.toLocaleString()}`,
                            "Average Salary",
                          ]}
                        />
                      }
                    />
                    <Bar
                      dataKey="average"
                      fill="var(--color-average)"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

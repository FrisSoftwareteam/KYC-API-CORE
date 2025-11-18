"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Upload,
  Trash2,
  Edit,
  MoreHorizontal,
  Users,
  UserCheck,
  Clock,
  TrendingUp,
  Filter,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataTable2 from "@/components/datatable/data-table copy";

const employees = [
  {
    id: 53,
    staffId: "FRIS-200",
    name: "FRIS",
    email: "friscomms@firstregistrarnigeria.com",
    workflow: "ET-DM",
    appraisal: "Half Year Appraisal 2025",
    role: "User",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 54,
    staffId: "FRIS-201",
    name: "INFO",
    email: "info@firstregistrarnigeria.com",
    workflow: "ET-DM",
    appraisal: "Appraisal Form - June 2025",
    role: "Manager",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 59,
    staffId: "FRIS-0003",
    name: "MATTHEW OJO",
    email: "matthew@firstregistrarnigeria.com",
    workflow: "-",
    appraisal: "-",
    role: "User",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 60,
    staffId: "FRIS-0004",
    name: "BUKOLA GIWA",
    email: "bukola@firstregistrarnigeria.com",
    workflow: "-",
    appraisal: "-",
    role: "User",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 61,
    staffId: "FRIS98",
    name: "OYELAMI OLUFEMI OLAWALE",
    email: "olufemi.oyelami@firstregistrarnigeria.com",
    workflow: "-",
    appraisal: "-",
    role: "User",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 62,
    staffId: "FRIS170",
    name: "OLUWASEGUN ADESOLA ADEDOYIN",
    email: "adesola.oluwasegun@firstregistrarnigeria.com",
    workflow: "-",
    appraisal: "-",
    role: "User",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const stats = [
  {
    title: "Total Employees",
    value: "156",
    change: "+12%",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    title: "Active Appraisals",
    value: "23",
    change: "+5%",
    icon: UserCheck,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    title: "Pending Reviews",
    value: "8",
    change: "-2%",
    icon: Clock,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    title: "Performance Score",
    value: "87%",
    change: "+3%",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
];

const projects = [
  { name: "Employee Onboarding", color: "bg-purple-500" },
  { name: "Performance Reviews", color: "bg-blue-500" },
  { name: "Training Programs", color: "bg-teal-500" },
  { name: "Talent Acquisition", color: "bg-orange-500" },
];

export default function HRDashboard({ children, content }: any) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.staffId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 ">
      {/* Sidebar */}
      {/* <div className="w-64 bg-white/80 backdrop-blur-sm shadow-xl border-r border-white/20">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">FRIS PORTAL</h2>
              <p className="text-xs text-gray-500 font-medium">ADMIN</p>
            </div>
          </div>
        </div>

        <nav className="px-4 space-y-2">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">
            CORE HR
          </div>
          <a
            href="#"
            className="flex items-center px-3 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg"
          >
            <Users className="w-4 h-4 mr-3" />
            Employee Mgt.
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg transition-all"
          >
            Employee Dashboard
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg transition-all"
          >
            Add Department
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg transition-all"
          >
            Add Reporting Officer(s)
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg transition-all"
          >
            Enable Self-Services
          </a>

          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2 mt-6">
            Performance Mgt.
          </div>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg transition-all"
          >
            Appraisal Form Builder
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg transition-all"
          >
            Appraisal Login
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg transition-all"
          >
            Appraisal Workflow
          </a>

          <div className="mt-8">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">
              My Projects
            </div>
            <div className="space-y-2">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all cursor-pointer"
                >
                  <div
                    className={`w-3 h-3 ${project.color} rounded-full mr-3`}
                  ></div>
                  {project.name}
                </div>
              ))}
              <button className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </button>
            </div>
          </div>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {/* <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Mon, June 29</p>
              <h1 className="text-3xl font-bold text-gray-900">Hello, Admin</h1>
              <p className="text-xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-semibold">
                How can I help you today?
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <Avatar className="w-10 h-10 ring-2 ring-white shadow-lg">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header> */}

        {/* Stats Cards */}
        <div className="p-6 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${stat.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                      <p
                        className={`text-sm font-medium mt-1 ${
                          stat.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change} from last month
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Employee Management Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {content}
                  </CardTitle>
                  <CardDescription className="text-gray-600 font-medium">
                    Manage your employees members and their information
                  </CardDescription>
                </div>
                {content == "Task for Appriasal Form creation" ? (
                  <></>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/80 hover:bg-white border-gray-200"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/80 hover:bg-white border-gray-200"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import CSV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/80 hover:bg-white border-gray-200 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Employee
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Search and Filters */}
              <div className="flex items-center gap-4 mb-6">
                {/* <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div> */}
                {/* <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-white/80 border-gray-200">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>

              {/* Employee Table */}
              <div className="rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm overflow-hidden">
                {/* <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150">
                      <TableHead className="w-[80px] font-bold text-gray-700">
                        ID
                      </TableHead>
                      <TableHead className="font-bold text-gray-700">
                        Employee
                      </TableHead>
                      <TableHead className="font-bold text-gray-700">
                        Staff ID
                      </TableHead>
                      <TableHead className="font-bold text-gray-700">
                        Email
                      </TableHead>
                      <TableHead className="font-bold text-gray-700">
                        Workflow
                      </TableHead>
                      <TableHead className="font-bold text-gray-700">
                        Appraisal
                      </TableHead>
                      <TableHead className="font-bold text-gray-700">
                        Role
                      </TableHead>
                      <TableHead className="font-bold text-gray-700">
                        Status
                      </TableHead>
                      <TableHead className="text-right font-bold text-gray-700">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee, index) => (
                      <TableRow
                        key={employee.id}
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all"
                      >
                        <TableCell className="font-bold text-gray-900">
                          {employee.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 ring-2 ring-white shadow-md">
                              <AvatarImage
                                src={employee.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback
                                className={`bg-gradient-to-r ${
                                  index % 2 === 0
                                    ? "from-blue-400 to-purple-400"
                                    : "from-green-400 to-teal-400"
                                } text-white font-bold`}
                              >
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {employee.name}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700 font-medium"
                          >
                            {employee.staffId}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 font-medium">
                          {employee.email}
                        </TableCell>
                        <TableCell>
                          {employee.workflow !== "-" ? (
                            <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium">
                              {employee.workflow}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          {employee.appraisal !== "-" ? (
                            <div className="truncate text-sm font-medium">
                              {employee.appraisal}
                              {employee.role === "Manager" && (
                                <Badge className="ml-2 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                  Manager
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`font-medium ${
                              employee.role === "Manager"
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
                            }`}
                          >
                            {employee.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200 font-medium">
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-white/95 backdrop-blur-sm"
                            >
                              <DropdownMenuLabel className="font-bold">
                                Actions
                              </DropdownMenuLabel>
                              <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table> */}
                {/* <DataTable2 /> */}
                {children}
              </div>

              {/* Pagination */}
              {/* <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600 font-medium">
                  Showing 1-10 of 16 rows
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="bg-white/80"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
                  >
                    1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/80 hover:bg-white"
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/80 hover:bg-white"
                  >
                    Next
                  </Button>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

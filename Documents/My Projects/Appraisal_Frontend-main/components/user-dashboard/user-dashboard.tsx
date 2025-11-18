"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Bell,
  CheckCircle,
  Target,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Coffee,
  MessageSquare,
  Settings,
  Heart,
  Briefcase,
  Sun,
  ChevronRight,
  Plus,
  Play,
} from "lucide-react";

export default function UserDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const performanceMetrics = [
    {
      title: "Overall Performance",
      value: 87,
      target: 90,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      textColor: "text-purple-700",
    },
    {
      title: "Tasks Completed",
      value: 24,
      target: 30,
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      textColor: "text-emerald-700",
    },
    {
      title: "Team Collaboration",
      value: 92,
      target: 85,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      textColor: "text-blue-700",
    },
    {
      title: "Learning Progress",
      value: 78,
      target: 80,
      icon: BookOpen,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      textColor: "text-orange-700",
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Complete Q4 Performance Review",
      status: "completed",
      priority: "high",
      dueDate: "Today",
      category: "HR",
    },
    {
      id: 2,
      title: "Update Project Documentation",
      status: "in-progress",
      priority: "medium",
      dueDate: "Tomorrow",
      category: "Development",
    },
    {
      id: 3,
      title: "Team Meeting Preparation",
      status: "pending",
      priority: "high",
      dueDate: "Dec 15",
      category: "Management",
    },
    {
      id: 4,
      title: "Client Presentation Review",
      status: "pending",
      priority: "low",
      dueDate: "Dec 18",
      category: "Sales",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Team Standup",
      time: "9:00 AM",
      type: "meeting",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Project Review",
      time: "2:00 PM",
      type: "review",
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "Training Session",
      time: "4:00 PM",
      type: "training",
      color: "bg-emerald-500",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Top Performer",
      description: "Exceeded targets for 3 consecutive months",
      icon: "🏆",
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: 2,
      title: "Team Player",
      description: "Outstanding collaboration score",
      icon: "🤝",
      color: "from-blue-400 to-purple-500",
    },
    {
      id: 3,
      title: "Innovation Award",
      description: "Implemented creative solution",
      icon: "💡",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}

      <div className="p-6 space-y-8">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <Card
              key={index}
              className={cn(
                "border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br",
                metric.bgColor
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "p-3 rounded-xl bg-gradient-to-br shadow-lg",
                      metric.color
                    )}
                  >
                    <metric.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-800">
                      {metric.value}%
                    </p>
                    <p className="text-sm text-slate-600">
                      Target: {metric.target}%
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className={cn("font-semibold", metric.textColor)}>
                    {metric.title}
                  </p>
                  <Progress value={metric.value} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tasks & Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Tasks */}
            <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    📋 Recent Tasks
                  </CardTitle>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-slate-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800">
                            {task.title}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {task.category} • Due {task.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn("border", getStatusColor(task.status))}
                        >
                          {task.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={cn(
                            "border",
                            getPriorityColor(task.priority)
                          )}
                        >
                          {task.priority}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  🏆 Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={cn(
                        "p-4 rounded-xl text-center bg-gradient-to-br text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1",
                        achievement.color
                      )}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h4 className="font-bold mb-1">{achievement.title}</h4>
                      <p className="text-sm opacity-90">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg">
                <CardTitle className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  📅 Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <div
                        className={cn("w-3 h-3 rounded-full", event.color)}
                      ></div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">
                          {event.title}
                        </p>
                        <p className="text-sm text-slate-600">{event.time}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-xl bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  ⚡ Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-amber-600" />
                    <span className="font-medium">Coffee Breaks</span>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800">3 today</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Messages</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">12 new</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Wellness Score</span>
                  </div>
                  <Badge className="bg-red-100 text-red-800">85%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Mini Calendar */}
            <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0 w-auto">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                <CardTitle className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  📆 Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0 w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Learning & Development */}
        <Card className="shadow-xl bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              🚀 Learning & Development
            </CardTitle>
            <CardDescription className="text-slate-600">
              Continue your professional growth journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/60 rounded-xl border border-violet-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-violet-800">Current Courses</h3>
                </div>
                <p className="text-2xl font-bold text-violet-700 mb-2">3</p>
                <p className="text-sm text-slate-600">
                  2 in progress, 1 completed
                </p>
              </div>

              <div className="p-6 bg-white/60 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-purple-800">Certifications</h3>
                </div>
                <p className="text-2xl font-bold text-purple-700 mb-2">7</p>
                <p className="text-sm text-slate-600">2 expiring soon</p>
              </div>

              <div className="p-6 bg-white/60 rounded-xl border border-fuchsia-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-pink-500 to-fuchsia-500 rounded-lg">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-fuchsia-800">Learning Goals</h3>
                </div>
                <p className="text-2xl font-bold text-fuchsia-700 mb-2">5</p>
                <p className="text-sm text-slate-600">3 on track, 2 behind</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

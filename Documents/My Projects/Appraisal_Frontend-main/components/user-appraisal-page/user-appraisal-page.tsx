import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  MessageSquare,
  Play,
  Rocket,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { datatableColumnManagerLog } from "@/components/datatable/datatableColumnManagerLog";
import { DataTableManager } from "@/components/datatable/data-tableManager";
import { DatatableColumnUserResultLog } from "../datatable/datatableColumnUserResultLog";
import { useQuery } from "@tanstack/react-query";

const UserAppraisalUI = ({ email }: any) => {
  const { data } = useQuery({
    queryKey: ["users-logs-data"],
    queryFn: async () => {
      try {
        return await fetch(`/api/get-user-result/${email}`)
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <div className="flex-1 p-8">
        <Tabs defaultValue="appraisal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 bg-slate-100 p-1 mb-8">
            <TabsTrigger
              value="appraisal"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-medium">
              📊 Appraisal
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-medium">
              💬 Feedback Log(s)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appraisal">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-lime-500 text-white px-4 py-2 text-sm font-semibold">
                      🎯 2025 APPRAISAL LIVE
                    </Badge>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                      Welcome to Appraisal Module
                    </h1>
                  </div>

                  <div className="space-y-4">
                    <p className="text-lg text-slate-600 leading-relaxed">
                      The appraisal for the year 2025 is currently{" "}
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mx-1">
                        ✅ LIVE
                      </Badge>
                      . Each employee is expected to participate in this
                      exercise.
                    </p>
                    <p className="text-slate-600">
                      Complete all of the questions and submit them for your
                      line manager for action.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                    <h3 className="font-semibold text-slate-800 mb-2">
                      📋 Quick Instructions:
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Review your performance goals and achievements
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Complete self-assessment questions
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Submit for manager review
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-700 font-medium">
                      To get started, click the link below.
                    </p>
                    {/* <Link href={"/users/question"} className="mb-2"> */}
                    <Button
                      size="lg"
                      className="bg-gradient-to-r  from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <Link href={"/users/question"} className="flex flex-row">
                        <Play className="h-5 w-5 mr-2" />
                        <div> Get Started</div>
                      </Link>
                    </Button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl">
                  <div className="relative h-80 bg-gradient-to-t from-blue-400/20 to-transparent rounded-2xl overflow-hidden">
                    {/* Clouds */}
                    <div className="absolute top-4 left-8 w-16 h-8 bg-white/30 rounded-full"></div>
                    <div className="absolute top-6 right-12 w-12 h-6 bg-white/25 rounded-full"></div>
                    <div className="absolute top-12 left-16 w-20 h-10 bg-white/20 rounded-full"></div>

                    {/* Growth Arrow */}
                    <div className="absolute bottom-20 left-8 right-8">
                      <div className="h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transform rotate-12 shadow-lg"></div>
                      <div className="absolute right-0 top-0 w-0 h-0 border-l-8 border-l-orange-500 border-t-4 border-t-transparent border-b-4 border-b-transparent transform rotate-12"></div>
                    </div>

                    {/* People Illustrations */}
                    <div className="absolute bottom-8 left-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                        <User className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    <div className="absolute bottom-12 right-8">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                        <Target className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-16 right-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce">
                        <Rocket className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    <div className="absolute top-24 left-4">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg animate-pulse"></div>
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">95%</div>
                      <div className="text-xs text-blue-100">Completion</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">4.8</div>
                      <div className="text-xs text-blue-100">Avg Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">2025</div>
                      <div className="text-xs text-blue-100">Active Year</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
              {/* <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  💬 Feedback Logs
                </CardTitle>
                <CardDescription>
                  View and manage feedback history
                </CardDescription>
              </CardHeader> */}
              <CardContent className="p-8">
                <DataTableManager
                  data={!data ? [] : data}
                  columns={DatatableColumnUserResultLog}
                />{" "}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserAppraisalUI;

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import AdminEmployeeDashboard from "../admin-page-ui/admin-employee-dashboard/admin-employee-dashboard";
import AdminEmployeeDashboard2 from "../admin-page-ui/admin-employee-dashboard/admin-employee-dashboard2";
import UserResultLog from "../user-ui/user-log/user-result-log";
import UserResultLog2 from "../user-ui/user-log/user-result-log2";
import { FormPreviewManager4 } from "../form-preview-manager4";
import { ScrollArea } from "../ui/scroll-area";
import StepperForm from "../multi-steppper/multi-stepper";
import ReadEmployee from "../admin-page-ui/admin-view-employee/admin-view-employee";
import { useGetAnswerId } from "@/zustand/store";
import ReadEmployee2 from "../admin-page-ui/admin-view-employee/admin-view-employee2";

export default function SplitScreenModals() {
  const [leftModalOpen, setLeftModalOpen] = useState(false);
  const [rightModalOpen, setRightModalOpen] = useState(false);
  const { getAnsId, user, data } = useGetAnswerId();

  return (
    <div className="min-h-screen p-2 md:p-2">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Appraisal Management Console
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2">
        {/* Left Card */}

        <div className="flex flex-col gap-6 space-y-4">
          <div>
            <Card className="h-auto">
              <CardHeader>
                <CardTitle>Employee Result Log</CardTitle>
                <CardDescription>View result log(s)</CardDescription>
              </CardHeader>
              <CardContent className="w-auto">
                {/* <Button onClick={() => setLeftModalOpen(true)}>
                Open Left Modal
              </Button> */}

                <UserResultLog2 />

                {/* <AdminEmployeeDashboard2 /> */}
              </CardContent>
            </Card>

            {/* Left Modal */}
            {leftModalOpen && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md mx-auto">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Left Modal</CardTitle>
                      <CardDescription>
                        This modal only covers the left card
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setLeftModalOpen(false)}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p>
                      This modal is contained within the left card area and
                      doesn't cover the entire screen.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => setLeftModalOpen(false)}
                      className="w-full">
                      Close Modal
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>

          <div>
            <Card className="h-auto">
              <CardHeader>
                <CardTitle>Employee Details</CardTitle>
                <CardDescription>View result log(s)</CardDescription>
              </CardHeader>
              <CardContent className=" w-auto">
                {/* <Button onClick={() => setLeftModalOpen(true)}>
                Open Left Modal
              </Button> */}
                <ReadEmployee2 data={user} />
              </CardContent>
            </Card>

            {/* Left Modal */}
            {leftModalOpen && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md mx-auto">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Left Modal</CardTitle>
                      <CardDescription>
                        This modal only covers the left card
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setLeftModalOpen(false)}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p>
                      This modal is contained within the left card area and
                      doesn't cover the entire screen.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => setLeftModalOpen(false)}
                      className="w-full">
                      Close Modal
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Right Card */}
        <div className="relative">
          <Card className="h-auto w-full">
            <CardHeader>
              <CardTitle>Assessment</CardTitle>
              <CardDescription>View the assessments</CardDescription>
            </CardHeader>
            <CardContent className="flex h-auto w-full">
              <ScrollArea className="h-[700px] w-full">
                {/* <Button onClick={() => setRightModalOpen(true)}>
                Open Right Modal
              </Button> */}
                {/* <FormPreviewManager4 id={16} /> */}
                <StepperForm id={data} />
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right Modal */}
          {rightModalOpen && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
              <Card className="w-full max-w-md mx-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Right Modal</CardTitle>
                    <CardDescription>
                      This modal only covers the right card
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setRightModalOpen(false)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <p>
                    This modal is contained within the right card area and
                    doesn't cover the entire screen.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setRightModalOpen(false)}
                    className="w-full">
                    Close Modal
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UserResultLog2 from "../user-ui/user-log/user-result-log2";
import { FormPreviewManager4 } from "../form-preview-manager4";
import FeedbackFrom from "./promotion-feeback";

export default function StepperForm({ id }: any) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const totalSteps = 2;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    setShowAlert(true);
  };

  const confirmNext = () => {
    setCurrentStep(2);
    setShowAlert(false);
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  //   const isStep1Valid =
  //     formData.firstName && formData.lastName && formData.email;

  return (
    <div className=" mx-auto p-6">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Appraisal Form</CardTitle>
          <CardDescription className="mb-4 mt-5">
            Please preview the underlining assessments; you can also alter or
            modify the following requirements; once completed, save the request
            and move to the <strong> Next button.</strong> However, after you
            click the <strong>Next button </strong> on this page, you will not
            be able to <strong className="uppercase">go back </strong>. However,
            please ensure that you are{" "}
            <strong className=" uppercase">paid attention </strong> in assessing
            before proceeding to the following page.
          </CardDescription>
          <div className="space-y-2 mt-6">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent>
          {/* <form onSubmit={handleSubmit}> */}
          {currentStep === 1 && <FormPreviewManager4 />}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Remmondation Feedback </h3>
              <FeedbackFrom id={id} />
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={true}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={handleNext}
                // disabled={!isStep1Valid}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : null}
          </div>
          {/* </form> */}
        </CardContent>
      </Card>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Proceed to Next Step?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to proceed to step 2 of the form. Please make sure
              all the information in step 1 is correct before continuing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmNext}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

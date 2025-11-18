"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { useDialogOnboarding } from "../../zustand/store";
import FormDialog from "../onboarding-form/onboardingform";

const OnboardingDialog = () => {
  const { isOpen, onClose } = useDialogOnboarding();
  return (
    <div>
      <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
        <DialogContent className="max-w-[990px] h-[700px]  border-orange-600 ">
          <DialogHeader>
            {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
            <DialogDescription>
              {" "}
              <FormDialog />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OnboardingDialog;

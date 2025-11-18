"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DialogComponenet = () => {
  // type UserType = {
  //   id: number;
  //   email: string;
  //   firstName: string;
  //   lastName: string;
  //   clerkUserId: string;
  //   imageUrl: string;
  //   status: boolean;
  //   role: string;
  // };

  //console.log("Data Value", depart);

  return (
    <div className="mt-4">
      <Dialog open={true} modal defaultOpen={true}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Updates on the Users Profile</DialogTitle>
            <DialogDescription className="mt-4"> </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogComponenet;

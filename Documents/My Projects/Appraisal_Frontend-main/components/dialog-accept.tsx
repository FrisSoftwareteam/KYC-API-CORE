"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ReasonDialogProps {
  triggerText: string;
  title: string;
  description: string;
  disabled: boolean;
  onSubmit: (reason: string) => void;
}

export function ReasonDialog2({
  triggerText,
  title,
  description,
  disabled,
  onSubmit,
}: ReasonDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reason:", reason);
    if (reason.trim()) {
      onSubmit(reason);
      setOpen(false);
      setReason("");
      toast({
        title: "Reason submitted",
        description: "Your reason has been successfully submitted.",
      });
    } else {
      toast({
        title: "Error",
        description: "Please provide a reason before submitting.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          disabled={disabled}
          className="w-44 bg-lime-600 hover:bg-lime-400">
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]  border-lime-600 border-4">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter your reason here..."
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

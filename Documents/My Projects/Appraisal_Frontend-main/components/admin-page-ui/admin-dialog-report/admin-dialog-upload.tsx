import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { HardDriveUpload } from "lucide-react";
import UploadReports from "../admin-upload-reports/admin-upload-reports";

export function UploadButtonReport() {
  //console.log(uuid);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-1 bg-sky-900 m-1 items-end">
          {" "}
          <div className="flex flex-row space-x-1 gap-1 ">
            {" "}
            <HardDriveUpload className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Bulk Upload
            </span>
          </div>{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Upload </DialogTitle>
          <DialogDescription>
            Please upload a single or multiple file in CSV format.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <UploadReports uuid={""} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

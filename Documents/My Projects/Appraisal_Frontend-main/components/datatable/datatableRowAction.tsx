"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
// import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

import { Shirt, Users } from "lucide-react";

// type Status = {
//   value: string;
//   label: string;
//   icon: LucideIcon;
// };

interface DataTableRowActionsProps<_TData> {
  row: any;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);

  //const control = row.original.control;

  const [position, setPosition] = React.useState("");

  const [opened, { close }] = useDisclosure(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Dialog onOpenChange={close} open={opened}>
                <DialogContent className="max-w-[890px] bg-muted/10 border-orange-600">
                  <DialogHeader>
                    {/* <DialogTitle>Edit profile</DialogTitle> */}
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </TooltipTrigger>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[190px]">
              <DropdownMenuLabel> Assign Task </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="self">
                  <Link
                    href={`/frontdesk/self-assigned-task/${row.original.controlno}`}
                    className="flex  flex-row gap-2"
                  >
                    <Shirt size={18} color="lime" /> SELF-ASSIGNED
                  </Link>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="members"
                  // onClick={open}
                  className="z-0"
                >
                  <Link
                    href={`/frontdesk/assign-task/${row.original.controlno}`}
                    className="flex  flex-row gap-2"
                  >
                    <Users size={18} color="orange" /> TEAM MEMBERS
                  </Link>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipContent>
            <p>Assign Task</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* {position === "members" ? ( */}
      <></>
      {/* ) : null} */}
    </>
  );
}

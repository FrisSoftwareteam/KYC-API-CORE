"use client";

import * as React from "react";
import { useFormStore } from "@/zustand/form";
import { useShallow } from "zustand/shallow";

import { FormState } from "@/types/form-store";
import { fields } from "@/lib/constants";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Notebook } from "lucide-react";
// import { Logo } from "@/components/logo";
import { useFormState } from "@/zustand/store";

const selector = (state: FormState) => ({
  addFormField: state.addFormField,
  setIsEditFormFieldOpen: state.setIsEditFormFieldOpen,
  setSelectedFormField: state.setSelectedFormField,
});

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { addFormField, setSelectedFormField, setIsEditFormFieldOpen } =
    useFormStore(useShallow(selector));

  const { formstate } = useFormState();

  return (
    <>
      {formstate && (
        <Sidebar
          collapsible="none"
          className="sticky hidden lg:flex top-0 h-svh border-r-0 "
          {...props}>
          <SidebarHeader className="h-16">
            <div className="my-auto flex w-fit items-center gap-2">
              <div className="flex aspect-square size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                {/* <Logo className="size-4 invert" /> */}
                <Notebook className="size-4 " />
              </div>
              <span className="text-sm font-semibold"> Form Fields</span>
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Fields</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {fields.map((field) => (
                    <SidebarMenuItem key={field.name}>
                      <SidebarMenuButton
                        onClick={() => {
                          const newFormField = {
                            ...field,
                            id: Math.random().toString().slice(-10),
                            name: `${field.name
                              .toLowerCase()
                              .replaceAll(" ", "_")}_${Math.random()
                              .toString()
                              .slice(-10)}`,
                          };
                          addFormField(newFormField);
                          setSelectedFormField(newFormField.id);
                          setIsEditFormFieldOpen(true);
                        }}>
                        <field.Icon />
                        <span>{field.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
      )}
    </>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
// import { cn } from "@/lib/utils";

// interface Employee {
//   id: string;
//   name: string;
//   title: string;
// }

// interface DottedBackgroundProps {
//   dotColor?: string;
//   backgroundColor?: string;
//   dotSize?: number;
//   spacing?: number;
//   className?: string;
//   children?: React.ReactNode;
// }

export default function OrgChartAppraisal({ email }: any) {
  const { data } = useQuery({
    queryKey: ["chartpreview"],
    queryFn: async () => {
      try {
        return await fetch(`/api/org-chart/${email}`)
          .then((res: any) => res.json())
          .then((data: any) => {
            // console.log(data.data.reporting_chains);
            return data.data.reporting_chains;
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [employees, setEmployees] = useState(data);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setEmployees(items);
  };

  const dotColor = "#ccc";
  const backgroundColor = "#0000";
  const dotSize = 7;
  const spacing = 20;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      drawDots(ctx, width, height);
    };

    const drawDots = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = dotColor;
      for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [dotColor, backgroundColor, dotSize, spacing]);

  console.log(data);
  return (
    <div className="p-8 bg-gray-100 h-auto ">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Appraisal Organizational Chart
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="employees">
          {(provided) => (
            <>
              {/* <canvas
                ref={canvasRef}
                className="w-full"
                style={{ zIndex: -1 }}
              /> */}
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-12 h-auto"
              >
                {data?.map((employee: any, index: any) => (
                  <Draggable key={index} draggableId={index} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative"
                      >
                        <Card className="w-64 mx-auto">
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg">
                              {employee?.name || "NOT APPLICABLE"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {employee?.title || "NULL"}
                            </p>
                          </CardContent>
                        </Card>
                        {index < employees?.length - 1 && (
                          <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2">
                            <ChevronDown className="text-gray-400" size={24} />
                          </div>
                        )}
                        {index < employees?.length - 1 && (
                          <div className="absolute left-1/2 -bottom-12 w-px h-4 bg-gray-300"></div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

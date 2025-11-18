"use client";

import { Contact2 } from "lucide-react";
import { useRef, useEffect } from "react";

interface HierarchicalOrgChartProps {
  data: Record<string, string>;
  mappings: Record<string, string>;
}

export function HierarchicalOrgChart({
  data,
  mappings,
}: HierarchicalOrgChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = 600;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw organization chart
    drawHierarchicalOrgChart(ctx, canvas.width, canvas.height);
  }, [data, mappings]);

  const drawHierarchicalOrgChart = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    // Set styles
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Calculate positions
    const centerX = width / 2;
    const startY = 80;
    const boxWidth = 220;
    const boxHeight = 80;
    const verticalGap = 100;

    // Define the hierarchy levels
    const levels = [
      { key: "email", label: "User Email", y: startY, icon: <Contact2 /> },
      { key: "supervisor", label: "Supervisor", y: startY + verticalGap },
      {
        key: "departmentHead",
        label: "Department Head",
        y: startY + verticalGap * 2,
      },
      {
        key: "divisionalHead",
        label: "Divisional Head",
        y: startY + verticalGap * 3,
      },

      {
        key: "groupHead",
        label: "Group Head",
        y: startY + verticalGap * 4,
      },

      {
        key: "appraisalCommittee",
        label: "Appraisal Committee",
        y: startY + verticalGap * 5,
      },
    ];

    // Draw each level
    levels.forEach((level, index) => {
      const headerKey = mappings[level.key];
      const value = headerKey ? data[headerKey] || "N/A" : "Not mapped";
      const isActive: any = headerKey && data[headerKey];

      // Draw node
      drawNode(
        ctx,
        centerX,
        level.y,
        boxWidth,
        boxHeight,
        level.label,
        value,
        index === 0, // First node is always highlighted
        isActive
      );

      // Draw connecting arrow to next level if not the last level
      if (index < levels.length - 1) {
        drawConnectingArrow(
          ctx,
          centerX,
          level.y + boxHeight / 2,
          centerX,
          levels[index + 1].y - boxHeight / 2
        );
      }
    });
  };

  const drawNode = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
    value: string,
    isMain = false,
    isActive = true
  ) => {
    // Draw box
    ctx.fillStyle = isMain ? "#f0f9ff" : isActive ? "#f8fafc" : "#f1f5f9";
    ctx.strokeStyle = isMain ? "#0ea5e9" : isActive ? "#64748b" : "#cbd5e1";
    ctx.lineWidth = 2;

    // Draw rounded rectangle
    const radius = 8;
    ctx.beginPath();
    ctx.moveTo(x - width / 2 + radius, y - height / 2);
    ctx.lineTo(x + width / 2 - radius, y - height / 2);
    ctx.quadraticCurveTo(
      x + width / 2,
      y - height / 2,
      x + width / 2,
      y - height / 2 + radius
    );
    ctx.lineTo(x + width / 2, y + height / 2 - radius);
    ctx.quadraticCurveTo(
      x + width / 2,
      y + height / 2,
      x + width / 2 - radius,
      y + height / 2
    );
    ctx.lineTo(x - width / 2 + radius, y + height / 2);
    ctx.quadraticCurveTo(
      x - width / 2,
      y + height / 2,
      x - width / 2,
      y + height / 2 - radius
    );
    ctx.lineTo(x - width / 2, y - height / 2 + radius);
    ctx.quadraticCurveTo(
      x - width / 2,
      y - height / 2,
      x - width / 2 + radius,
      y - height / 2
    );
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    // Draw label text
    ctx.fillStyle = isMain ? "#0369a1" : isActive ? "#334155" : "#94a3b8";
    ctx.font = "bold 14px Arial";
    ctx.fillText(label, x, y - 15);

    // Draw value
    ctx.fillStyle = isActive ? "#1e293b" : "#94a3b8";
    ctx.font = "14px Arial";
    ctx.fillText(value, x, y + 15);
  };

  const drawConnectingArrow = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    const arrowSize = 10;

    // Draw line
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY - arrowSize);
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw arrow head
    ctx.beginPath();
    ctx.moveTo(endX - arrowSize, endY - arrowSize);
    ctx.lineTo(endX, endY);
    ctx.lineTo(endX + arrowSize, endY - arrowSize);
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  return (
    <div className="w-full overflow-auto">
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ minHeight: "650px" }}
      />
    </div>
  );
}

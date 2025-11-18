"use client";

import React from "react";
import CountUp from "react-countup";

interface ScorecardRingProgressProps {
  score: number;
  total: number;
  label: string;
  size?: number;
  strokeWidth?: number;
}

export default function ScorecardRingProgress({
  score,
  total,
  label,
  size = 120,
  strokeWidth = 10,
}: ScorecardRingProgressProps) {
  const percentage = (score / total) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center ">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress circle */}
          <circle
            className={`${
              score > 20
                ? "text-red-600"
                : score > 50
                ? "text-yellow-600"
                : score > 80
                ? "text-lime-800"
                : "text-rose-600"
            } transition-all duration-1000 ease-in-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold">
            <CountUp end={score} delay={1} />
          </span>
          <span className="text-sm text-gray-500">out of {total}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-600">{label}</span>
    </div>
  );
}

"use client";

interface OrgChartProps {
  data: any[];
  selectedRow: number;
  headers: string[];
}

export default function OrgChart({
  data,
  selectedRow,
  headers,
}: OrgChartProps) {
  const rowData = data[selectedRow] || {};

  return (
    <div>
      {headers.map((header) => (
        <div key={header}>
          <strong>{header}:</strong> {rowData[header] || "N/A"}
        </div>
      ))}
    </div>
  );
}

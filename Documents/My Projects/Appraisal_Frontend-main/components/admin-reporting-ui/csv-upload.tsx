"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileUp, Database, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface CsvUploadProps {
  onDataLoaded: (data: any[], headers: string[]) => void;
  onSaveToDatabase: (data: any[], headers: string[]) => void;
  onLoadFromDatabase: () => void;
  hasExistingData: boolean;
}

export default function CsvUpload({
  onDataLoaded,
  onSaveToDatabase,
  onLoadFromDatabase,
  hasExistingData,
}: CsvUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingToDb, setUploadingToDb] = useState(false);
  const { toast } = useToast();

  const parseCSV = (text: string) => {
    try {
      setLoading(true);
      setError(null);

      // Split the text into rows
      const rows = text.split("\n").filter((row) => row.trim() !== "");

      // Extract headers from the first row
      const headers = rows[0].split(",").map((header) => header.trim());

      // Parse the data rows
      const data = rows.slice(1).map((row) => {
        const values = row.split(",").map((value) => value.trim());
        const rowData: Record<string, string> = {};

        headers.forEach((header, index) => {
          rowData[header] = values[index] || "";
        });

        return rowData;
      });

      onDataLoaded(data, headers);
    } catch (err) {
      setError(
        "Failed to parse CSV file. Please check the format and try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        parseCSV(text);
      }
    };
    reader.readAsText(file);
  };

  const handleSaveToDatabase = () => {
    setUploadingToDb(true);

    // Simulate database upload with a delay
    setTimeout(() => {
      try {
        // Get current data from localStorage
        const storedData = localStorage.getItem("csvData");
        const storedHeaders = localStorage.getItem("csvHeaders");

        if (storedData && storedHeaders) {
          const data = JSON.parse(storedData);
          const headers = JSON.parse(storedHeaders);

          // Save to database (simulated with localStorage)
          onSaveToDatabase(data, headers);

          toast({
            title: "Upload Complete",
            description: `Successfully uploaded ${data.length} records to the database.`,
            duration: 5000,
          });
        } else {
          toast({
            title: "Upload Failed",
            description:
              "No data available to upload. Please load a CSV file first.",
            variant: "destructive",
            duration: 5000,
          });
        }
      } catch (err) {
        toast({
          title: "Upload Failed",
          description: "An error occurred while uploading to the database.",
          variant: "destructive",
          duration: 5000,
        });
        console.error(err);
      } finally {
        setUploadingToDb(false);
      }
    }, 1500); // Simulate network delay
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="max-w-sm"
            id="csv-upload"
          />
          <label htmlFor="csv-upload">
            <Button disabled={loading} className="cursor-pointer">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4 animate-pulse" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FileUp className="h-4 w-4" />
                  Upload CSV
                </span>
              )}
            </Button>
          </label>
        </div>

        <Button
          variant="outline"
          onClick={handleSaveToDatabase}
          disabled={uploadingToDb || loading}
          className="flex items-center gap-2"
        >
          {uploadingToDb ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Database className="h-4 w-4" />
              Save to Database
            </>
          )}
        </Button>

        {hasExistingData && (
          <Button
            variant="secondary"
            onClick={onLoadFromDatabase}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Load Existing Records
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

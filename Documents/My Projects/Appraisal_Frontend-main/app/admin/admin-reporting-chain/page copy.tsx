"use client";

import { useState, useEffect } from "react";
import CsvUpload from "@/components/admin-reporting-ui/csv-upload";
import DataTable from "@/components/admin-reporting-ui/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrgChart from "@/components/admin-reporting-ui/org-chart";
import OrgChartDialog from "@/components/admin-reporting-ui/org-chart-dialog";
import NameEditorDialog from "@/components/admin-reporting-ui/name-editor-dialog";

// Define a type for our data structure
interface DataRow {
  [key: string]: string | string[];
  _additionalNames?: any;
}

export default function Home() {
  const [data, setData] = useState<DataRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [showOrgChart, setShowOrgChart] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showHierarchicalChart, setShowHierarchicalChart] = useState(false);
  const [hasExistingData, setHasExistingData] = useState(false);
  const [dataSource, setDataSource] = useState<"csv" | "database">("csv");
  const [isUpdatingDb, setIsUpdatingDb] = useState(false);
  const [emailField, setEmailField] = useState<string | null>(null);
  const [showNameEditor, setShowNameEditor] = useState(false);
  const [nameEditorEmail, setNameEditorEmail] = useState<string>("");
  // Store custom options for each column
  const [customOptions, setCustomOptions] = useState<Record<string, string[]>>(
    {}
  );
  const { toast } = useToast();

  // Check for existing data in the database on component mount
  useEffect(() => {
    checkExistingData();
  }, []);

  // Initialize custom options when headers change
  useEffect(() => {
    if (headers.length > 0) {
      const options: Record<string, string[]> = {};

      // Initialize empty arrays for each header
      headers.forEach((header) => {
        options[header] = [];
      });

      // Try to load custom options from localStorage
      try {
        const savedOptions = localStorage.getItem("customOptions");
        if (savedOptions) {
          const parsedOptions = JSON.parse(savedOptions);
          Object.keys(parsedOptions).forEach((key) => {
            if (headers.includes(key)) {
              options[key] = parsedOptions[key];
            }
          });
        }
      } catch (error) {
        console.error("Error loading custom options:", error);
      }

      setCustomOptions(options);
    }
  }, [headers]);

  // Detect email field from headers
  useEffect(() => {
    if (headers.length > 0) {
      // Try to find an email field in the headers
      const emailHeader = headers.find(
        (header) =>
          header.toLowerCase().includes("email") ||
          header.toLowerCase() === "user" ||
          header.toLowerCase() === "user_email"
      );

      if (emailHeader) {
        setEmailField(emailHeader);
      } else {
        // If no email field is found, use the first column as the index
        setEmailField(headers[0]);
        toast({
          title: "No Email Field Detected",
          description: `Using "${headers[0]}" as the index field. For best results, include an email column in your CSV.`,
          duration: 5000,
        });
      }
    }
  }, [headers, toast]);

  const checkExistingData = () => {
    try {
      // Check if data exists in localStorage (simulating database)
      const dbData = localStorage.getItem("dbData");
      const dbHeaders = localStorage.getItem("dbHeaders");

      if (dbData && dbHeaders) {
        setHasExistingData(true);
      } else {
        setHasExistingData(false);
      }
    } catch (error) {
      console.error("Error checking for existing data:", error);
      setHasExistingData(false);
    }
  };

  const handleDataLoaded = (parsedData: any[], headers: string[]) => {
    // Ensure each row has an _additionalNames property
    const enhancedData = parsedData.map((row) => ({
      ...row,
      _additionalNames: row._additionalNames || [],
    }));

    setData(enhancedData);
    setHeaders(headers);
    setSelectedEmail(null);
    setShowOrgChart(false);
    setShowHierarchicalChart(false);
    setDataSource("csv");

    // Store in localStorage for potential database upload
    localStorage.setItem("csvData", JSON.stringify(enhancedData));
    localStorage.setItem("csvHeaders", JSON.stringify(headers));

    toast({
      title: "CSV Loaded",
      description: `Successfully loaded ${enhancedData.length} records from CSV.`,
      duration: 3000,
    });
  };

  const handleSaveToDatabase = (data: any[], headers: string[]) => {
    try {
      console.log(data);
      // Simulate saving to database using localStorage
      localStorage.setItem("dbData", JSON.stringify(data));
      localStorage.setItem("dbHeaders", JSON.stringify(headers));
      setHasExistingData(true);
    } catch (error) {
      console.error("Error saving to database:", error);
      toast({
        title: "Database Error",
        description: "Failed to save data to the database.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleLoadFromDatabase = () => {
    try {
      // Load data from localStorage (simulating database)
      const dbData = localStorage.getItem("dbData");
      const dbHeaders = localStorage.getItem("dbHeaders");

      if (dbData && dbHeaders) {
        const parsedData = JSON.parse(dbData);
        const parsedHeaders = JSON.parse(dbHeaders);

        // Ensure each row has an _additionalNames property
        const enhancedData = parsedData.map((row: DataRow) => ({
          ...row,
          _additionalNames: row._additionalNames || [],
        }));

        setData(enhancedData);
        setHeaders(parsedHeaders);
        setSelectedEmail(null);
        setShowOrgChart(false);
        setShowHierarchicalChart(false);
        setDataSource("database");

        toast({
          title: "Database Records Loaded",
          description: `Successfully loaded ${enhancedData.length} records from the database.`,
          duration: 3000,
        });
      } else {
        toast({
          title: "No Records Found",
          description: "No records found in the database.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error loading from database:", error);
      toast({
        title: "Database Error",
        description: "Failed to load data from the database.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const updateDatabase = (updatedData: DataRow[]) => {
    setIsUpdatingDb(true);

    // Simulate a brief delay for database update
    setTimeout(() => {
      try {
        // Update database (simulated with localStorage)
        localStorage.setItem("dbData", JSON.stringify(updatedData));
        localStorage.setItem("dbHeaders", JSON.stringify(headers));
        setHasExistingData(true);

        toast({
          title: "Database Updated",
          description: "Record updated successfully in the database.",
          duration: 2000,
        });
      } catch (error) {
        console.error("Error updating database:", error);
        toast({
          title: "Update Failed",
          description: "Failed to update the database record.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsUpdatingDb(false);
      }
    }, 300); // Small delay to simulate network request
  };

  const handleRowUpdate = (
    email: string,
    columnName: string,
    value: string
  ) => {
    if (!emailField) return;

    const updatedData = [...data];
    const rowIndex = data.findIndex((row) => row[emailField] === email);

    if (rowIndex !== -1) {
      updatedData[rowIndex][columnName] = value;
      setData(updatedData);

      // Always update both local storage and database regardless of source
      localStorage.setItem("csvData", JSON.stringify(updatedData));

      // Update the database immediately on any change
      updateDatabase(updatedData);
    }
  };

  const handleCreateOption = (columnName: string, value: string) => {
    if (!columnName || !value.trim()) return;

    // Add to custom options if it doesn't already exist
    setCustomOptions((prev) => {
      const updated = { ...prev };
      if (!updated[columnName]) {
        updated[columnName] = [];
      }

      // Only add if it doesn't already exist
      if (!updated[columnName].includes(value.trim())) {
        updated[columnName] = [...updated[columnName], value.trim()];
      }

      // Save to localStorage
      try {
        localStorage.setItem("customOptions", JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving custom options:", error);
      }

      return updated;
    });

    toast({
      title: "Option Added",
      description: `Added "${value}" as a new option for ${columnName}.`,
      duration: 3000,
    });
  };

  const handleAddOptionsList = (columnName: string, options: string[]) => {
    if (!columnName || options.length === 0) return;

    // Add multiple options at once
    setCustomOptions((prev) => {
      const updated = { ...prev };
      if (!updated[columnName]) {
        updated[columnName] = [];
      }

      // Filter out duplicates and add new options
      const newOptions = options.filter(
        (option) => !updated[columnName].includes(option)
      );
      if (newOptions.length > 0) {
        updated[columnName] = [...updated[columnName], ...newOptions];
      }

      // Save to localStorage
      try {
        localStorage.setItem("customOptions", JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving custom options:", error);
      }

      return updated;
    });

    toast({
      title: "Options Added",
      description: `Added ${options.length} new options for ${columnName}.`,
      duration: 3000,
    });
  };

  const handleViewOrgChart = (email: string) => {
    setSelectedEmail(email);
    setShowOrgChart(true);
  };

  const handleViewHierarchicalChart = (email: string) => {
    setSelectedEmail(email);
    setShowHierarchicalChart(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Get the selected row index based on email
  const getSelectedRowIndex = () => {
    if (!selectedEmail || !emailField) return null;
    return data.findIndex((row) => row[emailField] === selectedEmail);
  };

  // Open the name editor for a specific email
  const handleEditNames = (email: string) => {
    setNameEditorEmail(email);
    setShowNameEditor(true);
  };

  // Save additional names for a specific email
  const handleSaveNames = (email: string, names: string[]) => {
    if (!emailField) return;

    const updatedData = [...data];
    const rowIndex = data.findIndex((row) => row[emailField] === email);

    if (rowIndex !== -1) {
      // Update the _additionalNames property
      updatedData[rowIndex]._additionalNames = names;
      setData(updatedData);

      // Update both local storage and database
      localStorage.setItem("csvData", JSON.stringify(updatedData));
      updateDatabase(updatedData);

      toast({
        title: "Names Updated",
        description: `Successfully updated additional names for ${email}.`,
        duration: 3000,
      });
    }
  };

  // Get additional names for a specific email
  const getAdditionalNames = (email: string): string[] => {
    if (!emailField) return [];

    const row = data.find((row) => row[emailField] === email);
    return row?._additionalNames || [];
  };

  const getAllOptions = (columnName: string): string[] => {
    // Get unique values from data
    const dataValues = new Set<string>();
    data.forEach((row) => {
      if (row[columnName]) {
        dataValues.add(row[columnName] as string);
      }
    });

    // Combine with custom options
    const customValues = customOptions[columnName] || [];
    const allOptions = [...Array.from(dataValues), ...customValues]
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
      .sort();

    return allOptions;
  };

  return (
    <main className="container mx-auto py-10 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>CSV Data Viewer & Organization Chart</CardTitle>
          <CardDescription>
            Upload a CSV file to view, edit, and visualize data in an
            organization chart
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CsvUpload
            onDataLoaded={handleDataLoaded}
            onSaveToDatabase={handleSaveToDatabase}
            onLoadFromDatabase={handleLoadFromDatabase}
            hasExistingData={hasExistingData}
          />

          {dataSource === "database" && data.length > 0 && (
            <Alert className="mt-4 bg-blue-50">
              <Database className="h-4 w-4" />
              <AlertDescription>
                Currently viewing data from the database. {data.length} records
                loaded.
              </AlertDescription>
            </Alert>
          )}

          {emailField && (
            <Alert className="mt-4 bg-green-50">
              <AlertDescription>
                Using <strong>{emailField}</strong> as the index field for the
                data table.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {data.length > 0 && emailField && (
        <DataTable
          data={data}
          headers={headers}
          emailField={emailField}
          onRowUpdate={handleRowUpdate}
          onViewOrgChart={handleViewOrgChart}
          onViewHierarchicalChart={handleViewHierarchicalChart}
          selectedEmail={selectedEmail}
          showOrgChart={showOrgChart}
          setShowOrgChart={setShowOrgChart}
          showHierarchicalChart={showHierarchicalChart}
          setShowHierarchicalChart={setShowHierarchicalChart}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          isUpdatingDb={isUpdatingDb}
          onEditNames={handleEditNames}
          getAdditionalNames={getAdditionalNames}
          getAllOptions={getAllOptions}
          onCreateOption={handleCreateOption}
          onAddOptionsList={handleAddOptionsList}
        />
      )}

      {showOrgChart && selectedEmail !== null && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Organization Chart for {selectedEmail}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOrgChart(false)}
              >
                Close
              </Button>
            </div>
            <OrgChart
              data={data}
              selectedRow={getSelectedRowIndex() || 0}
              headers={headers}
            />
          </CardContent>
        </Card>
      )}

      {selectedEmail !== null && (
        <OrgChartDialog
          isOpen={showHierarchicalChart}
          onClose={() => setShowHierarchicalChart(false)}
          data={data}
          selectedRow={getSelectedRowIndex() || 0}
          headers={headers}
        />
      )}

      <NameEditorDialog
        isOpen={showNameEditor}
        onClose={() => setShowNameEditor(false)}
        email={nameEditorEmail}
        currentNames={getAdditionalNames(nameEditorEmail)}
        onSave={handleSaveNames}
      />
    </main>
  );
}

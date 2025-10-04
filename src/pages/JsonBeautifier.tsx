import { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showSuccess, showError } from "@/utils/toast";
import { Copy, Trash2, Download, Zap } from "lucide-react";
import JsonSyntaxHighlighter from "@/components/JsonSyntaxHighlighter";

const JsonBeautifier = () => {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");

  const handleBeautify = () => {
    if (!inputJson.trim()) {
      showError("Input JSON tidak boleh kosong.");
      return;
    }
    try {
      const parsedJson = JSON.parse(inputJson);
      const beautifiedJson = JSON.stringify(parsedJson, null, 2);
      setOutputJson(beautifiedJson);
      showSuccess("JSON berhasil dipercantik!");
    } catch (error) {
      setOutputJson("");
      showError("Format JSON tidak valid. Silakan periksa kembali.");
    }
  };

  const handleMinify = () => {
    if (!inputJson.trim()) {
      showError("Input JSON tidak boleh kosong.");
      return;
    }
    try {
      const parsedJson = JSON.parse(inputJson);
      const minifiedJson = JSON.stringify(parsedJson);
      setOutputJson(minifiedJson);
      showSuccess("JSON berhasil diminify!");
    } catch (error) {
      setOutputJson("");
      showError("Format JSON tidak valid. Silakan periksa kembali.");
    }
  };

  const handleCopy = () => {
    if (!outputJson) {
      showError("Tidak ada output untuk disalin.");
      return;
    }
    navigator.clipboard.writeText(outputJson);
    showSuccess("Output JSON berhasil disalin ke clipboard!");
  };

  const handleClear = () => {
    setInputJson("");
    setOutputJson("");
  };

  const handleDownload = (format: "json" | "csv" | "xlsx") => {
    if (!outputJson) {
      showError("Tidak ada output untuk diunduh.");
      return;
    }

    let parsedJson;
    try {
      parsedJson = JSON.parse(outputJson);
    } catch (e) {
      showError("JSON tidak valid untuk konversi.");
      return;
    }

    if (format === "json") {
      const blob = new Blob([outputJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "beautified.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showSuccess("File JSON berhasil diunduh!");
    } else if (format === "csv" || format === "xlsx") {
      if (!Array.isArray(parsedJson) || parsedJson.length === 0) {
        showError(`Hanya JSON berbentuk array objek yang bisa dikonversi ke ${format.toUpperCase()}.`);
        return;
      }

      if (format === "csv") {
        const headers = Object.keys(parsedJson[0]);
        const csvRows = [
          headers.join(","),
          ...parsedJson.map((row) =>
            headers
              .map((header) => JSON.stringify(row[header], (_, value) => (value === null ? "" : value)))
              .join(",")
          ),
        ];
        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        a.click();
        URL.revokeObjectURL(url);
        showSuccess("File CSV berhasil diunduh!");
      } else { // xlsx
        const worksheet = XLSX.utils.json_to_sheet(parsedJson);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, "data.xlsx");
        showSuccess("File XLSX berhasil diunduh!");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col min-h-screen">
      <main className="flex-grow">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">JSON Beautifier & Minifier</h1>
          <p className="text-muted-foreground mt-2">
            Tempel JSON Anda untuk memformat, meringkas, dan mengonversinya.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Input JSON</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Tempel JSON Anda di sini..."
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Output</CardTitle>
              {outputJson && (
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Salin</span>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-md p-4 min-h-[400px] overflow-auto">
                <JsonSyntaxHighlighter jsonString={outputJson} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center items-center flex-wrap gap-4 mt-8">
          <Button onClick={handleBeautify} size="lg">
            Per-cantik JSON
          </Button>
          <Button onClick={handleMinify} size="lg" variant="outline">
            <Zap className="mr-2 h-4 w-4" />
            Minify JSON
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" disabled={!outputJson}>
                <Download className="mr-2 h-4 w-4" />
                Unduh
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => handleDownload("json")}>JSON</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleDownload("csv")}>CSV</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleDownload("xlsx")}>XLSX</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleClear} variant="destructive" size="lg">
            <Trash2 className="mr-2 h-4 w-4" />
            Bersihkan
          </Button>
        </div>
      </main>
      <footer className="mt-auto pt-8 text-center text-sm text-muted-foreground">
        <p>JSON Beautifier & Minifier Tool</p>
      </footer>
    </div>
  );
};

export default JsonBeautifier;
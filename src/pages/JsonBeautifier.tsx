import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";
import { Copy, Trash2 } from "lucide-react";
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

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">JSON Beautifier</h1>
        <p className="text-muted-foreground mt-2">
          Tempel JSON mentah Anda di bawah ini untuk memformatnya agar mudah dibaca.
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
            <CardTitle>Output yang Dipercantik</CardTitle>
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

      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={handleBeautify} size="lg">
          Per-cantik JSON
        </Button>
        <Button onClick={handleClear} variant="destructive" size="lg">
          <Trash2 className="mr-2 h-4 w-4" />
          Bersihkan
        </Button>
      </div>
    </div>
  );
};

export default JsonBeautifier;
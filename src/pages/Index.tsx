import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">JSON Tools Suite</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Koleksi alat sederhana dan efisien untuk membantu pekerjaan Anda dengan data JSON.
        </p>
      </div>

      <div className="w-full max-w-md">
        <Link to="/json-beautifier" className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
          <Card className="hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                <Code className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>JSON Beautifier</CardTitle>
                <CardDescription>Format dan percantik teks JSON Anda agar mudah dibaca.</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <div className="absolute bottom-4">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Database } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Database className="h-16 w-16 text-blue-600" />
          </div>

          <CardTitle className="text-3xl">
            Download PUBS Database
          </CardTitle>

          <p className="text-muted-foreground mt-2">
            Click the button below to download the PUBS sample database SQL
            script.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          <div className="w-full rounded-lg border bg-slate-50 p-4">
            <h3 className="font-semibold mb-2">Database Information</h3>

            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li>File Name: <strong>download.pubs.sql</strong></li>
              <li>Format: SQL Script</li>
              <li>Database: PUBS Sample Database</li>
              <li>Ready to import into MySQL / SQL Server (as applicable)</li>
            </ul>
          </div>

          <Button size="lg" asChild>
            <a href="/download.pubs.sql" download="PUBS_Database.sql">
              <Download className="mr-2 h-5 w-5" />
              Download Database
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
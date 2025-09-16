import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorDisplayProps {
  message?: string;
  title?: string;
}

export const ErrorDisplay = ({
  message = "An unexpected error occurred.",
  title = "Error",
}: ErrorDisplayProps) => {
  return (
    <Alert variant="destructive" className="w-full max-w-lg mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
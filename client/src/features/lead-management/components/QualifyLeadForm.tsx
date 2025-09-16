import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QualifyLeadPayload, qualifyLeadRequestSchema } from "@/lib/validators";
import { useQualifyLead } from "@/api/leads";
import { cn } from "@/lib/utils";
import { DialogFooter } from "@/components/ui/dialog";

interface QualifyLeadFormProps {
  leadId: string;
  currentStatus: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const QualifyLeadForm = ({ leadId, currentStatus, onSuccess, onCancel }: QualifyLeadFormProps) => {
  const qualifyLeadMutation = useQualifyLead();

  const form = useForm<QualifyLeadPayload>({
    resolver: zodResolver(qualifyLeadRequestSchema),
    defaultValues: {
      id: leadId,
      status: "Qualified", // Default to Qualified as per OpenAPI example
      qualificationNotes: "",
      budgetEstimate: "",
      nextSteps: "",
      qualificationDate: format(new Date(), "yyyy-MM-dd"), // Default to today
    },
  });

  const onSubmit = (values: QualifyLeadPayload) => {
    qualifyLeadMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead ID</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Unqualified">Unqualified</SelectItem>
                    <SelectItem value="Disqualified">Disqualified</SelectItem>
                    {/* Add other relevant statuses if known */}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qualificationNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qualification Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Details about lead qualification..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budgetEstimate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Estimate</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 50000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nextSteps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Next Steps</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Schedule demo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qualificationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Qualification Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-6">
          <Button type="button" variant="outline" onClick={onCancel} disabled={qualifyLeadMutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={qualifyLeadMutation.isPending}>
            {qualifyLeadMutation.isPending ? "Qualifying..." : "Qualify Lead"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
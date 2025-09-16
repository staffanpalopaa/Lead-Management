import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { ConvertLeadPayload, convertLeadRequestSchema } from "@/lib/validators";
import { useConvertLead } from "@/api/leads";
import { DialogFooter } from "@/components/ui/dialog";

interface ConvertLeadFormProps {
  leadId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ConvertLeadForm = ({ leadId, onSuccess, onCancel }: ConvertLeadFormProps) => {
  const convertLeadMutation = useConvertLead();

  const form = useForm<ConvertLeadPayload>({
    resolver: zodResolver(convertLeadRequestSchema),
    defaultValues: {
      id: leadId,
      accountId: "",
      contactId: "",
      opportunityName: "",
      conversionNotes: "",
      convertedBy: "",
    },
  });

  const onSubmit = (values: ConvertLeadPayload) => {
    convertLeadMutation.mutate(values, {
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
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account ID</FormLabel>
              <FormControl>
                <Input placeholder="ACC-001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact ID</FormLabel>
              <FormControl>
                <Input placeholder="C-501" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="opportunityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opportunity Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Platform Upgrade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conversionNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conversion Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Notes about the conversion process..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="convertedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Converted By</FormLabel>
              <FormControl>
                <Input placeholder="SalesRep-12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-6">
          <Button type="button" variant="outline" onClick={onCancel} disabled={convertLeadMutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={convertLeadMutation.isPending}>
            {convertLeadMutation.isPending ? "Converting..." : "Convert Lead"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
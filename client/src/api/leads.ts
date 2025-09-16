import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Lead,
  CreateLeadPayload,
  QualifyLeadPayload,
  ConvertLeadPayload,
} from "@/lib/validators";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const LEAD_QUERY_KEY = ["leads"];

export const useGetAllLeads = () => {
  return useQuery<Lead[]>({
    queryKey: LEAD_QUERY_KEY,
    queryFn: () => api.get("/get-all-leads"),
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (newLead: CreateLeadPayload) => api.post<Lead>("/create-lead", newLead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEAD_QUERY_KEY });
      toast({
        title: "Success",
        description: "Lead created successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create lead: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useQualifyLead = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (leadData: QualifyLeadPayload) =>
      api.post<Lead>("/qualify-lead", leadData),
    onSuccess: (updatedLead) => {
      queryClient.invalidateQueries({ queryKey: LEAD_QUERY_KEY });
      toast({
        title: "Success",
        description: `Lead '${updatedLead.id}' qualified successfully.`,
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to qualify lead: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useConvertLead = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (leadData: ConvertLeadPayload) =>
      api.post<Lead>("/convert-lead", leadData),
    onSuccess: (updatedLead) => {
      queryClient.invalidateQueries({ queryKey: LEAD_QUERY_KEY });
      toast({
        title: "Success",
        description: `Lead '${updatedLead.id}' converted successfully.`,
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to convert lead: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};
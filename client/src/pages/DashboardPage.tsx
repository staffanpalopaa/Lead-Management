import { useState } from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorDisplay } from "@/components/shared/ErrorDisplay";
import { useGetAllLeads } from "@/api/leads";
import { LeadDataTable } from "@/features/lead-management/components/LeadDataTable";
import { CreateLeadForm } from "@/features/lead-management/components/CreateLeadForm";

const DashboardPage = () => {
  const { data: leads, isLoading, isError, error } = useGetAllLeads();
  const [isCreateLeadDialogOpen, setIsCreateLeadDialogOpen] = useState(false);

  const handleCreateLeadSuccess = () => {
    setIsCreateLeadDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader
          title="Lead Management Dashboard"
          description="View and manage all your sales leads."
          className="pb-0" // Override default padding to fit with actions
        />
        <Button onClick={() => setIsCreateLeadDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Lead
        </Button>
      </div>

      <div className="mt-8">
        {isLoading && <LoadingSpinner />}
        {isError && <ErrorDisplay message={error?.message || "Failed to load leads."} />}
        {!isLoading && !isError && leads && (
          <LeadDataTable data={leads} />
        )}
      </div>

      <Dialog open={isCreateLeadDialogOpen} onOpenChange={setIsCreateLeadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Lead</DialogTitle>
            <DialogDescription>
              Enter the details for a new lead to add to your system.
            </DialogDescription>
          </DialogHeader>
          <CreateLeadForm
            onSuccess={handleCreateLeadSuccess}
            onCancel={() => setIsCreateLeadDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
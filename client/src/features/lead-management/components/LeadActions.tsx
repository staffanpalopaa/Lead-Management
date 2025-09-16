import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Lead } from "@/lib/validators";
import { QualifyLeadForm } from "./QualifyLeadForm";
import { ConvertLeadForm } from "./ConvertLeadForm";

interface LeadActionsProps {
  lead: Lead;
}

export const LeadActions = ({ lead }: LeadActionsProps) => {
  const [isQualifyOpen, setIsQualifyOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);

  const handleQualifySuccess = () => {
    setIsQualifyOpen(false);
  };

  const handleConvertSuccess = () => {
    setIsConvertOpen(false);
  };

  const isQualifiable = lead.status !== "Qualified" && lead.status !== "Converted" && lead.status !== "Disqualified";
  const isConvertible = lead.status === "Qualified" && lead.accountId === undefined; // Can only convert a qualified lead, if not already converted

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(lead.id)}
            className="cursor-pointer"
          >
            Copy Lead ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isQualifiable && (
            <DropdownMenuItem
              onClick={() => setIsQualifyOpen(true)}
              className="cursor-pointer"
            >
              Qualify Lead
            </DropdownMenuItem>
          )}
          {isConvertible && (
            <DropdownMenuItem
              onClick={() => setIsConvertOpen(true)}
              className="cursor-pointer"
            >
              Convert Lead
            </DropdownMenuItem>
          )}
          {/* Add more actions here if needed */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Qualify Lead Dialog */}
      <Dialog open={isQualifyOpen} onOpenChange={setIsQualifyOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Qualify Lead</DialogTitle>
            <DialogDescription>
              Update the qualification status and details for lead {lead.id}.
            </DialogDescription>
          </DialogHeader>
          <QualifyLeadForm
            leadId={lead.id}
            currentStatus={lead.status}
            onSuccess={handleQualifySuccess}
            onCancel={() => setIsQualifyOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Convert Lead Dialog */}
      <Dialog open={isConvertOpen} onOpenChange={setIsConvertOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Convert Lead</DialogTitle>
            <DialogDescription>
              Convert lead {lead.id} into an Account, Contact, and Opportunity.
            </DialogDescription>
          </DialogHeader>
          <ConvertLeadForm
            leadId={lead.id}
            onSuccess={handleConvertSuccess}
            onCancel={() => setIsConvertOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
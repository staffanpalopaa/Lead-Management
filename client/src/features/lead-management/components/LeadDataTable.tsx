import { Lead } from "@/lib/validators";
import { DataTable, ColumnDef } from "@/components/shared/DataTable";
import { LeadActions } from "./LeadActions";
import { Badge } from "@/components/ui/badge";

export const LeadDataTable = ({ data }: { data: Lead[] }) => {
  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="font-mono text-xs text-muted-foreground">{row.id}</div>,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "companyName",
      header: "Company",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.status;
        let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
        if (status === "Qualified") variant = "default";
        if (status === "Converted") variant = "outline";
        if (status === "Disqualified") variant = "destructive";
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <LeadActions lead={row} />,
    },
  ];

  return <DataTable columns={columns} data={data} emptyMessage="No leads found." />;
};
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Define a simple ColumnDef type, similar to @tanstack/react-table for convenience
export interface ColumnDef<TData, TValue = unknown> {
  id?: string;
  header: React.ReactNode | ((props: { column: ColumnDef<TData, TValue> }) => React.ReactNode);
  cell: React.ReactNode | ((props: { row: TData; value: TValue }) => React.ReactNode);
  accessorKey?: keyof TData | string; // For simple access, or use a custom cell renderer
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyMessage?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = "No data found.",
}: DataTableProps<TData, TValue>) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, colIndex) => (
              <TableHead key={column.id || `header-${colIndex}`}>
                {typeof column.header === "function"
                  ? column.header({ column })
                  : column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length ? (
            data.map((row, rowIndex) => (
              <TableRow key={`row-${rowIndex}`} data-state={cn({ "selected": false })}>
                {columns.map((column, colIndex) => (
                  <TableCell key={column.id || `cell-${rowIndex}-${colIndex}`}>
                    {typeof column.cell === "function"
                      ? column.cell({
                          row,
                          // Attempt to get value if accessorKey is provided
                          value: column.accessorKey
                            ? (row as any)[column.accessorKey]
                            : undefined,
                        })
                      : column.cell}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Search } from "@/components/search";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "./ui/card";

export type Note = {
  id: string;
  title: string;
  createdAt: string;
  wishlist: boolean;
};

const data: Note[] = [
  { id: "1", title: "Parliament", createdAt: "2023-01-01", wishlist: true },
  {
    id: "2",
    title: "Fundamental Rights",
    createdAt: "2023-01-02",
    wishlist: false,
  },
  { id: "3", title: "Stone Age", createdAt: "2023-01-03", wishlist: true },
  {
    id: "4",
    title: "Bio Life Cycle",
    createdAt: "2023-01-04",
    wishlist: false,
  },
];

export const columns: ColumnDef<Note>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-left">Title</div>,
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
  },
  {
    accessorKey: "wishlist",
    header: () => <div className="text-center">Wishlist</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("wishlist") ? "★" : ""}</div>
    ),
  },
];

export function DataTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl text-left">Notes</CardTitle>
          <div className="flex items-center space-x-4">
            <Search />
          </div>
        </CardHeader>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

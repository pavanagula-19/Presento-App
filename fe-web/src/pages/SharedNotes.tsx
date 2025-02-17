import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Share, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectReceivedNotes,
  selectShareNoteError,
  selectShareNoteLoading,
} from "@/redux/selectors/share-note-selector";
import { selectUserInfo } from "@/redux/selectors/user-selector";
import { fetchNotesRequest } from "@/redux/slices/note-slice";
import { fetchReceivedNotesRequest } from "@/redux/slices/share-note-slice";

export default function SharedNotes() {
  const dispatch = useDispatch();
  const sharedNotes = useSelector(selectReceivedNotes);
  const loading = useSelector(selectShareNoteLoading);
  const error = useSelector(selectShareNoteError);
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchReceivedNotesRequest(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (sharedNotes.length > 0 && user?._id) {
      dispatch(fetchNotesRequest(user._id));
    }
  }, [dispatch, sharedNotes, user]);


  const columns: ColumnDef<any>[] = [
    {
      id: "sno",
      header: "S.No",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "noteId",
      header: "Title",
      cell: ({ row }) => (
        <div className="cursor-pointer">
          {(row.original.noteId?.title)}
        </div>
      ),
    },
    {
      accessorKey: "sharedBy",
      header: "Shared By",
      cell: ({ row }) => <div>{row.original.sharedBy}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const note = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(note.noteId)}
              >
                <Share className="mr-2" />
                Copy Note ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <Trash2 className="mr-2" />
                Delete Note
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: sharedNotes || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input placeholder="Filter Notes..." className="max-w-sm" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Ellipsis,
  MoreHorizontal,
  Share,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import { Spinner } from "@/components/spinner";
import {
  selectNoteError,
  selectNoteLoading,
  selectNotes,
} from "@/redux/selectors/note-selector";
import { selectUserInfo } from "@/redux/selectors/user-selector";
import {
  deleteNoteRequest,
  fetchNotesRequest,
  updateWishlistRequest,
} from "@/redux/slices/note-slice";
import { createSharedNoteRequest } from "@/redux/slices/share-note-slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import NoteDetail from "./NotesDetails";
import SharePopover from "./sharePop";

export type Notes = {
  _id: string;
  wishlist: boolean;
  title: string;
  subject: string;
  content: string;
};

export default function ViewNotes() {
  const dispatch = useDispatch();
  const notes: Notes[] = useSelector(selectNotes);
  const loading = useSelector(selectNoteLoading);
  const error = useSelector(selectNoteError);
  const user = useSelector(selectUserInfo);


  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedNote, setSelectedNote] = useState<Notes | null>(null);


  const [showSharePopover, setShowSharePopover] = useState(false);
  const [noteToShare, setNoteToShare] = useState<string | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEdit = (note: Notes) => {
    setSelectedNote(note);
  };
  useEffect(() => {
    if (notes) {
      setIsLoading(false);
    }
  }, [notes]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchNotesRequest(user.id));
    }
  }, [dispatch, user]);

  const handleDelete = (noteId: string) => {
    if (noteId) {
      setIsLoading(true);
      dispatch(deleteNoteRequest(noteId));
    } else {
      console.error("Note ID is not available");
    }
  };

  const handleShare = (email: string) => {
    if (noteToShare) {
      dispatch(
        createSharedNoteRequest({ noteId: noteToShare, sharedWith: email })
      );
      setShowSharePopover(false);
    }
  };

  const handleCloseSharePopover = () => {
    setShowSharePopover(false);
    setNoteToShare(null);
  };

  const columns: ColumnDef<Notes>[] = [
    {
      id: "sno",
      header: "S.No",
      cell: ({ row }) => <div>{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div
          className="capitalize cursor-pointer text-blue-500"
          onClick={() => handleEdit(row.original)}
        >
          {row.getValue("title")}
        </div>
      ),
    },

    {
      accessorKey: "subject",
      header: ({ column }) => (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject
        </div>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("subject")}</div>
      ),
    },
    {
      accessorKey: "wishlist",
      header: () => <div className="text-right">Wishlist</div>,
      cell: ({ row }) => {
        const isWishlist = row.original.wishlist;
        const toggleWishlist = () => {
          console.log(isWishlist)
          dispatch(
            updateWishlistRequest({
              _id: row.original._id,
              wishlist: isWishlist?false :true,
              title: row.original.title,
              subject: row.original.subject,
              content: row.original.content,
            })
          );
        };

        return (
          <div className="text-right">
            <Button className="bg-white hover:bg-white" onClick={toggleWishlist}>
              {isWishlist ? (
                <Star className="text-yellow-500" />
              ) : (
                <StarOff
                  className="text-black"
                />
              )}
            </Button>
          </div>
        );
      },
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const note = row.original;
    
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0 bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400">
                <MoreHorizontal className="text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-md rounded-md">
              <DropdownMenuLabel className="text-gray-700">Actions</DropdownMenuLabel>
    
              <Popover>
  <PopoverTrigger asChild>
    <Button className="w-full text-left text-black bg-white hover:bg-gray-100 focus:ring-2 focus:ring-gray-300">
      <Share className="mr-2" />
      Share Notes
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-64 p-4 bg-white border border-gray-300 shadow-lg rounded-md z-50">
    <SharePopover
      onClose={() => setNoteToShare(null)}
      onShare={handleShare}
    />
  </PopoverContent>
</Popover>
              <DropdownMenuItem
                onClick={() => setSelectedNote(note)}
                className="hover:bg-gray-100 text-gray-700 cursor-pointer flex items-center gap-2 p-2 rounded-md"
              >
                <Ellipsis />
                <span>View details</span>
              </DropdownMenuItem>
    
              <DropdownMenuSeparator />
    
              <DropdownMenuItem
                className="text-red-500 hover:bg-red-100 cursor-pointer flex items-center gap-2 p-2 rounded-md"
                onClick={() => handleDelete(note._id)}
              >
                <Trash2 />
                Delete Notes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    
  ];

  const table = useReactTable({
    data: notes || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedNote) {
    return (
      <NoteDetail note={selectedNote} onClose={() => setSelectedNote(null)} />
    );
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="w-full">
          {showSharePopover && noteToShare && (
            <SharePopover
              onClose={handleCloseSharePopover}
              onShare={handleShare}
            />
          )}
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter Subjects..."
              value={
                (table.getColumn("subject")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("subject")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div
            className="rounded-md border border-gray-900"
          >
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
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
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

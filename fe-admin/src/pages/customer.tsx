import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Sample Users Data
const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Subscriber",
  },
];

export default function UserManagementTable() {
  const [userList, setUserList] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Handler to view user details
  const handleView = (user: User) => {
    setSelectedUser(user);
    // Implement viewing logic, e.g., navigate to a user detail page or open a modal
    alert(`Viewing details for ${user.name}`);
  };

  // Handler to delete a user
  const handleDelete = (userId: string) => {
    // Implement deletion logic, e.g., API call to delete the user
    const updatedUsers = userList.filter((user) => user.id !== userId);
    setUserList(updatedUsers);
    toast.success("User deleted successfully.");
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <Table>
        <TableCaption>A list of your registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleView(user)}
                >
                  View
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setUserToDelete(user)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* Optional: Table Footer */}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-right font-semibold">
              Total Users
            </TableCell>
            <TableCell className="text-right">{userList.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Delete Confirmation Dialog */}
      {userToDelete && (
        <Dialog
          open={!!userToDelete}
          onOpenChange={() => setUserToDelete(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{userToDelete.name}</span>? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setUserToDelete(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  handleDelete(userToDelete.id);
                  setUserToDelete(null);
                }}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

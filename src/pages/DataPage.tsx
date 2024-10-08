import { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const initialData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User' },
];

export function DataPage() {
  const [data, setData] = useState<User[]>(initialData);
  const { toast } = useToast();

  const columns = [
    { accessor: 'name', header: 'Name' },
    { accessor: 'email', header: 'Email' },
    { accessor: 'role', header: 'Role' },
  ];

  const handleEdit = (user: User) => {
    toast({
      title: "Edit User",
      description: `Editing ${user.name}`,
    });
    // Implement edit logic here
  };

  const handleDelete = (user: User) => {
    setData(data.filter(item => item.id !== user.id));
    toast({
      title: "User Deleted",
      description: `${user.name} has been removed.`,
      variant: "destructive",
    });
  };

  const handleCreate = () => {
    toast({
      title: "Create User",
      description: "Creating a new user",
    });
    // Implement create logic here
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Data</h1>
      <DataTable
        data={data}
        columns={columns}
        pageSize={5}
        selectionMode="multiple"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />
    </div>
  );
}
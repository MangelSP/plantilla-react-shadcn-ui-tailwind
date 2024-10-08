import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface DataTableProps<T> {
  data: T[];
  columns: {
    accessor: keyof T;
    header: string;
    cell?: (value: any) => React.ReactNode;
  }[];
  pageSize?: number;
  selectionMode?: 'none' | 'single' | 'multiple';
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onCreate?: () => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  pageSize = 10,
  selectionMode = 'none',
  onEdit,
  onDelete,
  onCreate,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Set<T['id']>>(new Set());
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const sortedData = React.useMemo(() => {
    if (sortColumn) {
      return [...data].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [data, sortColumn, sortDirection]);

  const currentData = sortedData.slice(startIndex, endIndex);

  const handleSort = (column: keyof T) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.size === currentData.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(currentData.map(item => item.id)));
    }
  };

  const handleSelectItem = (id: T['id']) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(id)) {
      newSelectedItems.delete(id);
    } else {
      if (selectionMode === 'single') {
        newSelectedItems.clear();
      }
      newSelectedItems.add(id);
    }
    setSelectedItems(newSelectedItems);
  };

  return (
    <div>
      {onCreate && (
        <div className="mb-4">
          <Button onClick={onCreate}>Create New</Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {selectionMode !== 'none' && (
                <TableHead className="w-[50px]">
                  {selectionMode === 'multiple' && (
                    <Checkbox
                      checked={selectedItems.size === currentData.length}
                      onCheckedChange={handleSelectAll}
                    />
                  )}
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.accessor as string}
                  className="cursor-pointer"
                  onClick={() => handleSort(column.accessor)}
                >
                  {column.header}
                  {sortColumn === column.accessor && (
                    <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </TableHead>
              ))}
              {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((row) => (
              <TableRow key={row.id}>
                {selectionMode !== 'none' && (
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.has(row.id)}
                      onCheckedChange={() => handleSelectItem(row.id)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.accessor as string}>
                    {column.cell
                      ? column.cell(row[column.accessor])
                      : row[column.accessor] as React.ReactNode}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell>
                    {onEdit && <Button onClick={() => onEdit(row)} className="mr-2">Edit</Button>}
                    {onDelete && <Button onClick={() => onDelete(row)} variant="destructive">Delete</Button>}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
        <div>
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
}
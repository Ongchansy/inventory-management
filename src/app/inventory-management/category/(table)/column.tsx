import { ColumnDef } from '@tanstack/react-table';
import { Category, Product} from '@/types/types';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { UseCategoryStore } from '@/store/useCategoryStore';

export const categoryColumns: ColumnDef<Category>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        id: "actions",
        header: 'Actions',
        cell: ({ row }) => {
        const item = row.original;
        const { selectCategory, deleteCategory, toggleViewSheet } = UseCategoryStore();

        return (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    toggleViewSheet();
                    selectCategory(item, 'view');
                }}>
                View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() =>{
                    toggleViewSheet();
                    selectCategory(item, 'edit');
                } }>
                Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteCategory(item.id)}>
                Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        );
        },
    },
];

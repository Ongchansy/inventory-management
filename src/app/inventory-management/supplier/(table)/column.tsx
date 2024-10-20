import { ColumnDef } from '@tanstack/react-table';
import {Supplier} from '@/types/types';
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
import { useSupplierStore } from '@/store/useSupplierStore';

export const SupplierColumns: ColumnDef<Supplier>[] = [
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
        accessorKey: 'image',
        cell: ({ row }) => {
            const item = row.original;
            return (
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover"
                />
            );
        }
    },
    {
        id: "actions",
        header: 'Actions',
        cell: ({ row }) => {
        const item = row.original;
        const { selectSupplier , deleteSupplier, toggleViewSheet } = useSupplierStore();

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
                    selectSupplier(item, 'view');
                }}>
                View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() =>{
                    toggleViewSheet();
                    selectSupplier(item, 'edit');
                } }>
                Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteSupplier(item.id)}>
                Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        );
        },
    },
];

import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { RxCaretSort } from "react-icons/rx";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

const DataTableHeaderColumn = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span className="font-semibold">{title}</span>
            {column.getIsSorted() === "desc" ? (
              <IoArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <IoArrowUp 
              className="ml-2 h-4 w-4" />
            ) : (
              <RxCaretSort className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={()=>column.toggleSorting(true)}>
                <IoArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>column.toggleSorting(false)}>
                <IoArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DataTableHeaderColumn;
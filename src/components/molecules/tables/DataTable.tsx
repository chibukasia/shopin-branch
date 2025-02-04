import {
    ColumnDef,
    ColumnFiltersState,
    getFilteredRowModel,
    getCoreRowModel,
    flexRender,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
  } from "@tanstack/react-table";
  import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
  } from "@/components/ui/table";
  import { useState } from "react";
  import { Input } from "@/components/ui/input";
  import DataTablePagination from "@/components/molecules/tables/Pagination";
  import Select from "@/components/atoms/inputs/Select";
  
  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterValue?: string;
    searchTypes?: {label: string, value: string}[]
  }
  export default function DataTable<TData, TValue>({
    columns,
    data,
    searchTypes
  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [searchType, setSearchType] = useState<string>(searchTypes ? searchTypes[0].value : '')
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onSortingChange: setSorting,
      onRowSelectionChange: setRowSelection,
      onColumnFiltersChange: setColumnFilters,
      state: {
        sorting,
        rowSelection,
        columnFilters,
      },
    });
    return (
      <div className=" rounded-md border">
        
        {searchTypes && (
          <div className="flex items-center p-4 space-x-5">
            <Input
              placeholder="Search..."
              value={(table.getColumn(searchType)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(searchType)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Select items={searchTypes} label="Search by" onValueChange={setSearchType}/>
          </div>
        )}
  
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-20 text-center">
                  No Results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="py-4">
          <DataTablePagination table={table}/>
        </div>
      </div>
    );
  }
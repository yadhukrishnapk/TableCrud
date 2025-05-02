// src/components/home/employeeTable/EmployeeTable.tsx
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import "./EmployeeTable.css";
import { Employee } from "../../../types/employee";
interface EmployeeTableProps {
  employees: Employee[];
  navigate: ReturnType<typeof useNavigate>;
  onSort: (column: string, newSortOrder: "asc" | "desc") => void;
  currentSortBy: string;
  currentSortOrder: string;
}

const EmployeeTable = ({
  employees,
  // navigate,
  onSort,
  currentSortBy,
  currentSortOrder,
}: EmployeeTableProps) => {
  const columns: ColumnDef<Employee>[] = [
    { accessorKey: "employee_code", header: "Employee ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Mobile" },
    { accessorKey: "designation.title", header: "Designation" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Employee> }) => (
        <Link to={`/employee/${row.original.id}`}>
          <Button variant="primary" size="sm">
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  console.log('Employees data:', employees);
  return (
    <div className="table-responsive">
      <Table bordered hover className="employee-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={() => {
                    if (header.column.id !== "actions") {
                      const newSortOrder =
                        currentSortBy === header.column.id &&
                        currentSortOrder === "asc"
                          ? "desc"
                          : "asc";
                      onSort(header.column.id, newSortOrder);
                    }
                  }}
                  className="table-header"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {currentSortBy === header.column.id && (
                    <span className="ms-2">
                      {currentSortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeTable;

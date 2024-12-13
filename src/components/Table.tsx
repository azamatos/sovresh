import { useCallback, useEffect, useMemo, useState } from "react";

// components
import TablePagination from "./TablePagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Toolbar from "./Toolbar";

// api
import { mainService } from "@/lib/api";

// hooks
import usePagination from "@/lib/hooks/usePagination";

// constants
import { DEFAULT_COLUMNS } from "@/lib/constants";
import useTableFilter from "@/lib/hooks/useTableFilter";

const TableComponent = () => {
  const [rows, setRows] = useState<App.List>({ data: [], totalCount: 0 });
  const [filter, setFilter] = useState<App.Filter | null>(null);
  const [columns, setColumns] = useState<App.Column[]>(DEFAULT_COLUMNS);

  const handleColumns = useCallback((column: App.Column) => {
    setColumns((prev) => {
      const arr = [...prev];

      const index = arr.findIndex((col) => col.id === column.id);

      if (index === -1) {
        arr.push(column);
      } else {
        arr.splice(index, 1);
      }

      return arr;
    });
  }, []);

  const { paginationParams, handlePageNavigation, handleLimitChange } =
    usePagination();

  const { filterOptions, handleFilterCallback } = useTableFilter(rows.data);

  const handleSortData = (activeColumn: App.ActiveColumn) => {
    const sortedData = [...rows.data].sort((a, b) => {
      const columnId = activeColumn.id;

      const sortOrder = activeColumn.sorting === "asc" ? 1 : -1;

      return (a[columnId] > b[columnId] ? 1 : -1) * sortOrder;
    });

    setRows((prev) => ({ ...prev, data: sortedData }));
  };

  useEffect(() => {
    mainService.getData(paginationParams).then((res) => {
      setRows(res);
    });
  }, [paginationParams]);

  const handleApplyFilter = useCallback((filter: App.Filter) => {
    setFilter(filter);
  }, []);

  const filteredData = useMemo(() => {
    if (filter) {
      const callback = handleFilterCallback(filter);

      return rows.data.filter(callback);
    } else {
      return rows.data;
    }
  }, [filter, handleFilterCallback, rows.data]);

  const handleClearFilter = useCallback(() => {
    setFilter(null);
  }, []);

  return (
    <div>
      <Toolbar
        filterOptions={filterOptions}
        columns={columns}
        handleColumns={handleColumns}
        handleFilter={handleApplyFilter}
        handleClearFilter={handleClearFilter}
      />
      <table>
        <TableHead columns={columns} handleSorting={handleSortData} />
        <TableBody columns={columns} data={filteredData} />
      </table>
      <TablePagination
        pagination={paginationParams}
        handleLimitChange={handleLimitChange}
        handlePageNavigation={handlePageNavigation}
        totalCount={rows.totalCount}
      />
    </div>
  );
};

export default TableComponent;

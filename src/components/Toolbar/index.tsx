import { FC } from "react";

// components
import ToolbarColumnPicker from "./ColumnPicker";
import ToolbarFilter from "./Filter";

interface Props {
  columns: App.Column[];
  filterOptions: App.FilterOptions;
  handleColumns: (column: App.Column) => void;
  handleFilter: (filter: App.Filter) => void;
  handleClearFilter: () => void;
}

const Toolbar: FC<Props> = ({
  filterOptions,
  columns,
  handleColumns,
  handleFilter,
  handleClearFilter,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ToolbarColumnPicker
        selectedColumns={columns}
        handleToggleColumn={handleColumns}
      />
      <ToolbarFilter
        filterOptions={filterOptions}
        handleFilterChange={handleFilter}
        handleClearFilter={handleClearFilter}
      />
    </div>
  );
};

export default Toolbar;

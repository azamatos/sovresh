import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

// constants
import { DEFAULT_COLUMNS, COMPARISONS } from "@/lib/constants";

interface Props {
  filterOptions: App.FilterOptions;
  handleFilterChange: (filter: App.Filter) => void;
  handleClearFilter: () => void;
}

type ToolbarFilter = App.ReplaceKeys<
  App.Filter,
  "columnId",
  App.Column["id"] | null
>;

const ToolbarFilter: FC<Props> = ({
  filterOptions,
  handleFilterChange,
  handleClearFilter,
}) => {
  const [filter, setFilter] = useState<ToolbarFilter>({
    columnId: null,
    comparison: "equal",
    value: "",
  });

  const handleSelectColumn = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setFilter({
        columnId: event.target.value as App.Filter["columnId"],
        value: "",
        comparison: "equal",
      });
      handleClearFilter();
    },
    [handleClearFilter]
  );

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (event.target.value === "") {
        handleClearFilter();
      }

      setFilter((prev) => ({ ...prev, value: event.target.value }));
    },
    [handleClearFilter]
  );

  const handleComparison = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setFilter((prev) => ({
        ...prev,
        comparison: event.target.value as App.FilterComparison,
      }));
    },
    []
  );

  useEffect(() => {
    if (filter.columnId && filter.value) {
      handleFilterChange({
        columnId: filter.columnId,
        comparison: filter.comparison,
        value: filter.value,
      });
    }
  }, [filter.columnId, filter.value, filter.comparison, handleFilterChange]);

  const ColumnFilter = useCallback(
    (props: {
      value: string;
      onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => void;
    }) => {
      if (!filter.columnId) {
        return null;
      }

      const selectedConfig = filterOptions[filter.columnId] || {
        type: "search",
      };

      switch (selectedConfig.type) {
        case "select":
          return (
            <select {...props} style={{ textTransform: "capitalize" }}>
              {selectedConfig.options?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          );
        case "range":
          return (
            <input
              {...props}
              type="range"
              step={selectedConfig.step}
              min={selectedConfig.min}
              max={selectedConfig.max}
            />
          );
        case "search":
          return <input {...props} type="text" placeholder="Search..." />;

        default:
          return null;
      }
    },
    [filter.columnId, filterOptions]
  );

  return (
    <div>
      <div>
        <label htmlFor="column-select">Select column</label>
        <select
          id="column-select"
          onChange={handleSelectColumn}
          value={filter.columnId || ""}
        >
          <option value="" disabled>
            No selection
          </option>
          {DEFAULT_COLUMNS.map((item) => {
            if (item.id === "picture") {
              return null; // Skip picture column
            }

            return (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            );
          })}
        </select>
      </div>
      {filter.columnId && ["balance", "age"].includes(filter.columnId) && (
        <div>
          <label htmlFor="comparison-select">Comparison</label>
          <select
            id="comparison-select"
            value={filter.comparison}
            onChange={handleComparison}
          >
            {COMPARISONS.map((comparison) => (
              <option key={comparison.value} value={comparison.value}>
                {comparison.label}
              </option>
            ))}
          </select>
        </div>
      )}
      {filter.columnId && (
        <div>
          <ColumnFilter value={filter.value} onChange={handleSearch} />
        </div>
      )}
    </div>
  );
};

export default ToolbarFilter;

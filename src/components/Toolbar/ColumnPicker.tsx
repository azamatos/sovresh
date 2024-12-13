import { FC, useMemo, useState } from "react";

// constants
import { DEFAULT_COLUMNS } from "@/lib/constants";

// styles
import styles from "./ColumnPicker.module.scss";

interface Props {
  selectedColumns: App.Column[];
  handleToggleColumn: (column: App.Column) => void;
}

const ToolbarColumnPicker: FC<Props> = ({
  handleToggleColumn,
  selectedColumns,
}) => {
  const [search, setSearch] = useState("");

  const filteredColumns = useMemo(
    () =>
      DEFAULT_COLUMNS.filter(
        (column) =>
          column.title.toLowerCase().includes(search.toLowerCase()) ||
          column.id.includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <h2>Select columns:</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredColumns.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: 24 }}>
              <input
                type="checkbox"
                id={item.id}
                checked={selectedColumns.includes(item)}
                onChange={() => {
                  handleToggleColumn(item);
                }}
              />
              <label htmlFor={item.id}>{item.title}</label>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolbarColumnPicker;

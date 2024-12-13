import { FC, useCallback, useState } from "react";

interface Props {
  columns: App.Column[];
  handleSorting: (activeColumn: App.ActiveColumn) => void;
}

const TableHead: FC<Props> = ({ columns, handleSorting }) => {
  const [activeColumn, setActiveColumn] = useState<App.ActiveColumn>({
    id: "_id",
    sorting: "asc",
  });

  const handleActiveColumn = useCallback(
    (columnId: keyof App.Item) => {
      const column: App.ActiveColumn = { id: columnId, sorting: "asc" };

      setActiveColumn(column);
      handleSorting(column);
    },
    [handleSorting]
  );

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.id}
            onClick={() => handleActiveColumn(column.id)}
            style={{
              backgroundColor:
                activeColumn.id === column.id ? "green" : undefined,
            }}
          >
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;

import { FC, useMemo } from "react";

interface Props {
  data: App.Item[];
  columns: App.Column[];
}

const getColumnRender = (column: App.Column) => {
  switch (column.id) {
    case "name":
      return (item: App.Item) =>
        item.name ? `${item.name?.first} ${item.name?.last}` : "Unknown";
    case "isActive":
      return (item: App.Item) => (item.isActive ? "Yes" : "No");
    case "tags":
      return (item: App.Item) => item.tags.join(", ");
    case "favoriteFruit":
      return (item: App.Item) => item.favoriteFruit;
    case "picture":
      return (item: App.Item) => (
        <img
          src={item.picture}
          alt="Profile"
          style={{ width: 32, height: 32 }}
        />
      );
    default:
      return (item: App.Item) => item[column.id]?.toString() || "";
  }
};

const TableBody: FC<Props> = ({ data, columns }) => {
  const rows = useMemo(
    () =>
      columns.map((column) => ({
        key: column.id,
        label: column.title,
        render: getColumnRender(column),
      })),
    [columns]
  );

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {rows.map((col) => (
            <td key={col.key}>{col.render(item)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

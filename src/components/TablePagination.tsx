import { FC } from "react";

interface Props {
  pagination: App.PaginationParams;
  handlePageNavigation: (type: "prev" | "next") => void;
  handleLimitChange: (limit: number) => void;
  totalCount: number;
}

const TablePagination: FC<Props> = ({
  handlePageNavigation,
  handleLimitChange,
  pagination,
  totalCount,
}) => {
  return (
    <div>
      <button
        disabled={pagination.page === 1}
        onClick={() => handlePageNavigation("prev")}
      >
        Previous
      </button>
      <span>Page {pagination.page}</span>
      <button
        disabled={pagination.limit * pagination.page > totalCount}
        onClick={() => handlePageNavigation("next")}
      >
        Next
      </button>
      <select
        value={pagination.limit}
        onChange={(e) => handleLimitChange(parseInt(e.target.value, 10))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
      </select>
    </div>
  );
};

export default TablePagination;

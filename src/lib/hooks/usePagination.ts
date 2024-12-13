import { useEffect, useState } from "react";

const usePagination = () => {
  const [paginationParams, setPaginationParams] =
    useState<App.PaginationParams>({
      page: 1,
      limit: 10,
    });

  const parseQueryParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const page = parseInt(queryParams.get("page") || "1", 10);
    const limit = parseInt(queryParams.get("limit") || "10", 10);

    return { page, limit };
  };

  const updateQueryParams = (params: App.PaginationParams) => {
    const queryParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([key, value]) => {
      queryParams.set(key, value.toString());
    });

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;

    window.history.pushState(null, "", newUrl);
  };

  useEffect(() => {
    const initialPagination = parseQueryParams();

    setPaginationParams(initialPagination);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPaginationParams((prev) => {
      updateQueryParams({ page: newPage, limit: prev.limit });

      return { ...prev, page: newPage };
    });
  };

  const handlePageNavigation = (type: "next" | "prev") => {
    setPaginationParams((prev) => {
      let newPage = prev.page ?? 1;

      if (type === "next") {
        newPage += 1;
      } else {
        newPage -= 1;
      }

      updateQueryParams({ page: newPage, limit: prev.limit });

      return { ...prev, page: newPage };
    });
  };

  const handleLimitChange = (newLimit: number) => {
    setPaginationParams({ page: 1, limit: newLimit });

    updateQueryParams({ page: 1, limit: newLimit });
  };

  return {
    handleLimitChange,
    handlePageChange,
    handlePageNavigation,
    paginationParams,
  };
};

export default usePagination;

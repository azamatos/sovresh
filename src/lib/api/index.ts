import data from "../database/rows.json";

const mainService = {
  getData({ page, limit }: App.PaginationParams): Promise<App.List> {
    return new Promise((res) =>
      setTimeout(() => {
        const paginationData = data.slice((page - 1) * limit, page * limit);

        res({ data: paginationData as App.Item[], totalCount: data.length });
      }, Math.floor(Math.random() * 1000))
    );
  },
};

export { mainService };

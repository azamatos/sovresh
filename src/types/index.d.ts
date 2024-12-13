declare namespace App {
  type Item = {
    _id: string;
    isActive: boolean;
    balance: string;
    picture: string;
    age: number;
    name: App.Name;
    company: string;
    email: string;
    address: string;
    tags: string[];
    favoriteFruit: string;
  };

  type Column = {
    id: keyof App.Item;
    title: string;
  };

  type FilterComparison = "equal" | "greater" | "less";

  type Filter = {
    columnId: keyof App.Item;
    comparison: FilterComparison;
    value: string;
  };

  type FilterType = "search" | "select" | "range";

  type FilterOptions = Record<
    Partial<App.Column["id"]>,
    {
      type: App.FilterType;
      options?: string[];
      min?: number;
      max?: number;
      step?: number;
    }
  >;

  type ReplaceKeys<Type, Keys extends string, NewType> = Omit<Type, Keys> & {
    [key in Keys]: NewType;
  };

  type List = {
    data: App.Item[];
    totalCount: number;
  };

  type ActiveColumn = {
    id: keyof App.Item;
    sorting: "asc" | "desc";
  };

  type PaginationParams = {
    page: number;
    limit: number;
  };

  type Name = {
    first: string;
    last: string;
  };

  type ValueOf<T> = T[keyof T];
}

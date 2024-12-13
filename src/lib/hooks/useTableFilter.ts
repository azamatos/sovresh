import { useMemo } from "react";

const handleFilterCallback = (filter: App.Filter) => {
  const search = filter.value.trim().toLowerCase();

  switch (filter.columnId) {
    case "tags":
      return (item: App.Item) =>
        item.tags.map((item) => item.toLowerCase()).includes(search);

    case "isActive":
      return (item: App.Item) =>
        filter.value === "all"
          ? true
          : item.isActive === (filter.value === "true");

    case "name":
      return (item: App.Item) =>
        item.name?.first.toLowerCase().includes(search) ||
        item.name?.last.toLowerCase().includes(search);

    case "balance": {
      if (filter.comparison === "equal") {
        return (item: App.Item) =>
          parseFloat(item.balance.replace(/[$,]/g, "")) ===
          parseFloat(filter.value);
      } else if (filter.comparison === "greater") {
        return (item: App.Item) =>
          parseFloat(item.balance.replace(/[$,]/g, "")) >=
          parseFloat(filter.value);
      } else {
        return (item: App.Item) =>
          parseFloat(item.balance.replace(/[$,]/g, "")) <=
          parseFloat(filter.value);
      }
    }

    case "age":
      if (filter.comparison === "equal") {
        return (item: App.Item) => item.age === parseInt(filter.value);
      } else if (filter.comparison === "greater") {
        return (item: App.Item) => item.age >= parseInt(filter.value);
      } else {
        return (item: App.Item) => item.age <= parseInt(filter.value);
      }

    default:
      return (item: App.Item) =>
        (item[filter.columnId] as string).toLowerCase().includes(search);
  }
};

const useTableFilter = (rows: App.Item[]) => {
  const filterOptions: App.FilterOptions = useMemo(() => {
    const balances = [];
    const ages = [];
    const tags = new Set<string>();
    const fruits = new Set<string>();

    for (const data of rows) {
      balances.push(parseFloat(data.balance.replace(/[$,]/g, "")));
      ages.push(data.age);
      data.tags.forEach((tag) => tags.add(tag));
      fruits.add(data.favoriteFruit);
    }

    return {
      _id: { type: "search" },
      picture: { type: "search" },
      name: { type: "search" },
      company: { type: "search" },
      email: { type: "search" },
      address: { type: "search" },
      isActive: { type: "select", options: ["all", "true", "false"] },
      favoriteFruit: {
        type: "select",
        options: Array.from(fruits),
      },
      tags: {
        type: "select",
        options: Array.from(tags),
      },
      age: {
        type: "range",
        min: Math.min(...ages),
        max: Math.max(...ages),
        step: 1,
      },
      balance: {
        type: "range",
        min: Math.min(...balances),
        max: Math.max(...balances),
        step: 10,
      },
    };
  }, [rows]);

  return {
    filterOptions,
    handleFilterCallback,
  };
};

export default useTableFilter;

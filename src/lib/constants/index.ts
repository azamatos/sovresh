const DEFAULT_COLUMNS: App.Column[] = [
  { id: "_id", title: "ID" },
  { id: "isActive", title: "Is active" },
  { id: "balance", title: "Balance" },
  { id: "picture", title: "Picture" },
  { id: "age", title: "Age" },
  { id: "name", title: "Full name" },
  { id: "company", title: "Company" },
  { id: "email", title: "Email" },
  { id: "address", title: "Address" },
  { id: "tags", title: "Tags" },
  { id: "favoriteFruit", title: "Favorite fruit" },
];

const COMPARISONS = [
  { label: "Equal", value: "equal" },
  { label: "Greater", value: "greater" },
  { label: "Less", value: "less" },
];

export { DEFAULT_COLUMNS, COMPARISONS };

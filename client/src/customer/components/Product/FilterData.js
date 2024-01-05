// export const color = [
//   "white",
//   "black",
//   "red",
//   "marun",
//   "being",
//   "pink",
//   "green",
//   "yellow",
// ];

export const filters = [
  {
    id: "color",
    name: "color",
    options: [
      { value: "white", label: "white" },
      { value: "black", label: "black" },
      { value: "biege", label: "biege" },
      { value: "blue", label: "blue" },
      { value: "green", label: "green" },
      { value: "purple", label: "purple" },
    ],
  },
];

export const singleFilter = [
  {
    id: "order",
    name: "order",
    options: [
      { value: "price_high", label: "price high" },
      { value: "price_low", label: "price low" },
    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    options: [
      { value: "20", label: "20% And Above" },
      { value: "30", label: "30% And Above" },
      { value: "40", label: "40% And Above" },
      { value: "50", label: "50% And Above" },
      { value: "60", label: "60% And Above" },
      { value: "70", label: "70% And Above" },
      { value: "80", label: "80% And Above" },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out Of Stock" },
    ],
  },
];

// export const sortOptions = [
//   { name: "Price:Low to High", query: "price_low", current: false },
//   { name: "Price:High to Low", query: "price_low", current: false },
// ];

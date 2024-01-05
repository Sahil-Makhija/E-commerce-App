export const defaultImage =
  "https://m.media-amazon.com/images/I/51fsMHlrQFL._AC_UL480_FMwebp_QL65_.jpg";
export type TailwindClass = {
  [key: string]: string;
};
export const paymentOptions: Array<{
  label: string;
  value: string | null;
  available: boolean;
}> = [
  {
    label: "Cash on Delivery / Pay on Delivery",
    value: "COD",
    available: true,
  },
  { label: "Debit Card / Credit Card", value: "CARD", available: true },
  { label: "Net Banking", value: "BANK_TRANSFER", available: false },
];
export const blankUserImage =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

export const productCategories = [
  {label: "Televisions", value: "television" },
  { label: "Washing Machines", value: "washing_machine" },
  { label: "Sewing Machines", value: "sewing_machine" },
  { label: "Refrigerators", value: "refrigerator" },
  { label: "Coolers", value: "cooler" },
];

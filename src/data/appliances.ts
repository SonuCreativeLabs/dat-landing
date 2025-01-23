export const applianceTypes = [
  "AC Sale",
  "AC Service",
  "AC Rental",
  "Refrigerator Sale",
  "Refrigerator Service",
  "Refrigerator Rental",
  "Washing Machine Sale",
  "Washing Machine Service",
  "Washing Machine Rental",
  "Water Purifier Sale",
  "Water Purifier Service",
  "Water Purifier Rental"
] as const;

export type ApplianceType = typeof applianceTypes[number];

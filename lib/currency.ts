export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
}

export function formatNumber(amount: number): string {
  return amount.toLocaleString("en-US");
}

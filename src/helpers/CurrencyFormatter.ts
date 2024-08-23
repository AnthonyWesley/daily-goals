export const toCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    // style: "currency",
    // currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const autoCurrency = (value: string) => {
  if (value) {
    return Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
    }).format(parseFloat(value.replace(/[^\d.-]/g, "")) / 100);
  }
  return value;
};

export const parseCurrency = (formattedValue: any) => {
  if (formattedValue) {
    const numericValue = formattedValue.replace(/[^\d,-]/g, "");
    return parseFloat(numericValue.replace(",", "."));
  }
  return 0;
};
export const toNumber = (value: string): number => {
  value = value.trim();
  value = value.replace(/\./g, "").replace(",", ".");
  const result = parseFloat(value);
  return result;
};

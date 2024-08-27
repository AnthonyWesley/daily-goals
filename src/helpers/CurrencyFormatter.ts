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

export const parseCurrency = (formattedValue: any): number => {
  if (typeof formattedValue === "string" && formattedValue) {
    const numericValue = formattedValue.replace(/[^\d,-]/g, "");
    const parsedValue = parseFloat(numericValue.replace(",", "."));
    return isNaN(parsedValue) ? 0 : parsedValue;
  } else {
    return formattedValue;
  }
};

export const toNumber = (value: string): number => {
  value = value.trim();
  value = value.replace(/\./g, "").replace(",", ".");
  const result = parseFloat(value);
  return result;
};

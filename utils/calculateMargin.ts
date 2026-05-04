export interface CalculationInputs {
  cost: number;
  isVatIncluded: boolean;
  vatRate: number; // 1, 10, or 20
  packaging: number;
  shipping: number;
  extra: number;
  salesPrice: number;
  commissionRate: number;
  stopajRate: number;
}

export interface CalculationResults {
  salesPrice: number;
  baseCost: number;
  baseExpenses: number;
  totalCost: number;
  netProfit: number;
  profitMargin: number;
  
  // VAT details
  productVat: number;
  expensesVat: number;
  totalPurchaseVat: number;
  salesVat: number;
  taxPayable: number;
  commissionCost: number;
  stopajCost: number;
}

export const calculateMargin = (inputs: CalculationInputs): CalculationResults => {
  const { cost, isVatIncluded, vatRate, packaging, shipping, extra, salesPrice, commissionRate, stopajRate } = inputs;

  const commissionCost = salesPrice * (commissionRate / 100);
  const stopajCost = salesPrice * (stopajRate / 100);
  const baseExpenses = packaging + shipping + extra;
  const expenses = baseExpenses + commissionCost;

  // Expenses are assumed to include 20% VAT
  const expensesVat = expenses - (expenses / 1.20);

  let totalCost = 0;
  let productVat = 0;

  if (isVatIncluded) {
    totalCost = cost + expenses + stopajCost;
    productVat = cost - (cost / (1 + vatRate / 100));
  } else {
    totalCost = (cost * (1 + vatRate / 100)) + expenses + stopajCost;
    productVat = cost * (vatRate / 100);
  }

  const netProfit = salesPrice - totalCost;
  const profitMargin = salesPrice > 0 ? (netProfit / salesPrice) * 100 : 0;

  const totalPurchaseVat = productVat + expensesVat;
  const salesVat = salesPrice - (salesPrice / (1 + vatRate / 100));
  const taxPayable = salesVat - totalPurchaseVat;

  return {
    salesPrice,
    baseCost: cost,
    baseExpenses,
    totalCost,
    netProfit,
    profitMargin,
    productVat,
    expensesVat,
    totalPurchaseVat,
    salesVat,
    taxPayable,
    commissionCost,
    stopajCost,
  };
};

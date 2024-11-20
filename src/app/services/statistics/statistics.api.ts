import Api from "../api";

interface StatisticsResponse {
  totalRequests: number;
  totalItems: number;
  totalStock: number;
  suppliers: number;
  purchaseQuantity: number;
  purchaseRevenue: number;
  salesQuantity: number;
  salesRevenue: number;
}

export async function getStatistics(): Promise<StatisticsResponse> {
  const url = `/statistics`;

  try {
    const response = await Api.get<StatisticsResponse>(url);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
  }

  return {
    totalRequests: 0,
    totalItems: 0,
    totalStock: 0,
    suppliers: 0,
    purchaseQuantity: 0,
    purchaseRevenue: 0,
    salesQuantity: 0,
    salesRevenue: 0,
  };
}

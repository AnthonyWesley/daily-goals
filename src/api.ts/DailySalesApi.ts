import axios from "axios";

export interface IDailySales {
  id?: string;
  day: Date | string;
  sales: number;
  goalId: string;
}

export const instanceDaily = axios.create({
  baseURL: "https://daily-goals-api.vercel.app/daySales",
  headers: { "X-Custom-Header": "foobar" },
});

export class DailySalesApi {
  async list(id: string): Promise<IDailySales[]> {
    try {
      const response = await instanceDaily.get(`/${id}`);

      if (response.status !== 200) {
        throw new Error("Failed to fetch dailySales");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching dailySales:", error);
      throw error;
    }
  }

  async write(dailySales: IDailySales): Promise<IDailySales> {
    try {
      const response = await instanceDaily.post("/write", dailySales);

      if (response.status !== 201) {
        throw new Error("Failed to create dailySales");
      }
      return response.data;
    } catch (error) {
      console.error("Error creating dailySales:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const response = await instanceDaily.delete(`/${id}/delete`);
      if (response.status !== 204) {
        throw new Error("Failed to delete dailySales");
      }
      return true;
    } catch (error) {
      console.error("Error deleting dailySales:", error);
      throw error;
    }
  }

  async update(id: string, dailySales: IDailySales): Promise<IDailySales> {
    try {
      const response = await instanceDaily.put(`/${id}/change`, dailySales);
      if (response.status !== 200) {
        throw new Error("Failed to update dailySales");
      }
      return response.data;
    } catch (error) {
      console.error("Error updating dailySales:", error);
      throw error;
    }
  }
}

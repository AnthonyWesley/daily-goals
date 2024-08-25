import axios from "axios";

export interface IDailySales {
  id?: string;
  day: Date | string;
  sales: number;
  goalId: string;
}

const instance = axios.create({
  baseURL: "http://localhost:3001/daySales",
  headers: { "X-Custom-Header": "foobar" },
});

export class DailySalesApi {
  async list(id: string): Promise<IDailySales[]> {
    try {
      const response = await instance.get(`/${id}`);
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
      const response = await instance.post("/write", dailySales);
      console.log(response);

      if (response.status !== 201) {
        throw new Error("Failed to create dailySales");
      }
      return response.data;
    } catch (error) {
      console.error("Error creating dailySales:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<IDailySales> {
    try {
      const response = await instance.delete(`/${id}/delete`);
      if (response.status !== 204) {
        throw new Error("Failed to delete goal");
      }
      return response.data;
    } catch (error) {
      console.error("Error deleting goal:", error);
      throw error;
    }
  }

  async update(id: string, dailySales: IDailySales): Promise<IDailySales> {
    console.log(id, dailySales);

    try {
      const response = await instance.put(`/${id}/change`, dailySales);
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

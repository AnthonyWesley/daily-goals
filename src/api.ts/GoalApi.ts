import axios from "axios";

export interface IGoal {
  id?: string;
  name: string;
  monthlyGoal: number;
  workingDays: number;
  userIp?: string;
}

export interface IGoalUpdate {
  description: string;
  endAt: Date;
  id?: string;
}

const instance = axios.create({
  baseURL: "https://api-test-omega-one.vercel.app/goal",
  headers: { "X-Custom-Header": "foobar" },
});

export class GoalApi {
  async getUserIp(): Promise<string> {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      if (response.status !== 200) {
        throw new Error("Failed to fetch user IP");
      }
      await axios.post("https://api-test-omega-one.vercel.app/user/write");
      return response.data.ip;
    } catch (error) {
      console.error("Error fetching user IP:", error);
      throw error;
    }
  }

  async createUserIp() {
    try {
      const userIp = await this.getUserIp();

      const response = await instance.post(
        "https://api-test-omega-one.vercel.app/user/write",
        {
          headers: { "X-User-IP": userIp },
        },
      );
      if (response.status !== 200) {
        throw new Error("Failed to create user IP");
      }
      return response.data;
    } catch (error) {
      console.error("Error creating user IP:", error);
      throw error;
    }
  }

  async list(): Promise<IGoal[]> {
    try {
      const userIp = await this.getUserIp();
      const response = await instance.get("/", {
        headers: { "X-User-IP": userIp },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch goals");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching goals:", error);
      throw error;
    }
  }

  async write(goal: IGoal): Promise<IGoal> {
    try {
      const userIp = await this.getUserIp();
      const response = await instance.post("/write", goal, {
        headers: { "X-User-IP": userIp },
      });
      if (response.status !== 201) {
        throw new Error("Failed to create goal");
      }
      return response.data;
    } catch (error) {
      console.error("Error creating goal:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<IGoal> {
    try {
      const userIp = await this.getUserIp();
      const response = await instance.delete(`/${id}/delete`, {
        headers: { "X-User-IP": userIp },
      });
      if (response.status !== 204) {
        throw new Error("Failed to delete goal");
      }
      return response.data;
    } catch (error) {
      console.error("Error deleting goal:", error);
      throw error;
    }
  }

  async update(id: string, goal: IGoal): Promise<IGoal> {
    try {
      const userIp = await this.getUserIp();
      const response = await instance.put(`/${id}/change`, goal, {
        headers: { "X-User-IP": userIp },
      });
      if (response.status !== 200) {
        throw new Error("Failed to update goal");
      }
      return response.data;
    } catch (error) {
      console.error("Error updating goal:", error);
      throw error;
    }
  }
}

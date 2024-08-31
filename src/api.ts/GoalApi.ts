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

export const instanceGoal = axios.create({
  baseURL: "https://daily-goals-api.vercel.app/goal",
  headers: { "X-Custom-Header": "foobar" },
});

export class GoalApi {
  async getUserIp(): Promise<string> {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");

      if (response.status !== 200) {
        throw new Error("Failed to fetch user IP");
      }

      const fetchedIp = response.data.ip;
      const storedIp = localStorage.getItem("userIp");

      if (!storedIp || storedIp !== fetchedIp) {
        localStorage.setItem("userIp", fetchedIp);
      }

      return fetchedIp;
    } catch (error) {
      console.error("Error fetching user IP:", error);
      throw error;
    }
  }

  async createUserIp() {
    try {
      const storedIp = localStorage.getItem("userIp");

      const userIp = await this.getUserIp();

      const response = await instanceGoal.post(
        "https://daily-goals-api.vercel.app/user/write",
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
      const response = await instanceGoal.get("/", {
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
      console.log(userIp);

      const response = await instanceGoal.post("/write", goal, {
        headers: { "X-User-IP": userIp },
      });
      if (response.status !== 201) {
        throw new Error("Failed to create goal");
      }
      return response.data;
    } catch (error) {
      console.error("Error creating goal:", error);
      console.log(error);

      throw error;
    }
  }

  async delete(id: string): Promise<IGoal> {
    try {
      const userIp = await this.getUserIp();
      const response = await instanceGoal.delete(`/${id}/delete`, {
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
      const response = await instanceGoal.put(`/${id}/change`, goal, {
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

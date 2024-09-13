import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
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
  async getUserDeviceId(): Promise<string> {
    try {
      const fpPromise = await FingerprintJS.load();

      const fpResult = await fpPromise.get();
      const deviceId = fpResult.visitorId;

      if (!deviceId) {
        throw new Error("Failed to fetch device ID");
      }

      const storedDeviceId = localStorage.getItem("userDeviceId");

      if (!storedDeviceId || storedDeviceId !== deviceId) {
        localStorage.setItem("userDeviceId", deviceId);
      }

      return deviceId;
    } catch (error) {
      console.error("Error fetching device ID:", error);
      throw error;
    }
  }

  async createUserIp() {
    try {
      const storedIp = localStorage.getItem("userDeviceId");
      const getUserIp = await this.getUserDeviceId();

      if (!storedIp || storedIp != getUserIp) {
        const response = await instanceGoal.post(
          "https://daily-goals-api.vercel.app/user/write",
          {
            // headers: { "X-User-IP": getUserIp },
            headers: { Authorization: storedIp },
          },
        );

        if (response.status !== 200) {
          throw new Error("Failed to create user IP");
        }

        return response.data;
      }
    } catch (error) {
      console.error("Error creating user IP:", error);
      throw error;
    }
  }

  async list(): Promise<IGoal[]> {
    try {
      const userIp = await this.getUserDeviceId();
      const response = await instanceGoal.get("/", {
        headers: { Authorization: userIp },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch goals");
      }
      console.log(userIp);

      return response.data;
    } catch (error) {
      console.error("Error fetching goals:", error);
      throw error;
    }
  }

  async write(goal: IGoal): Promise<IGoal> {
    try {
      const userIp = await this.getUserDeviceId();
      console.log(userIp);

      const response = await instanceGoal.post("/write", goal, {
        headers: { Authorization: userIp },
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

  async delete(id: string): Promise<boolean> {
    try {
      const userIp = await this.getUserDeviceId();
      const response = await instanceGoal.delete(`/${id}/delete`, {
        headers: { Authorization: userIp },
      });
      if (response.status !== 204) {
        throw new Error("Failed to delete goal");
      }
      return true;
    } catch (error) {
      console.error("Error deleting goal:", error);
      throw error;
    }
  }

  async update(id: string, goal: IGoal): Promise<IGoal> {
    try {
      const userIp = await this.getUserDeviceId();
      const response = await instanceGoal.put(`/${id}/change`, goal, {
        headers: { Authorization: userIp },
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

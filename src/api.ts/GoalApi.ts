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

      await instanceGoal.post("https://daily-goals-api.vercel.app/user/write", {
        deviceId,
      });
      console.log(fpResult.visitorId);

      return deviceId;
    } catch (error) {
      console.error("Error fetching device ID:", error);
      throw error;
    }
  }

  async list(): Promise<IGoal[]> {
    try {
      const deviceId = await this.getUserDeviceId();

      const response = await instanceGoal.get("/", {
        headers: { Authorization: deviceId },
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
      const deviceId = await this.getUserDeviceId();

      const response = await instanceGoal.post("/write", goal, {
        headers: { Authorization: deviceId },
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
      const deviceId = await this.getUserDeviceId();

      const response = await instanceGoal.delete(`/${id}/delete`, {
        headers: { Authorization: deviceId },
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
      const deviceId = await this.getUserDeviceId();

      const response = await instanceGoal.put(`/${id}/change`, goal, {
        headers: { Authorization: deviceId },
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

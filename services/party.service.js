import gAxios from "./gAxios";

export default class PartyService {
  static async get() {
    const res = await gAxios.get("api/party/", {
      params: { limit: 500, isactive: true },
    });
    return res.data;
  }

  static async update(settingInfo) {
    const res = await gAxios.put("/settings", settingInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
}

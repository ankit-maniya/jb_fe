import gAxios from "./gAxios";

export default class UserService {
  static async get(formData) {
    const res = await gAxios.post("api/user/login/", formData);

    console.log("Api ", res);

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

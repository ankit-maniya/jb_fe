import gAxios from "./gAxios";

export default class CuttingTypeService {
  static async get() {
    const res = await gAxios.get("api/cuttingtype/");
    return res.data;
  }

  static async getByParam(params) {
    const res = await gAxios.get("api/cuttingtype/", params);

    if (!res.data) {
      return [];
    }

    return res.data.results
  }
}

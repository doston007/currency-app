import axios from "axios";

export default axios.create({
  baseURL: "https://openexchangerates.org/api/",
  params: {
    app_id: "aab84f939ad74a22b690e754bf7e7230",
  },
});

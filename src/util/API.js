import axios from "axios";

const API = {
  getEmployees: function () {
    return axios.get("https://randomuser.me/api/?results=50&nat=us");
  },
};

export default API;

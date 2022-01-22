import axios from "axios";

class Requets  {
  baseApi = 'http://localhost:3000'
  get =  async (url, params = {}) => {
    return await axios.get(this.baseApi + url, { params })
  }
  post = async (url, data) => {
    return await axios.post(this.baseApi + url, {
      ...data
    })
  }
  delete =  async (url) => {
    axios.delete(this.baseApi + url)
  }
}

export default new Requets();
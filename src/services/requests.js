import axios from "axios";

class Requets  {
  baseApi = 'http://localhost:3000'
  get =  async (url) => {
    return await axios.get(this.baseApi + url)
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
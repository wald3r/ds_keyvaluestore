import axios from 'axios'

//Connection to backend
const basicUrl = 'http://localhost:3004/api/pairs'

//Service methods to interact with database
//Fetch all pairs
const getAllPairs = async () => {

  const response = await axios.get(basicUrl)
  return response.data
}

//Save a new pair
const savePair = async (pair) => {
  const response = await axios.post(basicUrl, pair)
  console.log(response.data)
  return response.data
}

//Remove a kv pair
const removePair = async (pair) => {
  const response = await axios.delete(`${basicUrl}/${pair.id}`)
  return response.data
}

//Update a kv pair
const updatePair = async (pair) => {
  const response = await axios.put(`${basicUrl}/${pair.id}`, pair)
  return response.data
}

export default { getAllPairs, savePair, updatePair, removePair }

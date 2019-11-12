import axios from 'axios'


const getAllPairs = async () => {

  const response = await axios.get('http://localhost:3001/pairs')
  return response.data
}


const savePair = async (pair) => {
  const response = await axios.post('http://localhost:3001/pairs', pair)
  console.log(response.data)
  return response.data
}

const removePair = async (pair) => {
  const response = await axios.delete(`http://localhost:3001/pairs/${pair.id}`)
  return response.data
}

const updatePair = async (pair) => {
  const response = await axios.put(`http://localhost:3001/pairs/${pair.id}`, pair)
  return response.data
}

export default { getAllPairs, savePair, updatePair, removePair }
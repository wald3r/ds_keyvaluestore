import React from 'react'
import { Button } from 'react-bootstrap'
import pairService from '../services/pair'
import { Link } from 'react-router-dom'

const Pair = ( { pair, list, handlelist } ) => {


  const handleRemoval = async () => {
    const result = window.confirm(`Do you really want to delete all items with key ${pair.key}?`)
    if(result){
      await pairService.removePair(pair)
      const newList = list.filter(item => item.key !== pair.key)
      console.log(newList)
      handlelist(newList)
    }
  }

  return (
    <tr >
    <td> <Link to={`/${pair.key}`}>{pair.key}</Link></td>
    {pair.values.map(item => <td key={item.id}>{item.value}</td>)}
    <td><Button onClick={handleRemoval}>Remove</Button></td>
  </tr>
  )

} 



export default Pair
import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import pairsService from '../services/pair'
import '../general.css'
import Pair from '../components/Pair'
var uniqid = require('uniqid')


const Home = ({ kvlist, handlelist, ...props}) => {

  const [key, setKey] = useState("")
  const [value, setValue] = useState("")

  const getPairs = async () => {
    const list =  await pairsService.getAllPairs()
    handlelist(list)
  }

  useEffect(() => {
    getPairs()
  }, [])

  const addToExistingKey =  () => {
    
    var list = kvlist
    var pair = null

    for(let a = 0; a < list.length; a++){
      if(list[a].key === key){
        list[a].values.push({'id': uniqid(), 'value': value})
        pair = list[a]
      }
    }
    return pair

  }

  const handleValue = async (event) => {
    console.log('adding k v pair', key, value)
    const pair = addToExistingKey()
    if(pair !== null){
      const response = await pairsService.updatePair(pair)
      handlelist(kvlist.concat(response))
    }else{
      const response = await pairsService.savePair({'id': uniqid(), 'key': key, 'values': [{'id': uniqid(), 'value': value}]})
      handlelist(kvlist.concat(response))
    }
    setKey('')
    setValue('')
  }

  const handleKeyInpupt = (event) => {
    event.preventDefault()
    setKey(event.target.value)
  }

  const handleValueInput = (event) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-15'>
            <Form onSubmit={handleValue}>
              <Table className='table .table-striped' width="10">
                  <thead className='thead-light'>

                  </thead>
                  <tbody width="10">
                      <tr>
                          <td width="10">
                              Key:
                          </td>

                          <td>
                            <input autoComplete='off' onChange={handleKeyInpupt}/>
                          </td>
                      </tr>
                      <tr>
                          <td width="10">
                              Values:
                          </td>

                          <td>
                            <input autoComplete='off' onChange={handleValueInput}/>
                          </td>
                      </tr>
                  </tbody>
              </Table>
              <Button className='button' type="submit">Add Value</Button>
            </Form>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className='container'>
      <div className='row'>
        <div className='col-md-15'>
          <Table className='table'>
            <thead className='thead-light'>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {kvlist.map(pair => 
                <Pair key={pair.id} pair={pair} list={kvlist} handlelist={handlelist}/>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>


    </div>
  )



}


export default Home
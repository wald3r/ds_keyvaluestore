import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import pairsService from '../services/pair'
import '../general.css'
import Pair from '../components/Pair'
import helperClass from '../utils/helper'

//Main component, which is accessible via '/'
const Home = ({ kvlist, handlelist, ...props}) => {

  const [key, setKey] = useState("")
  const [value, setValue] = useState("")

  //Fetch kv pairs from database
  const getPairs = async () => {
    const list =  await pairsService.getAllPairs()
    handlelist(list)
  }

  //react hook to fetch data
  useEffect(() => {
    getPairs()
  }, [])

  //If key already exists, then return kv pair
  const addToExistingKey =  () => {
    
    var list = kvlist
    var pair = null

    for(let a = 0; a < list.length; a++){
      if(list[a].key === key){
        list[a].values.push({ 'value': value })
        pair = list[a]
      }
    }
    return pair

  }

  //Add new kv pair or add values to existing pair
  const handleValue = async (event) => {
    console.log('adding k v pair', key, value)
    const pair = addToExistingKey()
    if(pair !== null){
      const response = await pairsService.updatePair(pair)
      console.log(response)
      handlelist(kvlist.concat(response))
    }else{
      const response = await pairsService.savePair({ 'key': key, 'values': [{ 'value': value}]})
      handlelist(kvlist.concat(response))
    }
    setKey('')
    setValue('')
  }



  //Event handler for key input tag
  const handleKeyInpupt = (event) => {
    event.preventDefault()
    setKey(event.target.value)
  }

  //Event handler for value input tag
  const handleValueInput = (event) => {
    event.preventDefault()
    setValue(event.target.value)
  }
  
  //clear whole database
  const handleRemoveAll = async () => {
    const result = window.confirm(`Do you really want to clear the whole database?`)
    if(result){
      for(let i = 0; i < kvlist.length; i++){
        await pairsService.removePair(kvlist[i])
      }
      handlelist([])
      window.location.reload()
    }
  }

  //create 50 Entries with a random payload
  const handle50Entries = async () => {

    let list = []
    for(let i = 0; i < 50; i++){
      const randomLength = Math.floor(Math.random() * 512);
      const randomPayload = helperClass.makePayload(randomLength)
      await pairsService.savePair({ 'key': i, 'values': [{ 'value': randomPayload}]})
      list.concat({ 'key': i, 'values': [{ 'value': randomPayload}]})
    }
    handlelist(kvlist.concat(list))
    window.location.reload()
  }

  //create 25 Entries with a minimum payload of 10 bytes
  const handle25Min = async () => {

    let list = []
    for(let i = 50; i < 75; i++){
      const randomPayload = helperClass.makePayload(10)
      await pairsService.savePair({ 'key': i, 'values': [{ 'value': randomPayload}]})
      list.concat({ 'key': i, 'values': [{ 'value': randomPayload}]})
    }
    handlelist(kvlist.concat(list))
    window.location.reload()
  }

  //create 25 Entries with a average payload of 256 bytes
  const handle25Avg = async () => {

    let list = []
    for(let i = 75; i < 100; i++){
      const randomPayload = helperClass.makePayload(256)
      await pairsService.savePair({ 'key': i, 'values': [{ 'value': randomPayload}]})
      list.concat({ 'key': i, 'values': [{ 'value': randomPayload}]})
    }
    handlelist(kvlist.concat(list))
    window.location.reload()
  }

   //create 25 Entries with a maximum payload of 512 bytes
   const handle25Max = async () => {

    let list = []
    for(let i = 100; i < 125; i++){
      const randomPayload = helperClass.makePayload(512)
      await pairsService.savePair({ 'key': i, 'values': [{ 'value': randomPayload}]})
      list.concat({ 'key': i, 'values': [{ 'value': randomPayload}]})
    }
    handlelist(kvlist.concat(list))
    window.location.reload()
  }

 

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-15'>
            <Form className='inputForm' onSubmit={handleValue}>
              <Table className='table .table-striped' >
                  <thead className='thead-light'>

                  </thead>
                  <tbody >
                      <tr>
                          <td width='100px'>
                              Key:
                          </td>

                          <td width='700px'>
                            <input className='input' autoComplete='off' onChange={handleKeyInpupt}/>
                          </td>
                      </tr>
                      <tr>
                          <td width='100px'>
                              Value:
                          </td>

                          <td width='700px'>
                            <input className='input' autoComplete='off' onChange={handleValueInput}/>
                          </td>
                      </tr>
                  </tbody>
              </Table>
              <Button className='button' type="submit">Add Value</Button>
            </Form>
            <br></br>
            <Button className='button' onClick={handleRemoveAll}>Clear Database</Button>
            <Button className='button' onClick={handle50Entries}>Create 50 Random Entries</Button>
            <Button className='button' onClick={handle25Min}>Create 25 Entries Min Payload</Button>
            <Button className='button' onClick={handle25Avg}>Create 25 Entries Average Payload</Button>
            <Button className='button' onClick={handle25Max}>Create 25 Entries Max Payload</Button>
          <br></br>
          <br></br>
          <Table className='table'>
            <thead className='thead-light'>
              <tr>
                <th>Key</th>
                <th>Values</th>
                <th>Created</th>
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
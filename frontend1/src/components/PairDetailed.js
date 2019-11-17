import React, { useState } from 'react'
import '../general.css'
import { Table, Form, Button } from 'react-bootstrap'
import pairService from '../services/pair'
import helperClass from '../utils/helper'

//Component to edit a single kv pair
const PairDetailed = ( { pair, ...props } ) => {

  const [newValues, setNewValues] = useState([])


  if(pair[0] === undefined){
    return null
  }

  //Event handler to edit values
  const handleValueChange = (event, data) => {
    event.preventDefault()
    var newValues = pair[0].values.filter(item => item.value !== data.value)
    if(event.target.value !== ''){
      setNewValues(newValues.concat({ 'value': event.target.value }))
    }
    else{
      setNewValues(newValues)
    }

  }

  //Update an edited kv pair
  const handleNewPair = async (event) => {
    event.preventDefault()
    await pairService.updatePair({'id': pair[0].id, 'key': pair[0].key, 'values': newValues})
    window.location.href = '/'
    console.log('Save pair')
  }

  return (
    <div className='container'>
    <div className='row'>
      <div className='col-md-40'>
        <br></br>
        <br></br>
        <Form className='editForm' onSubmit={handleNewPair}>
          <Table className='tablelistedit'>
            <thead className='thead-light'>
              <tr>
                <th>Key</th>
                <th>Created</th>
                <th>Values</th>
              </tr>
            </thead>
            <tbody>
            <tr >
                <td >{pair[0].key}</td>
                <td >{helperClass.formatTime(pair[0].createdAt)}</td>
                {pair[0].values.map(item => <td key={item._id}><input className='inputEdit' width='700px' onChange={( event ) => handleValueChange(event, item)} defaultValue={item.value}/></td>)}
                <td ><Button type='submit'>Save</Button></td>
            </tr>
            </tbody>
          </Table>
        </Form>
      </div>
    </div>
  </div>
  )
}


export default PairDetailed
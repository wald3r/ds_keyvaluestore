import React, { useState } from 'react'
import '../general.css'
import { Table, Form, Button } from 'react-bootstrap'
import pairService from '../services/pair'


//Component to edit a single kv pair
const PairDetailed = ( { pair, ...props } ) => {

  const [newKey, setNewKey] = useState("")
  const [newValues, setNewValues] = useState([])


  if(pair[0] === undefined){
    return null
  }

  //Event handler to edit a key
  const handleKeyChange = (event) => {
    event.preventDefault()
    setNewKey(event.target.value)
    if(newValues.length === 0){
      setNewValues(pair[0].values)
    }
    
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
  
    if(newKey === ''){
      setNewKey(pair[0].key)
    }

  }

  //Update an edited kv pair
  const handleNewPair = async (event) => {
    event.preventDefault()
    await pairService.updatePair({'id': pair[0].id, 'key': newKey, 'values': newValues})
    window.location.href = '/'
    console.log('Save pair')
  }

  return (
    <div className='container'>
    <div className='row'>
      <div className='col-md-15'>
        <br></br>
        <br></br>
        <Form onSubmit={handleNewPair}>
          <Table className='table'>
            <thead className='thead-light'>
              <tr>
                <th>Key</th>
                <th>Values</th>
              </tr>
            </thead>
            <tbody>
            <tr >
                <td width="10"><input onChange={handleKeyChange} defaultValue={pair[0].key} disabled /></td>
                {pair[0].values.map(item => <td width="10" key={item._id}><input onChange={( event ) => handleValueChange(event, item)} defaultValue={item.value}/></td>)}
                <td width="10"><Button type='submit'>Save</Button></td>
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
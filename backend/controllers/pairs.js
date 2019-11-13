const pairsRouter = require('express').Router()
const Pair = require('../models/pair')


pairsRouter.get('/', async (request, response) => {
  try{

    const pairs = await Pair.find({})
    return response.json(pairs)
  } catch(exception){
    next(exception)
  }
})

pairsRouter.delete('/:id', async (request, response, next) => {
  
  try{
    await Pair.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } catch(exception){
    next(exception)
  }
})

pairsRouter.put('/:id', async (request, response, next) => {

  const body = request.body
  console.log(request.params.id)
  const newPair = {
    key: body.key,
    values: body.values,
  }
  try{
    const updatedPair = await Pair.findByIdAndUpdate(request.params.id, newPair, {new: true})
    return response.status(201).json(updatedPair)
  } catch(exception){
    next(exception)
  }
})


pairsRouter.post('/', async (request, response, next) =>{ 
  try{
    const body = request.body
    console.log(body.values)
    pair = new Pair({
      key: body.key,
      values: body.values
    })
    
    await pair.save()
     
    response.status(201).json(pair.toJSON())
  }catch(exception){
    next(exception)
  }
})


module.exports = pairsRouter

const {buildDB} = require('./db/populateDataBase')
const express = require('express')
const {Cheese} = require('./models')
const app = express()
buildDB()


app.get('/feta', async(req,res)=>{
const queriedCheese = await Cheese.findOne({where: {title: 'Feta'}})
let {title,description} = queriedCheese
let payload = {
    title: title,
    description: description
}
res.send(payload)
})

app.get('/starts-with-c', async(req,res) =>{
    const dbQuery= await Cheese.findAll()
    let startsWithC = dbQuery .filter((cheese)=> {
        if (cheese.title[0] === 'C') {
            return true
        }
    })
    
})

app.listen(3000,()=>{
    console.log('Server running on http://localhost:3000')
})
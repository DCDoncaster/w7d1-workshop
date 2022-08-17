const {buildDB} = require('./db/populateDataBase')
const express = require('express')
const {Cheese} = require('./models')
const { reset } = require('nodemon')
const app = express()
buildDB()
//middleware to parse incoming JSONs 
app.use(express.json())




app.get('/cheeses/:cheese', async(req,res)=>{

let newString = req.params.cheese[0].toUpperCase() + req.params.cheese.slice(1).toLowerCase()

const queriedCheese = await Cheese.findOne({where: {title: newString}})
if (!queriedCheese){
    res.send("Sorry we don't have that cheese")
}
else {
    
let {title,description} = queriedCheese
let payload = {
    title: title,
    description: description
}
res.send(payload)

}})

app.get('/starts-with-c', async(req,res) =>{
    const dbQuery= await Cheese.findAll()
    let startsWithC = dbQuery .filter((cheese)=> {
        if (cheese.title[0] === 'C') {
            return true
        }
    })
    res.send(200)
})

app.get('/cheeses', async (req,res)=>{
    const dbQuery = await Cheese.findAll()
    let startsWithAlpha = dbQuery.filter((cheese)=> {
        if (cheese.title[0] === req.query.startswith.toUpperCase()){
            return true
        }
    })
    if(startsWithAlpha.length ===0){
        res.send("Sorry, no mathces.")
        return
    }
    console.log(startsWithAlpha.length)
    res.send(startsWithAlpha)
})

app.post('/cheeses', (req,res)=>{
    console.log('incoming request')
    //without the code on line 7/8 this would return undefined
    console.log(req.body)
    res.sendStatus(200)
})

app.listen(3000,()=>{
    console.log('Server running on http://localhost:3000')
})
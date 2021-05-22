const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = process.env.PORT || 3300

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World How are you!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zcidc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  // console.log('connection err', err)
  const productCollection = client.db("foodValley").collection("products");
  const ordersCollection = client.db("foodValley").collection("orders");
  // console.log('dtbse connected successfully')

  app.post('/addEvent', (req, res) =>{
    const newEvent = req.body;
    console.log('adding new event', newEvent)
    productCollection.insertOne(newEvent)
    .then(result =>{
      console.log('inserted count', result.insertedCount)
      res.send(result.insertedCount > 0)
    })
  })

  app.get('/events', (req, res) =>{
    productCollection.find()
    .toArray((err, items) => {
      res.send(items)
      // console.log('from database', items)
    })
  })

  app.post('/addOrder', (req, res)=>{
    const order = req.body;
    ordersCollection.insertOne(order)
    .then(result =>{
      console.log(result);
      res.send(result.insertedCount > 0)
  })
})

  app.get('/orderItem', (req, res)=>{
    ordersCollection.find({})
    .toArray((err, documents) => {
      res.send(documents)
    } )
})

  app.delete('/delete/:id', (req, res) => {
    productCollection.deleteOne({_id: ObjectId (req.params.id)})
    .then(result => {
      console.log(result)
    })
    // console.log(req.params.id)
  })

  // client.close();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
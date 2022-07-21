const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")('sk_test_51LNwfOSE7W74WjcR5VbBmIhQ1d8NeuMBq9pClBGT4YrLBe4QRpC4wX5av6jx8UjqsTjb3Vfu6MxvXFJfxwHeMALH00UzXCOpjp')

// API 

// app config
const app = express();


// middlewares
app.use(cors({origin: true}));
app.use(express.json());

// -API routes
app.get('/',(request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async(request,response) => {
    const total =request.query.total;

    console.log('payment request received BOOM!!! for this amount >>>', total)

    const paymentIntent =await stripe.paymentIntent.create({
        amount: total,//subunits of currency
        currency:"usd",
    });
    // OK-- created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})


// -Listen command
exports.api =functions.https.onRequest(app)


// example endpoint
 //http://localhost:5001/clone-4f7d0/us-central1/api


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

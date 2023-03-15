const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

import * as request from 'request' 
import * as express from 'express' 
import * as moment from 'moment'
import * as cors from 'cors';


const app = express()

const app1 = express()

const firebaseConfig = {
    apiKey: "AIzaSyDCv9VTgFnVnDN3Q4Yqr79PkfubYFBMYJM",
    authDomain: "ushanga-alpha.firebaseapp.com",
    projectId: "ushanga-alpha",
    storageBucket: "ushanga-alpha.appspot.com",
    messagingSenderId: "475491525681",
    appId: "1:475491525681:web:d38491273613d3b5336110",
    measurementId: "G-F50K3R5D64",
  }; 

const admin = require('firebase-admin');
admin.initializeApp(firebaseConfig);


app.get('/',(req:any,resp:any) =>{
    resp.status(200).json(
        {
            greetings:'Welcome',
            message:'Oi'
        }
    )
})

app.get('/test',(req:any,resp:any) =>{
    resp.status(200).json(
        {
            status:'Up and running' 
        }
    )
})

app.get('/get_token',(req:any,res:any) =>{
    const endpoint = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const consumer_key = "XYAuN3SCjC2tdd7eKaQlS0AtbUheTahY"
    const consumer_secret = "StMs8GcajJqzYO3g"

    const auth = Buffer.from(consumer_key + ":" + consumer_secret).toString('base64');

    request(
        {    
            url: endpoint,
            headers:{
                "Authorization": "Basic " + auth
            }
        },
        function (error: any,response:any, body:any){
            if (error) {
                console.log(error)
                res.status(401).json({message:error})
            }
            res.status(200).json(body)
        }
    )

})

function _access_token(req:any,res:any,next:any){
    const endpoint = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const consumer_key = "XYAuN3SCjC2tdd7eKaQlS0AtbUheTahY"
    const consumer_secret = "StMs8GcajJqzYO3g"

    const auth = Buffer.from(consumer_key + ":" + consumer_secret).toString('base64');

    request(
        {    
            url: endpoint,
            headers:{
                "Authorization": "Basic " + auth
            }
        },
        function (error: any,response:any, body:any){
            if (error) {
                console.log(error)
                res.status(401).json({message:error})
            }
            req.access_token = (JSON.parse(body)).access_token
            next()
        }
    )
}

app.get('/ttoken', _access_token, (req:any,res:any) =>{
    res.status(200).json({message:req.access_token})
})

//Register
app.get('/register', _access_token, (req:any,res:any) =>{
    const endpoint = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    request(
        {
            method:'POST',
            url: endpoint,
            headers:{
                "Authorization": "Bearer " + req.access_token
            },
            json:{
                "ShortCode": "600977",
                "ResponseType": "Completed",
                "ConfirmationURL": "https://us-central1-ushanga-alpha.cloudfunctions.net/main/c2b/confirm",
                "ValidationURL": "https://us-central1-ushanga-alpha.cloudfunctions.net/main/c2b/validate"
            },
            function (error: any,response:any, body:any){
                if (error) {
                    console.log(error) 
                }
                res.status(200).json(body)
                
            }
        }
    )
    res.status(200).json({message:req.access_token})
}) 

app.post('/c2b/confirm', _access_token, (req:any,res:any) =>{
    console.log(req.body)
    res.status(200).json(
        {
            "ResultCode":0,
            "ResultDesc": "Success"
        }
    )
})

app.post('/c2b/validate', _access_token, (req:any,res:any) =>{
    console.log(req.body)
    res.status(200).json(
        {
            "ResultCode":0,
            "ResultDesc": "Success"
        }
    )
})

//Simulate
app.get('/simulate', _access_token, (req:any,res:any) =>{
    const endpoint = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate'
    request(
        {
            url: endpoint,
            method:'POST',
            headers:{
                "Authorization": "Bearer " + req.access_token
            },
            json:{
                "ShortCode": "600977",
                "Amount": 100,
                "BillRefNumber": "TestPay",
                "Msisdn": "25493750235",
                "CommandID":"CustomerPaybillOnline"
            },
            function (error: any,response:any, body:any){
                if (error) {
                    console.log(error) 
                    res.json({message:'An error was encountered.'})
                }
                res.status(200).json(body)
                
            }
        }
    )
})

app1.get('/print', (req:any,res:any) =>{
    console.log('pass get')
})

app.get('/lnmo/:productID/:amount/:phoneNumber', _access_token, (req:any,res:any) =>{
    const id = req.params.productID
    const number = req.params.phoneNumber
    const amount = req.params.amount
 
    console.log('params',req.params)
     
    let auth = "Bearer " + req.access_token
    const endpoint = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest' 
    const timeformated = moment().format('YYYYMMDDhhmmss')  
    const password = Buffer.from('174379'+'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'+timeformated).toString('base64')
     
    request(
        {
            url: endpoint,
            method:"POST",
            headers:{
                "Authorization": auth
            },
            json: {
                "BusinessShortCode": 174379,
                "Password": password,
                "Timestamp": timeformated,
                "TransactionType": "CustomerPayBillOnline", 
                "Amount": amount,
                "PartyA": number, 
                "PartyB": 174379,
                "PhoneNumber":number,
                "CallBackURL":"https://us-central1-ushanga-alpha.cloudfunctions.net/main/lnmo/callback/"+id,
                "AccountReference":"Ushanga Kenya",
                "TransactionDesc":"TST"
            },
            function (error: any, response: any, body: any){
                if (error) {
                    console.log(error) 
                    res.json(error)
                } 
                res.status(200).json(body)
            }
        }
    )    

})
app1.use(cors());
app1.get('/ipay/:productID/:amount/:phoneNumber', (req, res) => {
    console.log('Pass iPay')
    console.log('params',req.params)

    console.log('BOOODY', req.body)

    const live = req.body.live;
    const oid = req.body.oid;
    const inv = req.body.inv;
    const amount = req.body.amount;
    const tel = req.body.tel;
    const eml = req.body.eml;
    const vid = req.body.vid;
    const curr = req.body.curr;
    const p1 = req.body.p1;
    const p2 = req.body.p2;
    const p3 = req.body.p3;
    const p4 = req.body.p4;
    const cst = req.body.cst;
    const cbk = req.body.cbk;
    const secretKey = 'demoCHANGED';
  
    const dataString = live + oid + inv + amount + tel + eml + vid + curr + p1 + p2 + p3 + p4 + cst + cbk;
    const generated_hash = CryptoJS.HmacSHA256(dataString, secretKey).toString();
  
    request(
        {
            url: 'https://apis.ipayafrica.com/payments/v2/transact',
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            json: {
                "live": live,
                "oid":oid,
                "inv":inv,
                "amount": amount,
                "tel": tel,
                "eml":eml, 
                "vid" :vid,
                "curr":curr,
                "p1":p1,
                "p2":p2,
                "p3":p3,
                "p4":p4,
                "cst":cst,
                "cbk":cbk,
                "hash": generated_hash
            }
        },
        function (error: any, response: any, body: any){
            if (error) {
                console.log(error);
                res.json(error);
            } else {
                res.status(response.statusCode).json(body);
            }
        }
    );
    
  });

app.post('/lnmo/callback/:id', _access_token, (req:any,res:any) =>{
    console.log('--------------------LNMO RESULT ----------------------')
    if (!req.body.Body.stkCallback.CallbackMetadata) {
        console.log('-----zero--------------------')
        console.log(req.body.Body.stkCallback)
        
        res.status(200).json(req.body)
    } else {
        console.log('-----callbackmetadata--------------------')
        console.log(req.body.Body.stkCallback.CallbackMetadata)
        const id = req.params.id 
    
        admin.firestore().collection('transactions')
        .add({mpesa:req.body.Body.stkCallback.CallbackMetadata,productID:id})
        .then((docRef: any) => { 
            console.log('change id',id)
            admin.firestore().collection('products').doc(id).update({status:0, transaction: docRef.id});
            console.log('-----passed--------------------')
            res.status(200).json(req.body)
        })
        .catch((error: any) => {
          console.log("Error", error);
        });
    }

    
    
})

export const main = functions.https.onRequest(app); 
export const ipay = functions.https.onRequest(app1); 



const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);

/// Cloud Functions

/// Listings Index

const index = client.initIndex('products');

exports.addToIndex = functions.firestore.document('products/{productsId}')

    .onCreate((snapshot: { data: () => any; id: any; }) => {

        const data = snapshot.data();
        const objectID = snapshot.id;

        return index.saveObject({ ...data, objectID });

    });

exports.updateIndex = functions.firestore.document('products/{productsId}')

    .onUpdate((change: { after: { data: () => any; id: any; }; }) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ ...newData, objectID });
});

exports.deleteFromIndex = functions.firestore.document('products/{productsId}')

    .onDelete((snapshot: { id: any; }) => 
        index.deleteObject(snapshot.id)
    );


/// Listings Index 
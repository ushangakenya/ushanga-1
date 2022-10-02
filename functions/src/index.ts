import * as functions from "firebase-functions";
import * as express from 'express'
import { request } from "http";

const app = express()

app.get('/',(req:any,resp:any)=>{
    resp.status(200).json(
        {
            greeting:'Welcome to firebase',
            message: 'Please subcribe'
        }
    )
})
app.get('/test',(req:any,resp:any)=>{
    resp.status(200).json(
        {
            status:'Up and running'
        }
    )
})
app.get('/get_token',(req:any,res:any)=>{
    const endpoint = ''
    const consumer_key = ''
    const consumer_secret = ''
    const auth = new Buffer(consumer_key + ':' + consumer_secret).toString('base64')

    request(
        {
            url: endpoint ,
            headers: {
                'Authorization':'Basic ' + auth
            }
        },
        function (error:any, response:any, body:any) {
            if(error){
                console.log(error)
                res.status(401).json({message: error})
            }
            res.status(200).json(body)
        }
    )


})
export const main = functions.https.onRequest(app) 
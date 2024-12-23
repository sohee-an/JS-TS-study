import jsondata from "./data.json?raw"
export default async function learnwith(){ 
    if(process.env.NODE_ENV ==='development'){
        console.log("dd",jsondata)
        return JSON.parse(jsondata)
    }else {
        const response =await fetch("https://learnwitheunjae.dev/api/sinabro-js/ecommerce")

        return response.json()
    }
   
}
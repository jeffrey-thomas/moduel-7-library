import { CarState } from "../redux/CarsSlice";

let api_uri = 'http://127.0.0.1:5000/api/cars'
let token = '994e594d34e74896e47274c84ca7fd02115b8e83a03483af';

export interface CarData{
    vin:string;
    make?:string;
    model?:string;
    year?:number;
    color?:string;
}

const parseJsonCar = (json:Object):CarState=>{

    if(!(json.hasOwnProperty('vin') && json.hasOwnProperty('make') &&  json.hasOwnProperty('model') &&
    json.hasOwnProperty('year') && json.hasOwnProperty('color')))
        throw new Error("Object retrieved from database is missing one or more properties.");

    return json as CarState;

}

type CallMethod = 'GET' | 'POST' | 'DELETE';

interface ApiArgs{
    uri:string;
    token:string;
    method:CallMethod;
    id?:string;
    car?:CarData;
    errMsg:string;
}

const api_call = async (args:ApiArgs):Promise<CarState | CarState[]>=>{
    let uri = args.id ? `${args.uri}/${args.id}` : `${args.uri}`;
    
    let request:RequestInit = {
        method:args.method,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${args.token}`
        }
    };
    if(args.car)
        request.body = JSON.stringify(args.car);

    const response = await fetch(uri,request);

    if(!response.ok){
        throw new Error(args.errMsg);
    }

    let json = await response.json();
    
    if(Array.isArray(json))
        return json.map((obj)=>parseJsonCar(obj))

    return parseJsonCar(json);
}

export const car_api = {

    //GET all
    getAll: ()=>api_call({
        uri:api_uri,
        token:token,
        method:'GET',
        errMsg:'Failed to fetch cars from database server.'
    }),

    getById:(id:string)=>api_call({
        uri:api_uri,
        token:token,
        method:'GET',
        id:id,
        errMsg:'Failed to fetch car from database server.'
    }),

    create:(car:CarData)=>api_call({
        uri:api_uri,
        token:token,
        method:'POST',
        car:car,
        errMsg:'Failed to create new car in database.'
    }),

    update:(id:string, car:CarData)=>api_call({
        uri:api_uri,
        token:token,
        method:'POST',
        id:id,
        car:car,
        errMsg:'Failed to update car in database.'
    }),

    delete:(id:string)=>api_call({
        uri:api_uri,
        token:token,
        method:'DELETE',
        id:id,
        errMsg:'Failed to delete car from database.'
    })

}
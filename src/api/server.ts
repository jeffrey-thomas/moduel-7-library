import { BookState } from "../redux/BooksSlice";

let api_uri = 'https://ct-library-project.herokuapp.com/api/books'
let token = 'b0729cd69b4321340d2bd00929d91e534c0dcd58b9b4a3bc';

export interface BookData{
    isbn:string;
    author?:string;
    title?:string;
    year?:number;
    length?:number;
    hardcover?:boolean;
}

const parseJsonBook = (json:Object):BookState=>{

    if(!(json.hasOwnProperty('isbn') && json.hasOwnProperty('author') &&  json.hasOwnProperty('title') &&
    json.hasOwnProperty('year') && json.hasOwnProperty('length') && json.hasOwnProperty('hardcover')))
        throw new Error("Object retrieved from database is missing one or more properties.");

    return json as BookState;

}

type CallMethod = 'GET' | 'POST' | 'DELETE';

interface ApiArgs{
    uri:string;
    token:string;
    method:CallMethod;
    id?:string;
    book?:BookData;
    errMsg:string;
}

const api_call = async (args:ApiArgs):Promise<BookState | BookState[]>=>{
    let uri = args.id ? `${args.uri}/${args.id}` : `${args.uri}`;
    
    let request:RequestInit = {
        method:args.method,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${args.token}`
        }
    };
    if(args.book)
        request.body = JSON.stringify(args.book);

    const response = await fetch(uri,request);

    if(!response.ok){
        throw new Error(args.errMsg);
    }

    let json = await response.json();
    
    if(Array.isArray(json))
        return json.map((obj)=>parseJsonBook(obj))

    return parseJsonBook(json);
}

export const book_api = {

    //GET all
    getAll: ()=>api_call({
        uri:api_uri,
        token:token,
        method:'GET',
        errMsg:'Failed to fetch books from database server.'
    }),

    getById:(id:string)=>api_call({
        uri:api_uri,
        token:token,
        method:'GET',
        id:id,
        errMsg:'Failed to fetch book from database server.'
    }),

    create:(book:BookData)=>api_call({
        uri:api_uri,
        token:token,
        method:'POST',
        book:book,
        errMsg:'Failed to create new book in database.'
    }),

    update:(id:string, book:BookData)=>api_call({
        uri:api_uri,
        token:token,
        method:'POST',
        id:id,
        book:book,
        errMsg:'Failed to update book in database.'
    }),

    delete:(id:string)=>api_call({
        uri:api_uri,
        token:token,
        method:'DELETE',
        id:id,
        errMsg:'Failed to delete book from database.'
    })

}
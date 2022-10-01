import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { book_api } from '../../api/server';
import { RootState } from '../store';

export interface BookState {
  isbn:string;
  author:string;
  title:string;
  length:number;
  year:number;
  hardcover:boolean;
}

export interface BookTableState{
    books:BookState[];
    status:string;
}

const initialState: BookTableState = {
  books: [],
  status:'unloaded'
};

//Load all
export const loadAllBooks = createAsyncThunk(
  'books/loadAll',
  async () => {
    let result = await book_api.getAll();
    return result;
  }
);

export const booksSlice = createSlice({
  name: 'booksTable',
  initialState,
  reducers: {

    //Add a book
    addBook: (state, action:PayloadAction<BookState>) => {
      //check for unique vin
      let match = state.books.find((book)=>book.isbn===action.payload.isbn);

      if(!match)
        state.books.push(action.payload);
      else
        booksSlice.caseReducers.updateBook(state,action);
    },
    
    //Update a car
    updateBook: (state, action: PayloadAction<BookState>) => {
      let index = state.books.findIndex((book)=>book.isbn===action.payload.isbn)
      state.books.splice(index,1,action.payload);
    },

    //Delete a car
    deleteBook: (state, action:PayloadAction<string>)=>{
      let index = state.books.findIndex((book)=> book.isbn === action.payload)
      state.books.splice(index,1);
    }
  },
 
  //Async Thunk actions
  extraReducers: (builder) => {
    builder
      .addCase(loadAllBooks.pending, (state) => {
         state.status = 'pending...'
      })
      .addCase(loadAllBooks.fulfilled, (state, action) => {
        state.status = 'idle';
        if(Array.isArray(action.payload))
          state.books = action.payload;
        else
          state.books = [action.payload];
      })
      .addCase(loadAllBooks.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addBook, updateBook, deleteBook } = booksSlice.actions;

//Selectors
export const selectBooks = (state: RootState) => state.booksTable.books;
export const selectBook = (isbn:string)=> (state:RootState)=>state.booksTable.books.find((book)=>book.isbn===isbn);
export const selectBookStatus = (state:RootState) => state.booksTable.status;

//Reducer export
export const booksReducer = booksSlice.reducer;
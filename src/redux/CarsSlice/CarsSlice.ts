import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { car_api } from '../../api/server';
import { RootState } from '../store';

export interface CarState {
  vin:string;
  make:string;
  model:string;
  color:string;
  year:number;
}

export interface CarTableState{
    cars:CarState[];
    status:string;
}

const initialState: CarTableState = {
  cars: [],
  status:'unloaded'
};

//Load all
export const loadAllCars = createAsyncThunk(
  'cars/loadAll',
  async () => {
    let result = await car_api.getAll();
    return result;
  }
);

export const carsSlice = createSlice({
  name: 'carsTable',
  initialState,
  reducers: {

    //Add a car
    addCar: (state, action:PayloadAction<CarState>) => {
      //check for unique vin
      let match = state.cars.find((car)=>car.vin===action.payload.vin);

      if(!match)
        state.cars.push(action.payload);
      else
        carsSlice.caseReducers.updateCar(state,action);
    },
    
    //Update a car
    updateCar: (state, action: PayloadAction<CarState>) => {
      let index = state.cars.findIndex((car)=>car.vin===action.payload.vin)
      state.cars.splice(index,1,action.payload);
    },

    //Delete a car
    deleteCar: (state, action:PayloadAction<string>)=>{
      let index = state.cars.findIndex((car)=> car.vin === action.payload)
      state.cars.splice(index,1);
    }
  },
 
  //Async Thunk actions
  extraReducers: (builder) => {
    builder
      .addCase(loadAllCars.pending, (state) => {
         state.status = 'pending...'
      })
      .addCase(loadAllCars.fulfilled, (state, action) => {
        state.status = 'idle';
        if(Array.isArray(action.payload))
          state.cars = action.payload;
        else
          state.cars = [action.payload];
      })
      .addCase(loadAllCars.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addCar, updateCar, deleteCar } = carsSlice.actions;

//Selectors
export const selectCars = (state: RootState) => state.carsTable.cars;
export const selectCar = (vin:string)=> (state:RootState)=>state.carsTable.cars.find((car)=>car.vin===vin);
export const selectCarStatus = (state:RootState) => state.carsTable.status;

//Reducer export
export const carsReducer = carsSlice.reducer;
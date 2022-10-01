import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material"
import { CarState, updateCar } from "../../../redux/CarsSlice";
import { store } from "../../../redux/store";
import {FormProvider, useForm } from 'react-hook-form';
import { FormInput } from "../../SharedComponents/FormInput";
import { car_api } from "../../../api";


interface UpdateFormProps{
    open:boolean;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
    car:CarState;
}

export const UpdateForm = (props:UpdateFormProps) =>{

    const methods = useForm<CarState>({});
    const {handleSubmit} = methods;
    
    const onSubmit = async(data:CarState) => {
        data.vin = props.car.vin;
        props.onClose();
        car_api.update(data.vin,data).then(
            //Successful API call - update redux store with value in database
            (car)=>{
                store.dispatch(updateCar(car as CarState));
                props.onSuccess('Car updated successfully.')
            },
            //Unsuccessful API call - don't update redux store, log error
            (error:Error)=>{props.onError('Connection to database failed.')}
        );

    }

    const formStyles = {
        display:'flex',
        flexDirection:'column',
        pt:0,
        '& input':{p:'5px'}
    }

    return(
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Car</DialogTitle>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={formStyles}>
                
                    <DialogContentText>VIN: {props.car? props.car.vin : 'UNKNOWN'}</DialogContentText>
                    <Divider sx={{mb:'20px'}}/>

                    <FormInput field="make" defaultValue={props.car.make}>Make</FormInput>
                    <FormInput field="model" defaultValue={props.car.model}>Model</FormInput>
                    <FormInput field="year" numeric={true} defaultValue={props.car.year}>Year</FormInput>
                    <FormInput field="color" defaultValue={props.car.color}>Color</FormInput>
                  
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} variant='outlined'>Cancel</Button>
                    <Button type='reset' variant = 'contained' color='primary'>Reset</Button>
                    <Button type='submit' variant='contained' color='secondary'>Submit</Button>
                </DialogActions>
            </form>
            </FormProvider>                    
        </Dialog>
    );
}
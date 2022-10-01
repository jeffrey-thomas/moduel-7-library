import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material"
import { deleteCar, CarState } from "../../../redux/CarsSlice";
import { store } from "../../../redux/store";
import {FormProvider, useForm } from 'react-hook-form';
import { FormInput } from "../../SharedComponents/FormInput";
import { car_api } from "../../../api";
import { useState } from "react";


interface DeleteFormProps{
    open:boolean;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
    vin:string;
}

export const DeleteForm = (props:DeleteFormProps) =>{

    const formMethods = useForm<CarState>({});
    const {handleSubmit} = formMethods;

    const onSubmit = async() => {
        
        props.onClose();
        car_api.delete(props.vin).then(
            //Successful API call - update redux store by removing value in database
            (car)=>{
                store.dispatch(deleteCar(props.vin));
                props.onSuccess('Database updated successfully.')
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
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-overwrite-title">
            <DialogTitle id="form-overwrite-title">Delete Car?</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Are you sure you want to delete the car with vin:${props.vin}? This action can not be undone.`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} variant='outlined'>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} variant='contained' color='warning'>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}
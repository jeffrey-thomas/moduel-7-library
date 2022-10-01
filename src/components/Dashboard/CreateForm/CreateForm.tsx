import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material"
import { addCar, CarState } from "../../../redux/CarsSlice";
import { store } from "../../../redux/store";
import {FormProvider, useForm } from 'react-hook-form';
import { FormInput } from "../../SharedComponents/FormInput";
import { car_api } from "../../../api";
import { useState } from "react";


interface CreateFormProps{
    open:boolean;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
}

export const CreateForm = (props:CreateFormProps) =>{

    const formMethods = useForm<CarState>({});
    const {handleSubmit} = formMethods;

    const [overwriteOpen, setOverwriteOpen] = useState(false);
    
    const handleOverwriteClose = ()=>{ setOverwriteOpen(false); }
    const handleOverwriteConfirm=()=>{
        handleOverwriteClose();
        handleSubmit(onSubmit)();
    }

    const validateSubmit = (data:CarState)=>{
        //Check that VIN is unique
        let match = store.getState().carsTable.cars.find((car)=>car.vin===data.vin)
        if(match){
            setOverwriteOpen(true);
        }
        else
            handleSubmit(onSubmit)();
    }

    const onSubmit = async(data:CarState) => {
        
        props.onClose();
        car_api.create(data).then(
            //Successful API call - update redux store with value in database
            (car)=>{
                store.dispatch(addCar(car as CarState));
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
        <Box>
        {/* MAIN DIALOG */}
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Car</DialogTitle>
            <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(validateSubmit)}>
                <DialogContent sx={formStyles}>
                
                    <Divider sx={{mb:'20px'}}/>

                    <FormInput field="vin" placeholder="VIN">VIN</FormInput>
                    <FormInput field="make" placeholder="Make">Make</FormInput>
                    <FormInput field="model" placeholder="Model">Model</FormInput>
                    <FormInput field="year" numeric={true} placeholder="2022">Year</FormInput>
                    <FormInput field="color" placeholder="Color">Color</FormInput>
                  
                </DialogContent>
                <DialogActions>

                    <Button onClick={props.onClose} variant='outlined'>Cancel</Button>
                    <Button type='reset' variant = 'contained' color='primary'>Reset</Button>
                    <Button type='submit' variant='contained' color='secondary'>Submit</Button>

                </DialogActions>
            </form>
            </FormProvider>                    
        </Dialog>

        {/* CONFIRM OVERWRITE DIALOG */}
        <Dialog open={overwriteOpen} onClose={handleOverwriteClose} aria-labelledby="form-overwrite-title">
            <DialogTitle id="form-overwrite-title">Overwrite Existing Car?</DialogTitle>
            <DialogContent>
                <DialogContentText>A car with this VIN already exists in the database. Do you wish to overwrite it?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOverwriteClose} variant='outlined'>Cancel</Button>
                <Button onClick={handleOverwriteConfirm} variant='contained' color='secondary'>Overwrite</Button>
            </DialogActions>
        </Dialog>

        </Box>
    );
}
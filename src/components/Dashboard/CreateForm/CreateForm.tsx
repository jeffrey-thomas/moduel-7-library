import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material"
import { addBook, BookState } from "../../../redux/BooksSlice";
import { store } from "../../../redux/store";
import {FormProvider, useForm } from 'react-hook-form';
import { FormInput } from "../../SharedComponents/FormInput";
import { book_api } from "../../../api";
import { useState } from "react";
import { FormCheckbox } from "../../SharedComponents";


interface CreateFormProps{
    open:boolean;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
}

export const CreateForm = (props:CreateFormProps) =>{

    const formMethods = useForm<BookState>({});
    const {handleSubmit} = formMethods;

    const [overwriteOpen, setOverwriteOpen] = useState(false);
    
    const handleOverwriteClose = ()=>{ setOverwriteOpen(false); }
    const handleOverwriteConfirm=()=>{
        handleOverwriteClose();
        handleSubmit(onSubmit)();
    }

    const validateSubmit = (data:BookState)=>{
        //Check that isbn is unique
        let match = store.getState().booksTable.books.find((book)=>book.isbn===data.isbn)
        if(match){
            setOverwriteOpen(true);
        }
        else
            handleSubmit(onSubmit)();
    }

    const onSubmit = async(data:BookState) => {
        
        props.onClose();
        book_api.create(data).then(
            //Successful API call - update redux store with value in database
            (book)=>{
                store.dispatch(addBook(book as BookState));
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
            <DialogTitle id="form-dialog-title">Create Book</DialogTitle>
            <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(validateSubmit)}>
                <DialogContent sx={formStyles}>
                
                    <Divider sx={{mb:'20px'}}/>

                    <FormInput field="isbn" placeholder="ISBN">ISBN</FormInput>
                    <FormInput field="author" placeholder="Author">Author</FormInput>
                    <FormInput field="title" placeholder="Title">Title</FormInput>
                    <FormInput field="year" numeric={true} placeholder="2022">Year</FormInput>
                    <FormInput field="length" numeric={true} placeholder="1">Length</FormInput>
                    <FormCheckbox field="hardcover" label="Hardcover"/>
                  
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
            <DialogTitle id="form-overwrite-title">Overwrite Existing Book?</DialogTitle>
            <DialogContent>
                <DialogContentText>A book with this ISBN already exists in the database. Do you wish to overwrite it?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOverwriteClose} variant='outlined'>Cancel</Button>
                <Button onClick={handleOverwriteConfirm} variant='contained' color='secondary'>Overwrite</Button>
            </DialogActions>
        </Dialog>

        </Box>
    );
}
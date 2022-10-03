import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material"
import { BookState, updateBook } from "../../../redux/BooksSlice";
import { store } from "../../../redux/store";
import {FormProvider, useForm } from 'react-hook-form';
import { FormInput } from "../../SharedComponents/FormInput";
import { book_api } from "../../../api";
import { FormCheckbox } from "../../SharedComponents";


interface UpdateFormProps{
    open:boolean;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
    book:BookState;
}

export const UpdateForm = (props:UpdateFormProps) =>{

    const methods = useForm<BookState>({});
    const {handleSubmit} = methods;
    
    const onSubmit = async(data:BookState) => {
        data.isbn = props.book.isbn;
        props.onClose();
        book_api.update(data.isbn,data).then(
            //Successful API call - update redux store with value in database
            (book)=>{
                store.dispatch(updateBook(book as BookState));
                props.onSuccess('Book updated successfully.')
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
            <DialogTitle id="form-dialog-title">Update Book</DialogTitle>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={formStyles}>
                
                    <DialogContentText>ISBN: {props.book? props.book.isbn : 'UNKNOWN'}</DialogContentText>
                    <Divider sx={{mb:'20px'}}/>
{}
                    <FormInput field="author" defaultValue={props.book.author}>Author</FormInput>
                    <FormInput field="title" defaultValue={props.book.title}>Title</FormInput>
                    <FormInput field="year" type='number' defaultValue={props.book.year}>Year</FormInput>
                    <FormInput field="length" type='number' defaultValue={props.book.length}>Length</FormInput>
                    <FormCheckbox field="hardcover" label="Hardcover" defaultChecked={props.book.hardcover}/>
                  
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
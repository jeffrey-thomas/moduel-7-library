import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { deleteBook, BookState } from "../../../redux/BooksSlice";
import { store } from "../../../redux/store";
import { useForm } from 'react-hook-form';
import { book_api } from "../../../api";



interface DeleteFormProps{
    open:boolean;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
    isbn:string;
}

export const DeleteForm = (props:DeleteFormProps) =>{

    const formMethods = useForm<BookState>({});
    const {handleSubmit} = formMethods;

    const onSubmit = async() => {
        
        props.onClose();
        book_api.delete(props.isbn).then(
            //Successful API call - update redux store by removing value in database
            (car)=>{
                store.dispatch(deleteBook(props.isbn));
                props.onSuccess('Database updated successfully.')
            },
            //Unsuccessful API call - don't update redux store, log error
            (error:Error)=>{props.onError('Connection to database failed.')}
        );

    }

    return(
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-overwrite-title">
            <DialogTitle id="form-overwrite-title">Delete Book?</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Are you sure you want to delete the book with ISBN:${props.isbn}? This action can not be undone.`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} variant='outlined'>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} variant='contained' color='warning'>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}
import { Box } from '@mui/material'
import { useState } from 'react'
import { useAppSelector as useSelector } from '../../hooks/typed-hooks'
import { BookState, loadAllBooks, selectBooks, selectBookStatus } from '../../redux/BooksSlice'
import { store } from '../../redux/store'
import { UpdateForm } from './UpdateForm'
import { BookTable } from './BookTable'
import { DashboardAlert, DashboardAlertDefaultState } from './DashboardAlert'
import { CreateForm } from './CreateForm'
import { Button } from '@mui/material'
import { DeleteForm } from './DeleteForm'

const defaultBook:BookState = {
  isbn:'ISBN',
  author:'AUTHOR',
  title:'TITLE',
  year:2022,
  length:1,
  hardcover:false
}

export const Dashboard = () => {

  //Get list of cars from redux store, load from database if needed
  let books = useSelector(selectBooks);
  let loading_status = useSelector(selectBookStatus);
  if(loading_status === 'unloaded')
    store.dispatch(loadAllBooks());

  //UpdateForm
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [bookToUpdate, setBookToUpdate] = useState(defaultBook);

  const handleUpdateOpen = (book:BookState)=>{
    setBookToUpdate(book);
    setUpdateFormOpen(true);
  }
  const handleUpdateClose = ()=>{ setUpdateFormOpen(false); }

  //CreateForm
  const [ createFormOpen, setCreateFormOpen] = useState(false);
  const handleCreateOpen = ()=>{ setCreateFormOpen(true); }
  const handleCreateClose = ()=>{ setCreateFormOpen(false); }

  //DeleteForm
  const [ deleteFormOpen, setDeleteFormOpen ] = useState(false);
  const handleDeleteOpen = (book:BookState)=>{ 
    setBookToUpdate(book);
    setDeleteFormOpen(true);}
  const handleDeleteClose = ()=>{ setDeleteFormOpen(false); }

  //Controls for success/failure alert
  const [alert, setAlert] = useState(DashboardAlertDefaultState);

  // const showAlert =()=>{ setAlert({...alert, open:true}); }

  const hideAlert = ()=>{ setAlert({...alert, open:false}); }

  const alertError=(message:string)=>{ 
    setAlert({
      message:message,
      severity:'error',
      open:true
    });
  }

  const alertSuccess=(message:string)=>{ 
    setAlert({
      message:message,
      severity:'success',
      open:true
    });
  }

  //Styles
  const styles={
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'space-between',
      height:'100%',
      gap:'10px',
      '& h1':{p:'10px'}
  }
  
  //Render
  return (
    <Box sx={styles}>
          
      <DashboardAlert open={alert.open} severity={alert.severity} message={alert.message} onClose={hideAlert}/> 

      <h1>My Digital Bookshelf</h1>
      
      <BookTable 
        bookData={books} 
        onEditButtonClick={handleUpdateOpen} 
        onDeleteButtonClick={handleDeleteOpen}
        loading={loading_status==='pending...'}
        footerContents = {
          <Button variant='contained' color='secondary' onClick={handleCreateOpen} sx={{ml:'8px'}}>Add New Book</Button>
        }
      />


      { 
        updateFormOpen && //Rerender when the form is opened to repopulate the form's default values
        <UpdateForm open={updateFormOpen} onClose={handleUpdateClose} onError={alertError} onSuccess={alertSuccess} book={bookToUpdate}/> 
      }
      {
        createFormOpen && //Rerender when the form is opened to empty the fields
        <CreateForm open={createFormOpen} onClose={handleCreateClose} onError={alertError} onSuccess={alertSuccess} />
      }
      <DeleteForm open={deleteFormOpen} onClose={handleDeleteClose} onError={alertError} onSuccess={alertSuccess} isbn={bookToUpdate.isbn}/>

    </Box>
  )

}
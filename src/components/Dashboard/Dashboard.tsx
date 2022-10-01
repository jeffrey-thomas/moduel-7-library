import { Box } from '@mui/system'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CarState, loadAllCars, selectCars, selectCarStatus } from '../../redux/CarsSlice'
import { store } from '../../redux/store'
import { UpdateForm } from './UpdateForm'
import { CarTable } from './CarTable'
import { DashboardAlert, DashboardAlertDefaultState } from './DashboardAlert'
import { CreateForm } from './CreateForm'
import { Button } from '@mui/material'
import { DeleteForm } from './DeleteForm'

const defaultCar:CarState = {
  vin:'VIN',
  make:'MAKE',
  model:'MODEL',
  year:2022,
  color:'COLOR'
}

export const Dashboard = () => {

  //Get list of cars from redux store, load from database if needed
  let cars = useSelector(selectCars);
  let loading_status = useSelector(selectCarStatus);
  if(loading_status === 'unloaded')
    store.dispatch(loadAllCars());

  //UpdateForm
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [carToUpdate, setCarToUpdate] = useState(defaultCar);

  const handleUpdateOpen = (car:CarState)=>{
    setCarToUpdate(car);
    setUpdateFormOpen(true);
  }
  const handleUpdateClose = ()=>{ setUpdateFormOpen(false); }

  //CreateForm
  const [ createFormOpen, setCreateFormOpen] = useState(false);
  const handleCreateOpen = ()=>{ setCreateFormOpen(true); }
  const handleCreateClose = ()=>{ setCreateFormOpen(false); }

  //DeleteForm
  const [ deleteFormOpen, setDeleteFormOpen ] = useState(false);
  const handleDeleteOpen = (car:CarState)=>{ 
    setCarToUpdate(car);
    setDeleteFormOpen(true);}
  const handleDeleteClose = ()=>{ setDeleteFormOpen(false); }

  //Controls for success/failure alert
  const [alert, setAlert] = useState(DashboardAlertDefaultState);

  const showAlert =()=>{ setAlert({...alert, open:true}); }

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

      <h1>My Car Inventory</h1>
      
      <CarTable 
        carData={cars} 
        onEditButtonClick={handleUpdateOpen} 
        onDeleteButtonClick={handleDeleteOpen}
        footerContents = 
          <Button variant='contained' color='secondary' onClick={handleCreateOpen} sx={{ml:'8px'}}>Create New Car</Button>
        />


      { 
        updateFormOpen && //Rerender when the form is opened to repopulate the form's default values
        <UpdateForm open={updateFormOpen} onClose={handleUpdateClose} onError={alertError} onSuccess={alertSuccess} car={carToUpdate}/> 
      }
      {
        createFormOpen && //Rerender when the form is opened to empty the fields
        <CreateForm open={createFormOpen} onClose={handleCreateClose} onError={alertError} onSuccess={alertSuccess} />
      }
      <DeleteForm open={deleteFormOpen} onClose={handleDeleteClose} onError={alertError} onSuccess={alertSuccess} vin={carToUpdate.vin}/>

    </Box>
  )

}
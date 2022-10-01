import { Delete, Edit } from '@mui/icons-material';
import { IconButton, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { CarState, } from '../../../redux/CarsSlice';
import { Box } from '@mui/system';
import { theme } from '../../../theme';
import { PropsWithChildren, ReactElement } from 'react';
import { CarTableFooter } from './CarTableFooter/CarTableFooter';


interface CarTableProps{
  carData:CarState[],
  onEditButtonClick:(car:CarState)=>void,
  onDeleteButtonClick:(car:CarState)=>void,
  footerContents?:ReactElement
}

export const CarTable = (props:PropsWithChildren<CarTableProps>) => {

  let {carData, onEditButtonClick, onDeleteButtonClick} = props;

  const columns:GridColDef[] = [
    {field:'vin', headerName:'VIN', flex:6},
    {field:'make', headerName:'Make', flex:5},
    {field:'model', headerName:'Model', flex:5},
    {field:'year', headerName:'Year', flex:2},
    {field:'color', headerName:'Color', flex:4},
    {
      field:'actions', 
      headerName:'Actions', 
      flex:2, 
      sortable:false,
      align:'center', 
      renderCell:(params)=>{
        return ( 

          <Box>

            <IconButton onClick={()=>{ onEditButtonClick(params.row); }}>
              <Edit color='primary' sx={{'&:hover':{color:theme.palette.secondary.main}}}/>  
            </IconButton>

            <IconButton onClick={()=>{ onDeleteButtonClick(params.row)}}>
              <Delete color='primary' sx={{'&:hover':{color:theme.palette.secondary.main}}}/>
            </IconButton>

          </Box>

        )
      } 
    }
  ];
  
  const carTableStyles={
      width:'95%',
      height:'100%',
      // p:'20px',
      '& .MuiDataGrid-columnHeader':{
        borderBottom:'1px solid black',
        backgroundColor:'secondary.main',
        color:'primary.contrastText'
      },
      '& .MuiDataGrid-cell:focus-within':{
        outline:'none'
      },
      '& .MuiDataGrid-menuIconButton, & .MuiDataGrid-sortIcon':{
        color:'primary.contrastText'
      },
      '& .even':{
        backgroundColor:'rgba(255,255,255,0.3)'
      },
      '& .MuiDataGrid-footerContainer':{
        backgroundColor:'rgba(0,0,0,0.1)'
      },
  }

  return (
    <Paper sx={carTableStyles}>

      <DataGrid
        sx={{width:'100%'}}
        rows={carData}
        columns={columns}
        pageSize={ 8 }
        rowsPerPageOptions={[8]}
        getRowId={ row=>row.vin}
        disableSelectionOnClick={true}
        showColumnRightBorder={true}
        getRowClassName={(params)=> params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd' }
        components={{Footer:CarTableFooter}}
        componentsProps={{ footer:{ contents: props.footerContents } }}
      />
      
    </Paper>
  )
}

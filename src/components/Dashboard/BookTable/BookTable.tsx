import { Delete, Edit } from '@mui/icons-material';
import { IconButton, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { BookState, } from '../../../redux/BooksSlice';
import { Box } from '@mui/material';
import { theme } from '../../../theme';
import { PropsWithChildren, ReactElement } from 'react';
import { BookTableFooter } from './BookTableFooter';


interface BookTableProps{
  bookData:BookState[],
  onEditButtonClick:(book:BookState)=>void,
  onDeleteButtonClick:(book:BookState)=>void,
  footerContents?:ReactElement
}

export const BookTable = (props:PropsWithChildren<BookTableProps>) => {

  let {bookData, onEditButtonClick, onDeleteButtonClick} = props;

  const columns:GridColDef[] = [
    {field:'isbn', headerName:'ISBN', flex:6},
    {field:'title', headerName:'Title', flex:5},
    {field:'author', headerName:'Author', flex:5},
    {field:'year', headerName:'Year', flex:2},
    {field:'length', headerName:'Pages', flex:2},
    {field:'hardcover', type:'boolean', headerName:'Hardcover', flex:2},
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
  
  const bookTableStyles={
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
    <Paper sx={bookTableStyles}>

      <DataGrid
        sx={{width:'100%'}}
        rows={bookData}
        columns={columns}
        pageSize={ 8 }
        rowsPerPageOptions={[8]}
        getRowId={ row=>row.isbn}
        disableSelectionOnClick={true}
        showColumnRightBorder={true}
        getRowClassName={(params)=> params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd' }
        components={{Footer:BookTableFooter}}
        componentsProps={{ footer:{ contents: props.footerContents } }}
      />
      
    </Paper>
  )
}

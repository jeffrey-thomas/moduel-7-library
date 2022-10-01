import { Box } from '@mui/system';
import carImage from '../../images/undraw_vehicle_sale_a645.svg';
import { NavButton } from '../SharedComponents';

export const Home= () => {

  const style={
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-around',
    height:'95%',
  }

  return (
    <Box sx={style}>
      <h1>Car Inventory App</h1>
      <Box sx={{
        content:`url(${carImage})`,
        width:'50%',
        height:'auto'
      }}></Box>
      <NavButton to='/dashboard' variant='contained'>Go to My Inventory</NavButton>
    </Box>
  )
}

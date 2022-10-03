import { TextField, TextFieldProps } from "@mui/material"
import { Box } from "@mui/system"
import { useFormContext } from "react-hook-form"

type FormInputType = 'text' | 'number' | 'password';

type FormInputProps = TextFieldProps & { field:string, type?:FormInputType};

export const FormInput=({field, type='text', ...textfieldProps}:FormInputProps) => {

    // const {field, ...fieldProps } = props;
    const {register } = useFormContext();

    const style={
        display:'flex',
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        gap:'20px',
        alignItems:'center',
        mb:'10px',
        
    }

    return (
        <Box sx={style}>
                    <label htmlFor={`${field}`}>{textfieldProps.children}</label>
                    <TextField  type={type} {...register(`${field}`,{valueAsNumber:type==='number'})} name={`${field}`} variant='outlined' {...textfieldProps}/>  
        </Box>
    )
}
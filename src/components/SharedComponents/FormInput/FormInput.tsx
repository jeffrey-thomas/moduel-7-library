import { TextField, TextFieldProps } from "@mui/material"
import { Box } from "@mui/system"
import { useFormContext } from "react-hook-form"

type FormInputProps = { field:string; numeric?:boolean} & TextFieldProps;

export const FormInput=({numeric=false,field,...fieldProps}:FormInputProps) => {

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
                    <label htmlFor={`${field}`}>{fieldProps.children}</label>
                    <TextField  type={numeric? 'number' : 'text'} {...register(`${field}`,{valueAsNumber:numeric})} name={`${field}`} variant='outlined' {...fieldProps}/>  
        </Box>
    )
}
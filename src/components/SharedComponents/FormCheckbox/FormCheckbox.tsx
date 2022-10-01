import { CheckboxProps, Checkbox } from "@mui/material"
import { Box } from "@mui/system"
import { useFormContext } from "react-hook-form"

type FormCheckboxProps = { field:string, label:string } & CheckboxProps;

export const FormCheckbox=({field,label,...checkboxProps}:FormCheckboxProps) => {

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
                    <label htmlFor={`${field}`}>{label}</label>
                    <Checkbox  {...register(`${field}`)} name={`${field}`} {...checkboxProps}/>  
        </Box>
    )
}
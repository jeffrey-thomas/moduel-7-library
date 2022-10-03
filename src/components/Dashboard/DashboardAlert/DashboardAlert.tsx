import { Close } from "@mui/icons-material";
import { Alert, AlertColor, Collapse, IconButton } from "@mui/material";

export interface DashboardAlertState{
    open:boolean,
    message:string,
    severity:AlertColor,
}

export const DashboardAlertDefaultState:DashboardAlertState={
    open:false,
    message:'Something went wrong!',
    severity:'error',
}

interface AlertCloser{
    onClose:()=>void
}

type DashboardAlertProps = DashboardAlertState & AlertCloser

export const DashboardAlert = (props:(DashboardAlertState & AlertCloser))=>{

    return(
        <Collapse in={props.open} sx={{position:'absolute', message:{ borderRadius:'0 0 5px 5px'}}}>
            <Alert
              severity={props.severity}
              variant='filled'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={props.onClose}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {props.message}
            </Alert>
          </Collapse>
    )
}
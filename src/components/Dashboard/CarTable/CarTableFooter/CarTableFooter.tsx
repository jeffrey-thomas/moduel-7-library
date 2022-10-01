import { GridFooterContainer, GridPagination } from "@mui/x-data-grid";
import { ReactElement } from "react";

interface CarTableFooterProps{
    contents?:ReactElement
}

export const CarTableFooter=(props:CarTableFooterProps)=>{

    return(
        <GridFooterContainer>
            {props.contents}
            <GridPagination/>
        </GridFooterContainer>
    );
}
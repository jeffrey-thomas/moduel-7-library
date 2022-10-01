import { GridFooterContainer, GridPagination } from "@mui/x-data-grid";
import { ReactElement } from "react";

interface BookTableFooterProps{
    contents?:ReactElement
}

export const BookTableFooter=(props:BookTableFooterProps)=>{

    return(
        <GridFooterContainer>
            {props.contents}
            <GridPagination/>
        </GridFooterContainer>
    );
}
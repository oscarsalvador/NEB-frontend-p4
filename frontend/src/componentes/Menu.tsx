import React, {FC, useState} from "react";
import styled from "@emotion/styled";

const MenuDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    // flex-wrap: wrap;
`;
const BotonSolapa = styled.button`
    width: 35%;
`;

const Menu: FC<{setSolapa: (solapa: string) => void}> = ({
    setSolapa
}) =>{

    return (
        <MenuDiv>
            <BotonSolapa onClick={()=>setSolapa("listar")}> Listar </BotonSolapa>
            <BotonSolapa onClick={()=>setSolapa("nuevo")}> Nuevo </BotonSolapa>
        </MenuDiv>
    )
}

export default Menu;
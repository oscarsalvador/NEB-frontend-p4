import React, {FC, useState, useEffect} from "react"
import Menu from "./Menu";
import SolapaNuevo from "./SolapaNuevo";
import SolapaListar from "./SolapaListar2";
import styled from "@emotion/styled";

// const CustomMenu = styled(Menu)`
//   display: flex;
//   justify-content: space-between;
// `

const Contenedor: FC = () =>{
  const [solapa, setSolapa] = useState<string>("listar");

return (
  <div>
    <Menu setSolapa={setSolapa}/>
    {/* <h1>{solapa}</h1>  para ver que al padre le vuelve el cambio de estado desde el hijo*/}

    <SolapaListar solapa={solapa}/>
    <SolapaNuevo solapa={solapa}/>
  </div>
)
}

export default Contenedor;
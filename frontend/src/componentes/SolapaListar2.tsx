import React, {FC, useEffect, useState} from "react";
import styled from "@emotion/styled"
import axios from "axios";

class UserSchema{
  _id: string =''
  // nombre?: string
  email: string =''
  telefono?: string
}

const PruebaHerencia = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 25%);
  // grid-template-rows: repeat(auto-fill, 100%);
`;
const EntradaLista = styled(PruebaHerencia)<{fondo: boolean}>`
  // display: flex;
  // justify-content: space-around;

  background-color: ${(props) => props.fondo? "white": "azure"};
  &:hover{
    background-color: lightblue;
  }
`;
//vacia, lo que quiero es que no tenga estilos ni responda a hover
const TituloLista = styled(PruebaHerencia)<{fondo: boolean}>`
`;

const BotonBorrar = styled.button`
  border-radius: 30%;
  background-color: maroon;
  &: hover{
    background-color: red
  }
`;
// const AlignIzq = styled.span`
//   float: left;
// `;
// const AlignCen = styled.span`
//   float: center;
// `;
// const AlignDer = styled.span`
//   float: right;
// `;


const SolapaListar: FC<{solapa: string}> = (props) =>{
  const [usrCache, setUsrCache] = useState<UserSchema[]>([]);
  // const [a, seta] = useState<string>("");

  const getUsers = () =>{
    let users: UserSchema[] = [];
    axios.get(`http://localhost:8082/listar`).then(r =>{
      r.data.resultado.forEach((e: any) =>{
        let u: UserSchema = {
          _id: e._id,
          email: e.email,
          telefono: e.telefono
        }
        users.push(u);
        console.log(u)
      })
      // console.log(a)
      // seta("aaaa")
      // console.log(a)

      // console.log(users);
      setUsrCache(users);
      console.log(usrCache);
      // console.log(res.data.resultado)
    })
    // console.log(users);
    // setUsrCache(users)
    // console.log(usrCache);
  }

  const deleteUser = (user: string) =>{
    console.log(user);
    let j = {
      id: user
    }
    axios.delete(`http://localhost:8082/borrar`, {data: j}).then(r =>{
      console.log(r.data)
      location.reload()
    })
  }

  useEffect(() => {
      getUsers();
    }, 
	  	[]
    );

  return (
    <div style={{display: props.solapa === "listar" ? "inline":"none"}}>
      <h1>Lista de elementos</h1>
      <TituloLista key={"nombres"} fondo={true}>
          <h3></h3>
          <h3>Nombre de usuario</h3>
          <h3>Direccion de correo</h3>
          <h3>Numero de telefono</h3>
      </TituloLista>
      {usrCache.map((usuario, index) =>{
          index++
          // return (
          //   <div>
          //     <AlignIzq> {usuario._id} </AlignIzq>
          //     <AlignCen> {usuario.email} </AlignCen>
          //     <AlignDer> {usuario.telefono}</AlignDer>
          //   </div>
          // )
          return(
            <EntradaLista key={usuario._id} fondo={index%2 === 0} >
              <div><BotonBorrar onClick={()=>deleteUser(usuario._id)}>X</BotonBorrar></div>
              <div>{usuario._id}</div>
              <div>{usuario.email}</div>
              <div>{usuario.telefono}</div>
            </EntradaLista>
          )
        }
      )}
    </div>
  )
}

export default SolapaListar;
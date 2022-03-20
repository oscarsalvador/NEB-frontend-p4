import React, {FC, useEffect, useState} from "react";
import axios from "axios";

class UserSchema{
  _id: string =''
  // nombre?: string
  email: string =''
  telefono?: string
}

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

  useEffect(() => {
    axios.get(`http://localhost:8082/listar`).then(r =>{

      console.log(usrCache);
      let users: Array<UserSchema> = new Array(r.data.resultado.length);
      //r.data.resultado.forEach((e: any) =>{
      let i=0;
      let e:any;
      for(e in r.data.resultado) {
        console.log(e);
        let u: UserSchema = new UserSchema;
        u._id=r.data.resultado[e]._id;
        u.email=r.data.resultado[e].email,
        u.telefono=r.data.resultado[e].telefono;
      // {
      //     _id: e._id,
      //     email: e.email,
      //     telefono: e.telefono
      //   }
        users[i]=u;
        i = i+1;

        //users.push(u);
        console.log(u)
      }
      // console.log(a)
      // seta("aaaa")
      // console.log(a)

      console.log(users);
      setUsrCache(users);
      console.log(usrCache);
      // console.log(res.data.resultado)
    })
    // console.log(users);
    // setUsrCache(users)
    // console.log(usrCache);
    }, 
		[]
    );

  return (
    <div style={{display: props.solapa === "listar" ? "inline":"none"}}>
      <h1>Lista de elementos</h1>
      {usrCache.map(usuario =>{
          return <h4> {usuario.email} </h4>
      })}
      <button onClick={()=> getUsers()}/>
    </div>
  )
}

export default SolapaListar;
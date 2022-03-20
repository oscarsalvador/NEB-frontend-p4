import React, {FC, useEffect, useState} from "react";
import axios from "axios";
import styled from "@emotion/styled";

const MiBoton = styled.button<MiBotonType>`
  display: ${(props) => props.cumpleCampos? "inline":"none"};
  `;

  type MiBotonType={
    cumpleCampos: boolean;
  }

  //estilo anidado para "a"
const TextoCampos = styled.span<{text: string}>`
  color: black;
  & > a {
    color: red;
    display: ${(props) => props.text === ""?"inline":"none"};
  }
 `;

const AvisoMail = styled.span<{text: string}>`
  color: red;
  display: ${(props) => props.text === ""?"inline":"none"};
  `;
	

const SolapaNuevo: FC<{solapa: string}> = (props) =>{
  const [usrNames, setUserNames] = useState<string>("");

  const sendPost =  () =>{
    if(!dirValida) return;
    let j = {
      id: text1,
      email: text2,
      telefono: text3            
    }
    axios.post(`http://localhost:8082/insertar`, j).then(r =>{
      console.log(r.data);
      location.reload()
    })
  }

  const validaMail = () => {
    if(text2.length == 0){
      setValida(true); //si no hay nada, que no avise de que es invalido
      return
    }
    let dirValida = /\w+@\w+\.(\w){3}$/g.test(text2);
    console.log(text2)
    console.log(dirValida)
    setValida(dirValida);
  }

  const [color, setColor] = useState<boolean>(false);
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [dirValida, setValida] = useState<boolean>(false);
  const [text3, setText3] = useState<string>("");
    
  useEffect(() =>{
    validaMail();
  }, 
    [text2]
  )

  return (
    <div style={{display: props.solapa == "nuevo" ? "inline":"none"}}>
      <h1>Añadir o actualizar elemento</h1>
      <TextoCampos text={text1}>Nombre <a>*</a></TextoCampos>
      <br/>
      <input type="text"
        placeholder="required"
    	value={text1}
		onChange={(e) => setText1(e.target.value)}
      />
      <br/>
            
      <TextoCampos text={text2}>{dirValida? "Direccion de email" : 
        "Usar correo valido eg. a@a.com"} <a>*</a> </TextoCampos>
      <br/>
      <input type="text"
        placeholder="required"
	    value={text2}
		onChange={(e) => {setText2(e.target.value)}}                
      />
            
      <br/>

      Telefono<br/>
      <input type="text"
        placeholder="optional"
        value={text3}
		onChange={(e) => setText3(e.target.value)}
      />
      <br/>

	  <br/>
	  <MiBoton 
		cumpleCampos={text1.length > 0 && text2.length > 0}
        onClick={sendPost}
	  >
		{dirValida? "Enviar":"Campos incorrectos"}
	  </MiBoton>
    </div>
  )
}

export default SolapaNuevo;
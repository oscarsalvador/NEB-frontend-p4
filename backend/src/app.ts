import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {Collection, MongoClient} from 'mongodb';

interface UserSchema{
  _id: string
  // nombre?: string
  email: string
  telefono?: string
}

// const DB_URL = "http://localhost:8081";mongodb://root:example@mongo:27017/
const DB_URL = "mongodb://root:example@mongo:27017/"
const DB_NAME = "practica4";
const port = 3000;

const client = new MongoClient(DB_URL)
client.connect();
const db = client.db(DB_NAME)
const UserCollection: Collection<UserSchema> =
  db.collection<UserSchema>("Usuarios");

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.delete('/borrar', async (r, res) => {
  console.log("borrar", r.body)

  const found = await UserCollection.findOne({
    _id: r.body.id
  });

  if (found){
    await UserCollection.deleteOne({
      _id: r.body.id
    });
    res.send({
      message: "borrado",
      objeto: found
    });
  } else {
    res.send({
      message: "no existe",
      objeto: r.body
    });
  };
});

app.get('/listar', async (r, res) => {
  const resultado: UserSchema[] = await UserCollection.find().toArray();
  
  res.send({
    // message: "hola",
    resultado
  });
});

// app.post('/insertar', async (r, res) => {
//   console.log("insertar", r.body);

//   let accion = "insertado";
//   const found = await UserCollection.findOne({
//     _id: r.body.j.id
//   });
//   if (!found){
//     await UserCollection.insertOne({
//       _id: r.body.j.id,
//       email: r.body.j.email,
//       telefono: r.body.j.telefono
//     });
//   } else {
//     accion = "modificado";
//     // await UserCollection.updateOne({
//     //     _id: r.body.id
//     //   },{
//     //     $set: {
//     //       email: r.body.email,
//     //       telefono: r.body.telefono
//     //     }
//     //   }
//     // )
//     await UserCollection.updateOne({_id: r.body.id},
//      { $set: {
//        email: r.body.email,
//        telefono: r.body.telefono
//      }
//     })
//   };
//   const found2 = await UserCollection.findOne({
//     _id: r.body.id
//   })
//   console.log(found2)
//   res.send({
//     message: accion,
//     objeto: found2
//   });
// });

app.post('/insertar', async (r, res) => {
  console.log("insertar",r.body);
  
  let accion="insertado"
  const found = await UserCollection.findOne({
    _id: r.body.id
  })
  if (!found){
    await UserCollection.insertOne({
      _id: r.body.id,
      email: r.body.email,
      telefono: r.body.telefono
    })
  } else {
    accion="modificado"
    await UserCollection.updateOne({_id: r.body.id},
      { $set: {
          email: r.body.email,
          telefono: r.body.telefono
    }})
  }
  const found2 = await UserCollection.findOne({
    _id: r.body.id
  })
  res.send({
    "message": accion,
    "objeto": found2
  })
});


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

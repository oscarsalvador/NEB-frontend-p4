"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongodb_1 = require("mongodb");
// const DB_URL = "http://localhost:8081";mongodb://root:example@mongo:27017/
const DB_URL = "mongodb://root:example@mongo:27017/";
const DB_NAME = "practica4";
const port = 3000;
const client = new mongodb_1.MongoClient(DB_URL);
client.connect();
const db = client.db(DB_NAME);
const UserCollection = db.collection("Usuarios");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded());
app.delete('/borrar', (r, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("borrar", r.body);
    const found = yield UserCollection.findOne({
        _id: r.body.id
    });
    if (found) {
        yield UserCollection.deleteOne({
            _id: r.body.id
        });
        res.send({
            message: "borrado",
            objeto: found
        });
    }
    else {
        res.send({
            message: "no existe",
            objeto: r.body
        });
    }
    ;
}));
app.get('/listar', (r, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield UserCollection.find().toArray();
    res.send({
        // message: "hola",
        resultado
    });
}));
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
app.post('/insertar', (r, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("insertar", r.body);
    let accion = "insertado";
    const found = yield UserCollection.findOne({
        _id: r.body.id
    });
    if (!found) {
        yield UserCollection.insertOne({
            _id: r.body.id,
            email: r.body.email,
            telefono: r.body.telefono
        });
    }
    else {
        accion = "modificado";
        yield UserCollection.updateOne({ _id: r.body.id }, { $set: {
                email: r.body.email,
                telefono: r.body.telefono
            } });
    }
    const found2 = yield UserCollection.findOne({
        _id: r.body.id
    });
    res.send({
        "message": accion,
        "objeto": found2
    });
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map
//acá vamos a empezar a tirar toda la config que necesitamos p/trabajar con el back -> hacer las config necesarias p/q quede configurado el backend
//lo 1ero que vamos a utilizar es www.babeljs.io
//node.js, p/hacer las importaciones en lugar de usar la palabra "import", nos pide la palabra "require", ej:
//                     entre "" pongo el nombre de la librería a la cual quiero acceder
//const hola = require(""); --> como ésto es medio molesto, se utiliza babel

//babel es un compilador que nos permite utilizar lenguaje de nueva generación de js y lo traduce en un lenguaje de vieja generación p/q todos los vanegadores tengan acceso al mismo
//instalar una serie de librerias necesarias que hacen referencia a babel -> p/q en lugar de usar el "require" usemos el "import"
//npm install @babel/cli @babel/core @babel/node @babel/preset-env

//#region creación de backend con node js sin babel, exportación con require y express
/* 
//con node js es module.exports = {} -> es un obj que va a recibir los módulos que vamos a exportar

//éste de abajo es todo el código que se necesita p/hacer un back con node js, sin babel

//npm install express (express es una librería que me va a devolver una función, es decir, es una func, lo tengo que ejecutar, pero esta func me va a devolver toda la config de mi proyecto)
//ahora vamos a hacer con "require"
const express = require("express");

//estamos trayendo la librería de express p/usarla
//vamos a crear una variable que se va a llamar app, y la vamos a igualar a express
const app = express();

//app tiene todos estos verbos configurados a través de
//este get hace referencia al verbo que yo quiero que tenga mi endpoint (puede ser cualquier otro)
//estos verbos son funciones que reciben parámetros -> 1ero la url a la cual hay que ir , 2do una func (que en este caso va a devolver un "hola mundo" en html) que recibe dos paráms puntuales: el request y el response
//      url base, que en este caso va a ser localhost y el puerto que le indiquemos barra (localhost:puerto/)
//            el obj request hace ref a todos los datos que traemos del front -> todo el obj que me envía el front
//                 response es el obj que vamos a usar para responderle al front
app.get("/", (req, res) => {
  //en este caso vamos a usar res.send, que es un método p/enviar info al front, p/enviar una respuesta
  //cuando accedamos a la barra diagonal (/) vamos a poder acceder al "Hola Mudno" que me va a estar enviando el backend
  res.send("<h1>Hola Mundo</h1>"); // -> string creado a mano
});

//ahora tenemos que crear nstra aplic -> p/eso vamos a utilizar un método que tmb tiene
//  listen es un método al cual le voy a indicar como 1er parám el puerto al que quiero acceder, 2do recibo una func
app.listen(3000, () => {
  console.log("Escuchando puerto 3000");
});

//si pongo " node index.js " en la terminal, me dice que está escuchando el puerto y ahí puedo poner en la barra de navegación de la web " localhost:3000/ " (la / no es necesaria en este caso) y me lleva al "Hola Mundo"

//si hago algún cambio (por ej agregarles oo al Hola Mundo), tengo que escribir Ctrl+C en la terminal y tirar mi servidor y volver a escribir node index.js p/que se actualicen los cambios

*/
//#endregion

//#region -- con babel -> agregando en package.json en "scripst" "dev/start": "nodemon index.js --exec babel-node"
//                                                                                              ésto es lo que agreggo (ejecutar babel-node)
//ya tenemos .babelrc con los presets configurado
//con babel es export y export default

import express from "express";
import cors from "cors";

const app = express();

//vamos a crear un array
let arrayEmpleados = [
  //acá vamos a poner un obj
  {
    id: 1,
    nombre: "Candelaria",
    apellido: "VM",
    dni: "39.000.000",
  },
  {
    id: 2,
    nombre: "Woli",
    apellido: "VM",
    dni: "35.111.222",
  },
];

//el cuerpo siempre se condifica, p/decodificarlo configuramos el parseo del body con la línea de código de abajo
//le estamos diciendo que use un método de express que va a convertir el cuerpo en un json y nos va a permitir decodificarlo -> ya me aparece la info en la terminal en lugar de undefined cuando envío la petición desde postman (post)
app.use(express.json());
//cors, librería que instalo npm istall cors
//instalar una librería y pasarle el método como parámetro al use
//dsp la pongo acá, es una func que tenemos que importar arriba cors
//como es una func la ejecutamos directam dentro del app.use
app.use(cors());

//ir creando las url p/q cuando acceda a los empleado pueda gestionarlos

//dejo éste app.get p/q me sirva de referencia
app.get("/", (req, res) => {
  //especie de return (?
  //en este caso vamos a usar res.send, que es un método p/enviar info al front, p/enviar una respuesta
  //cuando accedamos a la barra diagonal (/) vamos a poder acceder al "Hola Mudno" que me va a estar enviando el backend
  res.send("<h1>Hola Mundo</h1>"); // -> string creado a mano
});

//  get p/leer un empleado
//       que cuando el usuario entre a /empleados, que me devuelva toda la lista de los empleados
app.get("/empleados", (req, res) => {
  //especie de return (?
  //acá simplemente le estamos indicando que le vamos a devolver un obj, que va a ser arrayEmpleados
  //puedo acceder al body de la petición como si fuera un obj pq ya está convertido en obj (?
  res.json(arrayEmpleados);
});

//                  query param -> cuando viene atrás de la " / " como si fuera una url --> dist de query string, que viene con el " ? "
//                  misma nomenclatura de react
app.get("/empleados/:id", (req, res) => {
  //como acá tenemos que recibir el id en la url, cómo obtengo éste param? (el query param) -> obtenido desde request punto params
  //      el id que está llegando acá es un string, y lo tengo que convertir el un entero (pq los id del array son enteros)
  const { id } = req.params; // -> ahí puedo obtener ese id (el de la url)
  //    acá habíamos puesto arrayFiltrado 1ero
  //                                  vamos a buscar el empleado, que el empleado.id sea === al id que me están pasando
  //                                                                 el " + " p/convertirlo en entero (si no se lo puede parsear, hacerle un parse)
  //                                                                 el símbolo "+" adelante de un string es una conversión en entero implícita
  const empleado = arrayEmpleados.find((empleado) => empleado.id === +id);
  //especie de return (?
  res.json({
    //porque simplemente queremos indicarle que salió todo ok
    ok: true,
    //y le vamos a enviar el data, que va a ser el empleado
    data: empleado,
  });
});

//  post p/agregar un empleado
//        si bien estoy colocando la misma url que en get, va a funcionar pq el verbo es distinto(?
app.post("/empleados", (req, res) => {
  //estoy tomando los datos del body
  //acá vamos a hacer destructuring del body - del cuerpo de la petición
  //    voy a obtener nombre, apellido y dni de req.body
  const { nombre, apellido, dni } = req.body;

  //acá estoy creando un obj
  const nuevoEmpleado = {
    //el id me va a permitir buscar en el array de empleado p/traer el obj (?
    //            porque le quiero sumar 1 al array
    id: arrayEmpleados.length + 1,
    //no estoy colocando éstas propiedades, pq como se llaman igual ya está (igual con el destruct de arriba(? )
    nombre,
    apellido,
    dni,
  };

  //acá estoy almacenando en un array
  arrayEmpleados.push(nuevoEmpleado);
  //especie de return (?
  //de ésta forma ya le estoy respondiendo un json, le estoy diciendo que me responda un json que va a tener una propiedad que se llame ok true
  //ésto me devuelve en la petición del post en postman
  res.json({
    ok: true,
  });
});

//              como quiero hacer una actualización, tmb voy a necesitar el id
app.put("/empleados/:id", (req, res) => {
  //1ero vamos a tomar el id de la request . params
  const { id } = req.params;
  //y vamos a  tomar nombre, apellido y dni de request . body
  const { nombre, apellido, dni } = req.body;
  const arrayNuevo = arrayEmpleados.filter((empleado) => empleado.id !== +id); // -> necesito quitar 1ero el elem del array
  //    destructuring de ese array
  const [filter] = arrayEmpleados.filter((empleado) => empleado.id === +id); // -> necesito dsp buscar el elem p/traerlo
  //filter me devuelve un array
  //              cuando lo pongo acá es que se ilumina en la const (?
  filter.nombre = nombre;
  filter.apellido = apellido;
  filter.dni = dni;

  //              le vamos a pasar de nuevo filter, que recordemos va a tener el id
  arrayNuevo.push(filter);

  arrayEmpleados = arrayNuevo;

  //especie de return(?
  res.json({
    ok: true,
  });
});

app.delete("/empleados/:id", (req, res) => {
  //volvemos a tomar el id de la request . params
  //   obtenemos el id de las params que va a mandar de la request (las params son las que están dsp de la barra diagonal " / ")
  const { id } = req.params;
  //                                     mismo filtro que hicimos antes (?
  //buscamos el array y obtenemos todos los elems que no tengan el mismo id - acá estoy eliminando el elem del array
  const arraySinElemento = arrayEmpleados.filter(
    (empleado) => empleado.id !== +id
  );

  //igualamos nstro array anterior con el nuevo array
  arrayEmpleados = arraySinElemento;

  //devolvemos la respuesta
  res.json({
    ok: true,
  });
});

//ahora tenemos que crear nstra aplic -> p/eso vamos a utilizar un método que tmb tiene
//  listen es un método al cual le voy a indicar como 1er parám el puerto al que quiero acceder, 2do recibo una func
app.listen(3000, () => {
  console.log("Escuchando puerto 3000");
});

//postman:
//-headers -> info del encabezado p/la configuración de la petición
//-body -> el cuerpo de mis peticiones -> el cuerpo es donde voy a mandar toda la info de la petición que quiero almacenar

//ahora estamos usando un array -> clase que viene vamos a usar una base de datos

//CRUD en node js terminado
//éste es el crud que queremos utilizar p/trabajar en el front
//ya tenemos urls p/trabajar con el back

//#endregion

//archivo easy-front
// cómo react se va a conectar con node js p/q podamos traer los empleados y mostrarlos a medida que vamos haciendo peticiones

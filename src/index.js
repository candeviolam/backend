//index dentro de src, y en le package.json tengo que configurar donde diga index la ruta correcta (./src/index.js) -> arch ppal del proyecto -> configurar la inicialización p/q funcione

//acá vamos a empezar a tirar toda la config que necesitamos p/trabajar con el back -> hacer las config necesarias p/q quede configurado el backend
//lo 1ero que vamos a utilizar es www.babeljs.io

//babel es un compilador que nos permite utilizar lenguaje de nueva generación de js y lo traduce en un lenguaje de vieja generación p/q todos los vanegadores tengan acceso al mismo
//instalar una serie de librerias necesarias que hacen referencia a babel -> p/q en lugar de usar el "require" usemos el "import"
//npm install @babel/cli @babel/core @babel/node @babel/preset-env

//#region -- con babel -> agregando en package.json en "scripst" "dev/start": "nodemon index.js --exec babel-node"
//                                                                                              ésto es lo que agreggo (ejecutar babel-node)
//ya tenemos .babelrc con los presets configurado
//con babel es export y export default

import express from "express";
import cors from "cors";
//importar el archivo de la base de datos -> importamos la func connect de db.js
import connect from "./database/db"; // abajo antes de que se ponga el app.listen podemos poner "connect"
//ya puedo acceder al modelo del empleado
import empleadoSchema from "./models/empleado"; // -> lo usamos p/crear y traer empleados (?

const app = express();

//ahora con MongoDB
//vamos a crear un empleado y vamos a traer los empleados p/leerlos p/ya no vamos a usar el array (arrayEmpleados) pq ya no sirve
//vamos a importar arriba el esquema de la bd

//vamos a empezar a usar el esquema del empleado abajo
//1ero necesitamos crear el empleado -> vamos a disponer un endpoint a través del cuál vamos a crear el empleado -> vamos a usar el post

//el cuerpo siempre se condifica, p/decodificarlo configuramos el parseo del body con la línea de código de abajo
//le estamos diciendo que use un método de express que va a convertir el cuerpo en un json y nos va a permitir decodificarlo -> ya me aparece la info en la terminal en lugar de undefined cuando envío la petición desde postman (post)
app.use(express.json());
//cors, librería que instalo npm istall cors
//instalar una librería y pasarle el método como parámetro al use
//dsp la pongo acá, es una func que tenemos que importar arriba cors
//como es una func la ejecutamos directam dentro del app.use
app.use(cors());

//los verbos son endpoints (?
//ir creando las url p/q cuando acceda a los empleado pueda gestionarlos

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

//vamos a empezar a usar el esquema del empleado
//vamos a disponer de éste endpoint p/crear el empleado
//  post p/agregar un empleado
//acá tenemos la resolución de nstro esquema -> ahora crear ese empleado en la base de datos --> me voy al postman a probar
app.post("/empleados", (req, res) => {
  //estoy recuperando los datos del body que me va a enviar el usuario
  //acá vamos a hacer destructuring del body - del cuerpo de la petición
  //    voy a obtener nombre, apellido y dni de req.body
  const { nombre, apellido, dni } = req.body;

  //borramos la const donde estabamos creando el nuevoEmpleado pq no hace falta que haga eso, y borro el push
  //vamos a configurar mejor el res.json

  //vamos a crear la ruta p/poder crear un nuevo empleado/registro/documento dentro de nstra base de datos
  //vamos a utilizar el esquema que acabamo de importar p/crear ese empleado
  //vamos a envolver esto en un try/catch p/probar que funcione -> puede ser con un promise.then tmb pq devuelve promesas
  //1ero lo vamos a hacer con promesa

  //                                  propiedad que si me apoyo veo que recibe nombre, apellido, dni como la const de arriba
  //ésto me devuelve una promesa, con esa promesa tengo que enviarle la info a nstro usuario en base a esa promesa
  /* ésto tenía escrito y lo tranformé a promesa (?
  const nuevoEmpleado = empleadoSchema.create({
    nombre,
    apellido,
    dni,
  });
  */
  empleadoSchema
    .create({
      nombre,
      apellido,
      dni,
    })
    //vamos a recibir la respuesta de la base de datos, y si la resp entra por el then, tenemos la respuesta del empleado creado
    .then((res) => {
      //una vez que se almacene un documento en la base de datos (el esquema de arriba), la repsuesta de la base siempre es el documento que acaba de crear
      /* ésta varible estaba hecha si en el res.json de abajo devolvía nuevoEmpleado en data
      const nuevoEmpleado = res;
      */

      res.json({
        ok: true,
        //    podemos devolver res o nuevoEmpleado, según sea más "cómodo", si uso res, me ahorro de usar la variable que había creado y dejé comentada arriba
        data: res,
      });
    })
    //acá devuelvo un error en caso de que falle todo
    .catch((err) => {
      console.log(err);
      res.json({
        ok: false,
        error: err,
      });
    });
});

//comentar el put y el delete

/*
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
 */

/* 
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
*/

//de ésta forma nos comunicamos a la base de datos y escuchamos (el connect y el listen)

connect(); // la acabamos de importar arriba de db.js

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

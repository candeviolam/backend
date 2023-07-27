//en el index, dentro de c/u de las rutas que hemos creado vamos a trabajar

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
//     e o E ?
//     objeto de tipo esquema que me va a prover de todas la funcionalidades sobre el documento "empleados" de mongoDBCompass por ej
import EmpleadoSchema from "./models/empleado"; // -> lo usamos p/crear y traer empleados (?

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

//cuando estamos en la ruta usamos el esquema, que es el obj que estoy exportando en empleado.js, el esquema me va a permitir realizar todas las acciones sobre la bd

//get p/traer los empleados de la base de datos gracias a la librería/? importada arriba (empleadoSchema)
//  get p/leer un empleado
//       que cuando el usuario entre a /empleados, que me devuelva toda la lista de los empleados
app.get("/empleados", (req, res) => {
  //especie de return (?
  //acá simplemente le estamos indicando que le vamos a devolver un obj, que va a ser arrayEmpleados
  //puedo acceder al body de la petición como si fuera un obj pq ya está convertido en obj (?
  //acá get estaba haciendo res.json del array de empleados ( res.json(arrayEmpleados); ), como el array de empleados ya no existe, eso va a marcar error, entonces tenemos que obtener todos los empleados
  //vamos a hacer el get así traemos todos los empleados, cómo obtener todos los empleados..
  //             tiene una func que se llama find, y el find ya directamente trae todo // find me devuelve una query
  EmpleadoSchema.find()
    //.then o .exec (execute) según estemos haciendo con promesa o con asincronía, pero cualq puede ser -> exec no hace falta que se use cuando usamos asincronía
    //.exec para ejecutar la query que me devuelve find, y éste ejecutar ya nos devuelve una promesa que ya la podemos trabajar y obtener el resultado de la query que acabamos de ejecutar
    .exec()
    //si se va por el then es pq respondió correctamente, en ese caso voy a tomar los resultados (results) y voy a crear un json -> respuesta del then
    .then((results) => { // -> objeto de respuesta, puedo crearlo como quiera
      //opción 2 -> let htmlString = '';

      //                           por cada elemento => ..
      //opc 2.1 -> results.forEach(el => {
      //  htmlString += `<h1>${el.nombre}</h1>`;
      //})

      res.json({
        // este obj puede ser tan complejo como quiera (dentro de json puedo mandar objs, arrays, html, etc) --> por ej la api de rick&morty devuelve dos objs, el obj info con la pag anterio, siguiente, cantidad de , etc; y el obj results con los resultados directam (name, id, status, gender, etc)
        ok: true,
        data: results, // acá ya veo los resultados en la consola de postman con el get
        //opción 1 -> html: `<h1>${results[0].nombre}</h1>`, // -> a ésto lo puedo ver en postman cuando hago la petición
        //opc 2.2 -> html: htmlString,    -------->>>>>>> dsp les haría un useState a los html en App.jsx de easy-front
      });
    })
    .catch((err) => { // -> obj de error, puedo crearlo como quiera
      console.log(err);
      res.json({
        ok: false, // p/q no me devuelva nada(?
        err, // le pasamos el error que tenemos ahí
      });
    });
});

//dsp de haber hecho el get de arriba, vamos a arreglar éste get
//este get nos va a permitir obtener el empleado a través del id
//                  query param -> cuando viene atrás de la " / " como si fuera una url --> dist de query string, que viene con el " ? "
//                  misma nomenclatura de react
app.get("/empleados/:id", (req, res) => {
  //como acá tenemos que recibir el id en la url, cómo obtengo éste param? (el query param) -> obtenido desde request punto params
  //      el id que está llegando acá es un string, y lo tengo que convertir el un entero (pq los id del array son enteros)
  const { id } = req.params; // -> ahí puedo obtener ese id (el de la url)

  //podría haber hecho un empleadoSchema.find({}) que el find reciba un obj y en ese obj poner las propiedades que quiero que tenga iguales, pero más sencillo como está abajo
  //             propiedad que se llama findById a la que le paso el id
  EmpleadoSchema.findById(id)
    //.exec de nuevo p/ejecutar la func
    .exec()
    //     cuando llegue el resultado vamos a responder res.json....
    .then((result) => {
      res.json({
        ok: true,
        data: result,
      });
    });
  //p/chequear que funcione(? si quiero obtener este empleado a través del id (findById(id)), le tengo que mandar el object id -> me voy a postman, copio el obj id del empleado en el get, duplico la ventana del get y en la url pongo " / " y pego el id, hago la petición y me devuelve el empleado
});

//ahora vamos a probar el front en easy-front dsp de haber hecho los dos get de arriba

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
  EmpleadoSchema.create({
    nombre,
    apellido,
    dni,
  })
    //vamos a recibir la respuesta de la base de datos, y si la resp entra por el then, tenemos la respuesta del empleado creado
    //     acá decía "res" pero es un problema pq le puse el mismo nombre al obj que recibe (?
    .then((response) => {
      //una vez que se almacene un documento en la base de datos (el esquema de arriba), la repsuesta de la base siempre es el documento que acaba de crear
      /* ésta varible estaba hecha si en el res.json de abajo devolvía nuevoEmpleado en data
      const nuevoEmpleado = res;
      */

      res.json({
        ok: true,
        //    podemos devolver res o nuevoEmpleado, según sea más "cómodo", si uso res, me ahorro de usar la variable que había creado y dejé comentada arriba
        data: response,
      });
    })
    //acá devuelvo un error en caso de que falle todo
    .catch((err) => {
      console.log(err); // me aparece en la terminal dsp de hacer la petición en el postman(?
      res.json({
        ok: false,
        error: err,
      });
    });
  //cuando hago la petición en postman ya me aparece el empleado y ya debería haberse guardado en mongodbCompass
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

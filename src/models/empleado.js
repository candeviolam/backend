//los modelos son representaciones de los objetos con los que queremos trabajar en la base de datos

//     con la librería de mongoose declaramos el modelo de datos que es un obj de tipo schema que lo importamos de la librería, y a eso nosotros le creamos un modelo (abajo en el export)
//los modelos los vamos a crear con mongoose, y de mongoose vamos a tomar un obj que se llama Schema, Schema es una clase
//               haciendo destructuring de schema
import mongoose, { Schema } from "mongoose";

//ésto es nodejs
//                         la clase schema me permite crear justamente un esquema de la base de datos o un esquema del obj que quiero que esté en la base de datos, y exigir que ese esquema cumpla con una configuración o no (x ej un ejemplo que nos dio de fecha_creacion)
//vamos a crear un schema -> esquema/estructura del empleado
//                         recibe un obj gigante por dentro q va a ser un json q va a representar la configuración de la bd
//                         el schema recibe por constructor un objeto -> la clase schema recibe un obj json entre paréntesis
const empleadoSchema = new Schema({
  //traigo los empleados que tengo en el array en el index.js
  /*
    {
    id: 1,
    nombre: "Candelaria",
    apellido: "VM",
    dni: "39.000.000",
    }
*/
  //no necesito poner la propiedad id, pq mongo se encarga de crearla por mi
  //la prop nombre puede ser un obj que va a decir/tener..
  nombre: {
    type: String, //tenemos los otros tipos de datos p/trabajar tmb, Number, Boolean, etc
    require: true, // -> indicando que este campo es obligatorio
  },
  //podría poner directam apellido: String, ,pero le agrego el require pq el campo si es requerido
  apellido: {
    type: String,
    require: true,
  },
  dni: {
    type: String,
    require: true,
  },
});

/*
//                     (viene desde arriba) al obj schema de la librería mongoose le creamos un modelo con el método .model al cual le asignamos un alias ("Empleado")(?
//una vez que creo el modelo lo exporto -> indico cuál es el nombre del modelo no en la base, sino en el proyecto en sí -> me voy a referir al esquema este como Empleado
//exportar un obj que me va a traer todas las funcionalidades del empleado (?
//                            éste método lo que hace es recibir como parám el tipo del nombre del modelo/la colección(? (Empleado dentro de ProyectoA -> chequear en MonDBCompass) -> mismo nombre p/q la librería sepa adonde quiero almacenar, es el Empleado que se llama así en la base de datos
//                                        como 2do parám le pasamos el esquema que acabamos de crear
export default mongoose.model("Empleado", empleadoSchema);
//este objeto usamos en index.js
// el esquema es el obj que estoy exportando, que me va a permitir realizar todas las acciones sobre la bd -> leer, modificar etc , pero solo de el documento " empleados " en este de caso, de mongodbCompass 
// cada modelo gestiona un documento de mongodbCompass (siguiendo el renglón de arriba)
*/


// cambié el mongoose model, en lugar de exportarlo directamente lo almaceno en una variable 

//                 (viene desde arriba) al obj schema de la librería mongoose le creamos un modelo con el método .model al cual le asignamos un alias ("Empleado")(?
//cambié el mongoose model, en lugar de exportarlo directamente lo almaceno en una variable 
//                                éste método lo que hace es recibir como parám el tipo del nombre del modelo/la colección(? (Empleado dentro de ProyectoA -> chequear en MonDBCompass) -> mismo nombre p/q la librería sepa adonde quiero almacenar, es el Empleado que se llama así en la base de datos
//                                            como 2do parám le pasamos el esquema que acabamos de crear
const EmpleadoDb = mongoose.model("Empleado", empleadoSchema);

//una vez que creo el modelo lo exporto -> indico cuál es el nombre del modelo no en la base, sino en el proyecto en sí -> me voy a referir al esquema este como Empleado
//exportar un obj que me va a traer todas las funcionalidades del empleado (?
export default EmpleadoDb;
//este objeto usamos en index.js
// el esquema es el obj que estoy exportando, que me va a permitir realizar todas las acciones sobre la bd -> leer, modificar etc , pero solo de el documento " empleados " en este de caso, de mongodbCompass 
// cada modelo gestiona un documento de mongodbCompass (siguiendo el renglón de arriba)

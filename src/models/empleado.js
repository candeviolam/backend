//               haciendo destructuring de schema
import mongoose, { Schema } from "mongoose";

//vamos a crear un schema -> esquema/estructura del empleado
//                         recibe un obj gigante por dentro q va a ser un json q va a representar la configuración de la bd
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

//exportar un obj que me va a traer todas las funcionalidades del empleado (?
//                            éste método lo que hace es recibir como parám el tipo del nombre del modelo/la colección(? (Empleado dentro de ProyectoA -> chequear en MonDBCompass) -> mismo nombre p/q la librería sepa adonde quiero almacenar, es el Empleado que se llama así en la base de datos
//                                        como 2do parám le pasamos el esquema que acabamos de crear
export default mongoose.model("Empleado", empleadoSchema);

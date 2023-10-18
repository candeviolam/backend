//el controller es un archivo/un servicio (porque es un lugar donde va a haber lógica), que va a ejecutar la lógica que nos. queremos ejecutar en la ruta pero sin necesidad de meter todo el chorizo de código en el index.js (p/segmentar)

//     es la exportación que estamos haceindo en empleado.js
//     EmpleadoDb me va a proveer de todas las funciones para poder interactuar con la base de datos, entonces lo tengo que llamar porque acá a éste obj porque acá es dónde voy a hacer esa lógica
import EmpleadoDb from "../models/empleado";

//voy a crear las funciones que necesito para por ej leer un empleado
//asíncronas para que sea más limpio el código
//                          lo que va a recibir esta func por parámetros va a ser la request y la response (ya vamos a ver porqué recibimos estos paráms)
async function GetEmployees(req, res) {
  //tomo la lógica que tenía en index.js en el 1er get y me la traigo

  //voy a envolver todo en un trycatch, pq necesito que el sist intente hacer lo que pongo en el try, y que en caso de que eso falle, el catch obtenga el error y me lo escriba en la consola
  try {
    //                               tiene una func que se llama find, y el find ya directamente trae todo // find me devuelve una query
    //                    en lugar de llamarse EmpleadoSchema como estaba antes, se llama EmpleadoDb porque es lo que acabamos de ejecutar
    //lo pongo en una constante a lo que traje del get del index.js
    const results = await EmpleadoDb.find();
    //ya no necesito toda la lógica que tenía acá abajo adentro del get porque voy a usar un await en el renglón de arriba -> al usar un await ya no necesito ejecutar la función, pq la func me devuelve una promesa tranquilamente y no hace falta que haga el exec

    /*borró esto que está comentado, no va 
    //const res = await results.json(); // await pq results.json() es una promesa
    //resumo la línea de código del renglón de arriba como: 
    return await results.json(); // -> de esta forma ya estoy obteniendo los distintos resultados que nos ofrece
    */

    //una vez que tenemos los resultados, tenemos que enviar estos resultado a través de la respuesta (el "res" del parám)
    //traemos el obj de la respuesta para poder hacer res.json()
    return res.json({
      ok: true,
      data: results,
    });
  } catch (error) {
    // de esta forma, en caso de que rompa, tmb vamos a trabajar y vamos a mandar una respuesta
    console.log(error);
    //tmb podemos hacer:
    //            decirle que es un status 400
    //                        y vamos a decir que el json que vamos a mandar va a decir ok: false...
    return res.status(400).json({
      ok: false,
      //el msj de error
      error_msg: error,
    });
  }
}

//los que no usan babel y usan require, tienen que hacer module.exports = {}
//vamos a exportar GetEmployees
export { GetEmployees }; // --> ahora me voy al index.js donde está el app.get y vamos a importar GetEmployees

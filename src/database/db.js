//     librería que instalamos en la terminal (npm install mongoose)
//en este archivo tenemos hecha con la librería toda la conexión

import mongoose from "mongoose";

//configs iniciales p/crear nstra base de datos

//            config q sirve p/q cuando envíe una query a la base de datos, me exija que cumpla tanto los requerimientos que está mandando la query como lo que dice la cadena de la query -> la query a la base de datos por detrás son strings
//            con ésto digo que se apegue a los caracteres y a las distintas letras que le voy a mandar
mongoose.set("strictQuery"); // creo q strictQuery ya no es obligatorio usarlo (?

//connection string -> cadena de conexión -> un string que por dentro indica cómo nos vamos a conectar a nstra base de datos -> especie de url con nombre, contraseña, el cluster al cual quiero acceder, etc (lo que está abajo)
function connect() {
  //ésta func va a usar mongoose.connect() que es una func que tiene mongoose
  //        y en connect le vamos a pasar la cadena de conexión -> ésta la saco de MongoDbCompass, en mi archivo (33i por ej) voy a connect (arriba a la izq), pongo disconnect y vuelve a donde tuve que pegar la direcc c/usuario y contraseña, habilito Edit Connection String, copio la direcc c/usu y contra, la deshabilito dsp y la pego acá (dsp la vamos a esconder pero por ahora está acá)
  // si me fijo, "connect" me devuelve una promesa, así que uso el .then()
  mongoose
    //cuando ejecuto el método connect, la librería intenta conectarse a la base de datos y probar que funcione (en mongodbCompass), si se conecta, como es una promesa, me devuelve el console.log que hice en el .then etc..
    .connect(
      //                                                                       nodo al cual quiero acceder de mi proyecto
      //                                                                       le agregué ProyectoA p/apuntarle a la base de datos de mongodbCompass y se guarde dónde yo quiero , p/q vaya a la bd y no al proyecto en gral
      //                                                                       puedo ponerle acá la direcc sin haberla creado en mondosbCompass, y cuando haga la petición en postman me la va a crear el mongodbC automáticamente
      "mongodb+srv://candeviolam:PgZYc78EF1fJ4Xyt@cluster0.q1ue8om.mongodb.net/ProyectoA"
    )
    //si la base de datos se conectó correctamente, un console loge
    .then((res) => console.log("Conectado correctamente a la bd.")) // lo veo al console.log en la terminal
    //si la base de datos que marca algún error o no me puedo conectar, el .catch()
    .catch((err) => console.log(err));
}

//ahora exporto la func, la necesito llamar dentro de index
export default connect;

//ahora necesitamos crear todas las configs p/poder trabajar con la base de datos -> p/eso usamos la librería de mongoose y vamos creando todos los archivos que necesitamos p/trabajar
//dentro de src, carpeta que se llama "models" -> modelos de cómo tiene que ser el obj que voy a enviar a la base de datos
//utilizando los models vamos a poder crear un obj que va a tener todas las funcs específicas p/gestionar en la b. de d. las distintas interacciones que quiera realizar, y nos va a proveer de todo eso creando solo el modelo, y tmb (p/poder acceder a las funcs) estamos creando una estructura predefinida p/poder alamacenar estos datos en la bd y exigirle al usuario o no que estos datos estén y tener una consistencia en todos los datos

function readResponseServer (code) {
  switch (code) {
    case 200:
        return 200+": La solicitud ha tenido éxito"
      break;
    case 201:
        return 201+": La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado de ello"
      break;
    case 202:
        return 202+": La solicitud se ha recibido, pero aún no se ha actuado"
      break;
    case 203:
        return 203+": La petición se ha completado con éxito, pero su contenido no se ha obtenido de la fuente originalmente solicitada"
      break;
    case 204:
        return 204+": La petición se ha completado con éxito pero su respuesta no tiene ningún contenido"
      break;
    case 205:
        return 205+": La petición se ha completado con éxito, pero su respuesta no tiene contenidos y además, el agente de usuario tiene que inicializar la página desde la que se realizó la petición"
      break;
    case 206:
        return 206+": La petición servirá parcialmente el contenido solicitado"
      break;
    case 207:
        return 207+": Una respuesta Multi-Estado transmite información sobre varios recursos en situaciones en las que varios códigos de estado podrían ser apropiados"
      break;
    case 208:
        return 208+": El listado de elementos DAV ya se notificó previamente"
      break;
    case 226:
        return 226+": El servidor ha cumplido una petición GET "
      break;

    case 300:
        return 300+": Esta solicitud tiene más de una posible respuesta"
      break;
    case 301:
        return 301+": URI  del recurso solicitado ha sido cambiado"
      break;
    case 302:
        return 302+": La URI solicitada ha sido cambiado temporalmente"
      break;
    case 303:
        return 303+": Nuevo recurso solcitado a otra direcció"
      break;
    case 304:
        return 304+": La respuesta no ha sido modificada."
      break;
    case 305:
        return 305+": La  respuesta solicitada debe ser accedida desde un proxy."
      break;
    case 306:
        return 306+": Actualmente se encuentra reservado"
      break;
    case 307:
        return 307+": Recurso solicitado a otra URI con el mismo metodo que se uso la petición anterior"
      break;
    case 308:
        return 308+": El recurso ahora se encuentra permanentemente en otra URI"
      break;

    case 400:
        return 400+": El servidor no pudo interpretar la solicitud dada una sintaxis inválida."
      break;
    case 401:
        return 401+": Es necesario autenticar para obtener la respuesta solicitada"
      break;
    case 402:
        return 402+": Este código de respuesta está reservado para futuros usos"
      break;
    case 403:
        return 403+": El cliente no posee los permisos necesarios para cierto contenido"
      break;
    case 404:
        return 404+": El servidor no pudo encontrar el contenido solicitado"
      break;
    case 405:
        return 405+": El método solicitado es conocido por el servidor pero ha sido deshabilitado y no puede ser utilizado"
      break;
    case 406:
        return 406+": No encuentra ningún contenido seguido por la criteria dada"
      break;
    case 407:
        return 407+": La autenticación debe estar hecha a partir de un proxy."
      break;
    case 408:
        return 408+": El servidor quiere desconectar esta conexión sin usar"
      break;
    case 409:
        return 409+": La petición tiene conflicto con el estado actual del servidor"
      break;
    case 410:
        return 410+": El contenido solicitado ha sido borrado del servidor"
      break;
    case 411:
        return 411+": El servidor rechaza la petición"
      break;
    case 412:
        return 412+": El cliente ha indicado pre-condiciones en sus encabezados la cual el servidor no cumple"
      break;
    case 413:
        return 413+": La entidad de petición es más larga que los limites definidos por el servidor"
      break;
    case 414:
        return 414+": La URI solicitada por el cliente es más larga que el servidor está dispuesto a interpretar"
      break;
    case 415:
        return 415+": El formato multimedia de los datos solicitados no está soportada por el servidor"
      break;
    case 416:
        return 416+": El rango especificado por el campo de encabezado Range en la solicitud no cumple"
      break;
    case 417:
        return 417+": La expectativa indicada por el campo de encabezado Expect solicitada no puede ser cumplida por el servidor"
      break;
    case 418:
        return 418+": El servidor se reúsa a intentar hacer café con una tetera."
      break;
    case 421:
        return 421+": La petición fue dirigida a un servidor que no es capaz de producir una respuesta."
      break;
    case 422:
        return 422+": La petición estaba bien formada pero no se pudo seguir debido a errores de semántica"
      break;
    case 423:
        return 423+": El recurso que está siendo accedido está bloqueado."
      break;
    case 424:
        return 424+": La petición falló debido a una falla de una petición previa."
      break;
    case 426:
        return 426+": El servidor se reúsa a aplicar la solicitud usando el protocolo actua"
      break;
    case 428:
        return 428+": El servidor origen requiere que la solicitud sea condicional."
      break;
    case 429:
        return 429+": El usuario ha enviado demasiadas solicitudes en un periodo de tiempo dado."
      break;
    case 431:
        return 431+": El servidor no está dispuesto a procesar la solicitud porque los campos de encabezado son demasiado largos."
      break;
    case 451:
        return 451+": El usuario solicita un recurso ilegal"
      break;

    case 500:
        return 500+": El servidor ha encontrado una situación que no sabe como manejarla."
      break;
    case 501:
        return 501+": El método solicitado no esta soportado por el servidor"
      break;
    case 502:
        return 502+": Obtuvo una respuesta inválida."
      break;
    case 503:
        return 503+": El servidor no esta listo para manejar la petición."
      break;
    case 504:
        return 504+": No puede obtener una respuesta a tiempo."
      break;
    case 505:
        return 505+": La versión de HTTP usada en la petición no está soportada por el servidor."
      break;
    case 506:
        return 506+": El servidor tiene un error de configuración interna"
      break;
    case 507:
        return 507+": El servidor tiene un error de configuración interna"
      break;
    case 508:
        return 508+": El servidor detectó un ciclo infinito"
      break;
    case 510:
        return 510+": Extensiones adicionales para la solicitud son requeridas para que el servidor las cumpla."
      break;
    case 511:
        return 511+": Necesita auntenticar para ganar acceso a la red"
      break;
    default:

  }
}

export {readResponseServer};


    //email:'jess.monter@lytica.ai',
    //password:'admin'

    /*
    http://18.219.244.117/rest-auth/login/
    {
    	"user":"gibran",
    	"email":"gibran.aguilar@lytica.ai",
    	"password":  "admin"
    }

    fetch('http://18.219.244.117/rest-auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:'jess.monter@lytica.ai',
        password:'admin'
      }),
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
    */

    /*
    fetch('http://18.219.244.117/rest-auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization: '/JWT Tocken',
      },
      body: JSON.stringify({
        email:'jess.monter@lytica.ai',
        password:'admin'
      }),
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });


    http://18.219.244.117/pictures/

    {
    "token":"el token que se genero"
      	"user" : 2,
        "encoding" : "base 64 del archivo",
        "archive":"¿poner un archivo? el blob??? necesitas los dos archivos blob y base64",
        "process" :"",
        "items" : "",
        "label" : "Lugar donde se tomo la foto ej. recamara, patio, terreno",
        "appraisal" : 1,
        "created_at" : "2019-11-02 04:41:16.206000",
        "updated_at" : "2019-11-02 04:41:16.206000"
    }
    */

    /*
    http://18.219.244.117/documents/
    {

    	  "user" : 2,
        "encoding" : "",
        "archive":"poner un archivo",
        "process" :"",
        "label" : "entorno",
        "appraisal" : 1,
        "created_at" : "2019-11-02 04:41:16.206000",
        "updated_at" : "2019-11-02 04:41:16.206000"


    }
    */

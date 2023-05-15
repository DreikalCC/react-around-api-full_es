En este proyecto, se implementó el registro y la autorización en el frontend del proyecto de React. "Alrededor de los EE.UU." para poder
crear usuarios, identificarlos y crear sesiones que perduran en el registro por medio de tokens JWTs hasta que el usuario cierre la sesión.

Se adaptaron las rutas de la pagina para prevenir que usuarios que no han iniciado sesión puedan ingresar a estas, así como el enrutar a los
usuarios a la pagina de inicio de sesión al intentar ingresar a las misma.

Si el usuario no esta registrado en la base de datos el usuario tiene acceso a la ruta de registro, en la cual al registrarse se le indicará
si se le registro de manera exitosa o si ocurrió un problema, de registrarse exitosamente se le redireccionará a la pantalla de inicio de sesión

npm start - Inicia la ejecución de la pagina.

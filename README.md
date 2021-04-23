# Combi-49

Proyecto de software para la materia Ingenieria II de la carrera Licenciatura en Sistemas de la [Facultad de Informática](https://www.info.unlp.edu.ar/), [Universidad Nacional de La Plata](http://unlp.edu.ar/).

El proyecto consiste de una web a desarrollar para un cliente que desea construir un sitio web para la venta de pasajes de corta,media y larga distancia.


## Ambiente

### Correr la app

Para correr la app `npm start`

### Herramientas

Backend
: Nodejs: [Express](https://expressjs.com/en/starter/generator.html)
: DataBase: MySQL
: ORM: Sequelize

Frontend
: Javascript: AngularJs
: Styling: Bootstrap

### Dependencias

- Instalar [NodeJs](https://nodejs.org/en/) siguiendo los pasos del sitio oficial.  

- Instalar [Express](https://expressjs.com/en/starter/generator.html): `npm install -g express-generator`.

- Ejecutar el siguiente comando para instalar npx `npm install -g npx`.

- Asegurase de situarse en el directorio donde se encuentra el archivo `package.json` y ejecutar el comando `npm install` para instalar todas las dependencias necesarias para el proyecto.

### Entorno

- Configurar variables de entorno correctamente como se muestra en `.env.sample`. Luego guardarlo en nuevo archivo llamado `.env`.

- Ejecutar el comando  `npm pre-migrate` para crear la base de datos.

- Ejecutar el comando `npm migrate` para migrar el modelo de la base de datos anteriormente creada. 



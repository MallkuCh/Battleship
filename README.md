
# Proyecto semestral - Entrega 2

<!-- ABOUT THE PROJECT -->
## Descripcion Proyecto

Para esta entrega se ha implementado un back-end el cual es capaz de dar soporte a las funcionalidades del juego en desarrollo. También se ha modelado una base de datos en postgreSQL y  una API RESTful que es capaz de interactuar con la base de datos creada.


### Librerias/Frameworks

Para armar este proyecto se utilizaron las siguientes librerias/frameworks

* Node.js
* [Koa](https://koajs.com/)
* PostgreSQL
* ESlint

## Getting Started

Para correr el proyecto se necesita inicizar el servidor con koa

### Prerequisites
Las dependencias se encuentran en packgaje.json. Para esta entrega en especifico se utilizaron las siguientes dependencias:

* Koa
* KoaBody
* koa-logger
* koa-router
* Sequelize
* Sequelize-cli
* pg
* dotenv
* nodemon

Para instalar lo que esta el packgaje.json se utiliza el comando
```sh
  yarn install
  ```

Para iniciar el servidor se deberan correr los siguientes comandos
* yarn start
  ```sh
  yarn start
  ```
En el cual se corre un script que utiliza los siguientes comandos
```sh
  node src/index.js
  nodemon src/index.js
  ```
### Installation

A continuación se encuentran los pasos de como instalar y configurar el servidor.

1. Clonar el repositorio
   ```sh
   git clone https://github.com/IIC2513/grupo-JCxMC-backend.git
   ```
2. Instalar las dependencias que se encuentran en package.json
   ```sh
   yarn install
   ```
2. Iniciamos postgresql en nuestro computador
    ```sh
   sudo service postgresql start
   ```
4. Creamos un archivo .env que contiene las constantes necesarias del proyecto
    ```sh
   DB_USERNAME = jcxmc
    DB_PASSWORD = 12345
    DB_NAME = proyecto
    DB_HOST = 127.0.0.1
   ```
3. Creamos el usuario para el proyecto
	```sh
   sudo -u postgres createuser --superuser jcxmc
   ```
5. Iniciamos la base de datos
   ```sh
   createdb proyecto_development
   ```
6. Cambiamos la contraseña de la base de datos
   ```sh
   psql proyecto_development
   ALTER USER jcxmc WITH PASSWORD '12345';
   ```
7. Utilizamos Yarn install para instalar las dependencias correspondientes
   ```sh
   yarn install
   ```
9. Corremos las migraciones
	```sh
   yarn sequelize-cli db:migrate
   ```
10. Corremos las seed
	```sh
    yarn sequelize-cli db:seed:all
    ```
## API endopoints y Metodos HTTP

A continucion se documentan todos los endpoint de la API del servidor.


<!-- subir partidas del jugador -->
* '/games/': Retorna la cantidad total de los juegos actuales en la base de datos. Utiliza el metodo GET y retorna el siguiente JSON.

  ```sh
    {
      "id": 1,
      "turn": 1,
      "winner": "false",
      "createdAt": "2023-06-03T00:55:26.854Z",
      "updatedAt": "2023-06-03T00:55:26.854Z"
    }
  ```

* '/games/status/:id': Retorna un JSON con diferentes atributos al finalizar el juego como por ejemplo id de los jugadores, barcos de los jugadores, etc. Utiliza el metodo GET

  ```sh
    {
    "jugadores": {
        "jugador_1": {
            "name": "juancagp",
            "user_Id": 1
        },
        "jugador_2": {
            "name": "vichorules",
            "user_Id": 2
        },
        "jugador_3": {
            "name": "GaboRed",
            "user_Id": 3
        }
    },
    "barcos": {
        "barcos_jugador_1": [
            {
                "id": 1,
                "pos_x": 5,
                "pos_y": 5
            }
        ],
        "barcos_jugador_2": [
            {
                "id": 2,
                "pos_x": 6,
                "pos_y": 6
            }
        ],
        "barcos_jugador_3": [
            {
                "id": 3,
                "pos_x": 7,
                "pos_y": 7
            }
        ]
    },
    "monedas": [
        {
            "value": 1,
            "pos_x": 1,
            "pos_y": 7
        },
        {
            "value": 2,
            "pos_x": 3,
            "pos_y": 5
        },
        {
            "value": 3,
            "pos_x": 8,
            "pos_y": 2
        }
    ]
  }
   ```

* '/ships/movement/execute': Metodo que envia la informacion de un moviento de un barco. Utiliza el metodo POST, la informacion enviada tiene un JSON de la forma:

  ```sh
    {
    "barco_id": 1,
    "jugador_id":1,
    "tablero_id":1,
    "movimiento": "arriba"
  }
   ```

  y retorna un JSON con el siguiente formato:

  ```sh
    {
    "estado": "movimiento hecho",
    "barco_nueva_posicion": {
        "id": 1,
        "alive": false,
        "pos_x": 5,
        "pos_y": 9,
        "player_Id": 1,
        "board_Id": 1,
        "createdAt": "2023-06-04T18:21:29.669Z",
        "updatedAt": "2023-06-04T18:32:55.984Z"
      }
    }
   ```

* '/user/': metodo que retorna un JSON de todos los usuarios que se encuentran inscritos en la base de datos. Utiliza el metodo GET.

  ```sh
  [
    {
        "id": 1,
        "mail": "vicentereglas@gmail.com",
        "password": "abcdefgh87",
        "username": "VichoRules",
        "createdAt": "2023-06-03T00:55:26.786Z",
        "updatedAt": "2023-06-03T00:55:26.786Z"
    },
    {
        "id": 2,
        "mail": "gabo@gmail.com",
        "password": "kiraakira123",
        "username": "GaboRed",
        "createdAt": "2023-06-03T00:55:26.786Z",
        "updatedAt": "2023-06-03T00:55:26.786Z"
    }
  ]
   ```

  El largo del JSON va a depender del tamaño de la cantidad de usuarios.

* '/users/create': A diferencia del anterior utiliza el metodo POST y su mision principal es crear un usuario en la base de datos. Necesita un input en formato JSON con el siguiente formato:
  ```sh
  {
    "mail": "junita@gmail.com",
    "password": "abcdfgh1234",
    "username": "junita"
  }
  ```
  Para la creacion de los usuarios se usaron restriccion y validaciones, las cuales son que cada contraseña debe tener como minimo una letra y un numero, cada email y username debe ser unico. El metodo POST retorna el siguiente formato:

  ```sh
    {
        "id": 5,
        "mail": "junita@gmail.com",
        "password": "abcdfgh1234",
        "username": "junita",
        "updatedAt": "2023-06-03T01:19:34.795Z",
        "createdAt": "2023-06-03T01:19:34.795Z"
    }
  ```

* '/users/:id': Se utiliza el metodo GET, este endpoint tiene como funcion principal obtener informacion de un usuario especifico.

  ```sh
  {
      "id": 5,
      "mail": "junita@gmail.com",
      "password": "abcdfgh1234",
      "username": "junita",
      "createdAt": "2023-06-03T01:19:34.795Z",
      "updatedAt": "2023-06-03T01:19:34.795Z"
  }
  ```

* '/users/update/': funcion que se utiliza para actualizar la contraseña de un usuario, utiliza el metodo POST y recibe el siguiente input:

  ```sh
  {
      "usuario_id": 5,
      "nueva_contrasena": "nuevo123",
      "username": "junita"
  }
  ```
  y retorna el siguiente output para el cambio de contrasena del usuario con id igual a 5 y username igual a "junita"

  ```sh
  {
    "estado": "contraseña actualizada exitosamente!",
    "usuario_updated": {
        "id": 5,
        "mail": "junita@gmail.com",
        "password": "nuevo123",
        "username": "junita",
        "createdAt": "2023-06-04T17:36:24.598Z",
        "updatedAt": "2023-06-04T17:45:34.363Z"
        }
  }
  ```

* '/users/delete/': funcion que se utiliza para eliminar un usuario, utiliza el metodo POST y recibe el siguiente input en formato JSON:

  ```sh
  {
      "usuario_id": 5,
      "username": "junita"
  }
  ```
  y retorna el siguiente output en formato TEXT:

  ```sh
    "usuario eliminado exitosamente!"
  ```
  para verificar el funcionamiento. se puede usar el comando 'psql proyecto_development' y despues 'SELECT * FROM "Users";' y se notará que el usuario no exite más.


* '/coins/generate': Endpoint que genera una moneda aleatoria en alguna parte del tablero, utiliza el metodo POST y recide el siguiente JSON como input:

  ```sh
  {
    "juego_id": 1
  }
  ```
  y retorna el siguiente JSON como output:

  ```sh
  {
    "estado": "moneda generada exitosamente!",
    "moneda": {
        "id": 4,
        "in_table": true,
        "value": 2,
        "pos_x": 9,
        "pos_y": 3,
        "board_Id": 1,
        "createdAt": "2023-06-04T18:21:39.330Z",
        "updatedAt": "2023-06-04T18:21:39.334Z"
    }
  }
  ```

* 'player/atack': Endpoint que se encarga de atacar a una casilla en especifico seleccionada por el jugador que ataca, utiliza el metodo POST y recide el siguiente JSON como input:

  ```sh
  {
    "barco_atacado_id": 1
  }
<<<<<<< HEAD
  
=======

>>>>>>> fbeb7f3fc9f67846a1e7c60946694d8c4a150646
  ```
  y retorna el siguiente JSON como output

  ```sh
  {
    "estado": "barco atacado exitosamente",
    "barco_vivo": false,
    "player_atacado": "juancagp"
  }
  ```

## Eslint reglas

Tenemos que tomar en consideracion que se omitieron las siguientes reglas:

  ```sh
   "rules": {
        "camelcase":"off",
        "no-console":"off",
        "import/no-dynamic-require": "off",
        "global-require": "off"
    }
   ```
* camelcase: Al ser una forma en la cual se escriben las variables la encontramos innecesaria dado que como grupo tomamos la decision de escribir las variables con "_" en vez de espacios como formato generico.

* no-console: El no utilizar console.log() nos limitaba conocer el estado del servidor o de los errores del mismo, por lo que utilizarlo seria inneficiente para el desarrollo del proyecto.

* import/no-dynamic-require: dado que nuestros import usan variables externas, omitimos esta regla dado que nuestros import tienen require() que son polarizables y necesitan de estas variables para funcionar.

* global-require: El global-require es una funcion la cual se utiliza para evitar el uso de require solo en arriba de la funcion, solo se utiliza una vez en el archivo index.js y es para algo sequelize y dado que su cambio bugueaba el codigo se prefirio dejarlo asi y no cambiarlo.

* Cabe agregar que algunas variables sequelize en las migraciones, se omitio la regla unused-var con un comando que esta comentado especificamente antes para esa regla en especifico.

## Consideraciones

* Puede llegar a ocurrir que se genere un error con el regex para esto se debe eliminar la carpeta node_modukes y el archivo yarn.lock
, finalmente correr el comando

  ```sh
  yarn install
  ```

* Asegurarse tambien de utilizar una version de node 14 >=.

## Contacto

* Mallku Chipana Chambi - mmchipana@uc.cl

* Juan Carlos Gil - jg@uc.cl

Link proyecto: [https://github.com/IIC2513/grupo-JCxMC-backend](https://github.com/IIC2513/grupo-JCxMC-backend)




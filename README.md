# Chat
Chat en tiempo real implementado con Laravel 5.5 , Pusher JS y Vue 2

* Persistencia de datos en cuanto a login y registro de usuarios
* Soporte multi clientes (testeada con 100 usuarios conectados)
* Deteccion de escritura en tiempo real
* Deteccion del ingreso y salida de cualquier usuario al chat
* Multi plataforma

## Configuracion Local

Una vez clonado este repositorio se debe acceder mediante la terminal al mismo y ejecutar el comando **composer update**, esto instalara las dependecias de php que tiene el proyecto.

Seguidamente vamos se procede a compilar el webpack, para esto dentro de la terminal en el mismo proyecto ejecutamos el siguiente comando **npm install**

Debemos configurar las bases de datos y nuestro pushear ID dentro del archivo .env , y para finalizar corremos nuestro chat local utilizando el comando **php artisan serve**

Dudas a **Jhon A. Moreira - jonh.m.10@gmail.com**

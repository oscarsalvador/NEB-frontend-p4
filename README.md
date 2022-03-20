# Archivos incluidos y no incluidos
El repositorio tiene una carpeta "nodemon" que no es necesaria para lanzar las partes del sistema. La he incluido porque la he usado durante el desarrollo, y la uso para algunos servicios en el docker-compose. Solo contiene un dockerfile.

Tambien está incluida la carpeta dist del backend, con los archivos javascript resultado de la transpilacion de los typescript del backend. La he dejado incluida a proposito, para que no sea necesario instalar las herramientas de desarrollo para solo comprobar que el sistema funciona.

Además, hay un archivo "populate.sh" que hace diez peticiones al backend para insertar datos con curl, de manera que no haya que meter varios a mano para ver el frontend con datos.

En el repo no esta incluida una carpeta "mongo", que será necesaria. Uso un contenedor de mongo para correr la BD en local. No podía subir una carpeta vacia. 

# Instrucciones
Los pasos en común, para comprobar el funcionamiento del sistema y para montar el entorno de desarrollo.

```
git clone https://github.com/oscarsalvador/NEB-frontend-p4.git \<carpeta-destino\>  

cd \<carpeta-destino>  
mkdir mongo

docker-compose up mongo -d
docker-compose up mongo-express -d
```

## Comprobacion
```
docker-compose up back-install
docker-compose up back-start -d
docker-compose up front-install
docker-compose up front-start

docker-compose rm front-start
docker-compose down back-start
```

## Desarrollo
```
docker-compose up back-install-dev
docker-compose up back-build
docker-compose up back-start-dev
docker-compose up front-install
docker-compose up front-start
```

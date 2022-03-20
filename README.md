## Journal
1. Crear carpetas y docker compose
2. Levantar mongo y mongo-express
3. Preparar el backend
    1. Escribir los servicios en docker-compose.yml
    2. 

### Backend
Sondeo
GET

POST - url encoded, porque por que no
curl -v 'http://localhost:8082' -d "aaa=aa"
POST - json
curl -v 'http://localhost:8082' -d '{"bbb":"bb"}' -H 'Content-Type: application/json'

Siguiendo la [guia](!https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript) de digitalocean.
1. Levantar un bash en el contenedor de node
1. Inicializar el proyecto  
    ```npm init -y```
1. Preparar el soporte de typescript  
    ```npm install --save-dev typescript```
1. Preparado la configuracion de typescript  
    ```
    tsconfig.json

    {
        "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "target": "es6",
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist"
        },
        "lib": ["es2015"]
    }
    ```
1. Instalar las dependencias del framework Express  
    ```npm install --save express@latest```  
    ```npm install -save-dev @types/express@latest```

1. Añadido dependencia (solo para dev, no produccion)  
    ```npm install nodemon --save-dev```

1. Crear la carpeta de fuentes y desarrollar

1. Usar el servicio de express de desarrollo para no tener que levantar el servidor con cada cambio. Para transpilar los cambios correr en otra sesion el servicio back-bash y ejecutar   
    ```npx tsc```  
    o usar el servicio back-build

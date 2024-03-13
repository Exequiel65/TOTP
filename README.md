# Proyecto TOTP (Time-Based One-Time Password)

Este proyecto es un ejemplo de cómo generar y utilizar el algoritmo TOTP (Time-Based One-Time Password) para autenticación de dos factores (2FA) en una aplicación web. Consiste en una API desarrollada en .NET 8 que proporciona funcionalidades para generar, validar y compartir la URL para un código QR utilizando la biblioteca OtpNet. El frontend está desarrollado en React y consume la API para mostrar cuatro vistas principales:

1. **Obtener Token del Servidor:** Esta vista permite al usuario obtener un token TOTP generado por el servidor.

2. **Validar Token con el Servidor:** En esta vista, el usuario puede validar un token TOTP ingresado con el servidor.

3. **Generar QR para Agregar a Aplicaciones de Autenticación:** Aquí, el usuario puede obtener un código QR que contiene la URL para agregar el token TOTP a aplicaciones de autenticación como Microsoft Authenticator y Google Authenticator.

4. **Generar Token desde el Frontend:** Esta vista permite al usuario generar un token TOTP directamente desde el frontend utilizando el algoritmo TOTP. El token se genera y se muestra en tiempo real.

## Instalación

### Requisitos previos

- Node.js
- .NET 8
- Docker (opcional)

### Pasos de instalación

1. Clona el repositorio:
    ```
    git clone https://github.com/Exequiel65/TOTP.git
    ```

2. Instala las dependencias del frontend:
    ```
    cd TOTP/Cliente
    npm install
    ```

3. Ejecuta el servidor de desarrollo del frontend:
    ```
    npm start
    ```
4. Instala las dependencias del backend:
    ```
    cd ../Api/TOTPAlgorithm
    dotnet restore
    ```
5. Ejecuta el backend:
    ```
    dotnet run
    ```

### Uso de Docker (opcional)

Si prefieres ejecutar la API utilizando Docker, sigue estos pasos adicionales:

1. Asegúrate de tener Docker instalado en tu sistema.

2. Desde la raíz del proyecto, ejecuta el siguiente comando para construir la imagen de Docker:

    ```
    docker build -t totp-api .
    ```

3. Una vez que se haya construido la imagen, ejecuta el contenedor:
    ```
    docker run -p 5000:5000 totp-api
    ```

## Variables de Entorno del Frontend

En el directorio raíz del proyecto de React, puedes crear un archivo `.env` para definir las variables de entorno utilizadas en el frontend. Las variables de entorno deben comenzar con `REACT_APP_`.

Ejemplo de archivo `.env`:
```VITE_API_BASE_URL=```

En tu código de React, puedes acceder a estas variables de entorno utilizando `process.env.VARIABLE`.

## Links de Deploy

- [Enlace de despliegue del frontend](https://totp-pi.vercel.app/)
- [Enlace de despliegue del backend](https://totp-uoqn.onrender.com)

Este es un ejemplo básico de cómo configurar y utilizar el algoritmo TOTP en una aplicación web utilizando .NET y React. Siéntete libre de modificar y adaptar el proyecto según tus necesidades específicas.

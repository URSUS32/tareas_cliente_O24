# tareas_cliente_O24

## TAREA2
**Este CV funciona a partir de un archivo JSON que contiene todos los campos mostrados en el CV para su mantenimiento, el archivo JSON se encuentra en src/json/cv_data.json.**

**Estos son los comandos iniciales para la instlación de paquetes e inciialización de configuración de estilos :**
```
> Intalación de paquetes
npm install

> Run para producción
npm run build 

> Run para desarrollo
npm run dev

```

**Cambios que se deben realizar en el JSON para cambiar la cuenta de correo a la que se enviará la información del formulario de contacto**
1. Tener cuenta de getForm con un formulario creado y obtener el link para el formulario
2. Abir archivo src/json/cv_data.json.
3. Identificar clave "getform_url".
4. Cambiar url antigua por nueva en el valor de la clave definida.

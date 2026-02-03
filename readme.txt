============================================================
   GUÍA DE INICIO - PROYECTO LIBRERÍA DAW2 (MERN STACK)
============================================================

Para retomar el trabajo donde lo dejaste, necesitas encender 
3 cosas en el siguiente orden:

------------------------------------------------------------
PASO 1: BASE DE DATOS (MongoDB)
------------------------------------------------------------
1. Asegúrate de que MongoDB está corriendo (suele ser automático en Windows).
2. Opcional: Abre MongoDB Compass y conecta para ver los datos visualmente.


------------------------------------------------------------
PASO 2: SERVIDOR BACKEND (La API)
------------------------------------------------------------
1. Abre Visual Studio Code.
2. Abre una TERMINAL nueva.
3. Escribe estos comandos:

   cd backend
   npm run dev

4. Espera a ver el mensaje: "Conectado a MongoDB".
¡NO CIERRES ESTA TERMINAL!


------------------------------------------------------------
PASO 3: CLIENTE FRONTEND (La Web)
------------------------------------------------------------
1. En VS Code, abre una SEGUNDA TERMINAL (botón +).
2. Escribe estos comandos:

   cd frontend
   npm run dev

3. Verás que te da una dirección local (ej: http://localhost:5173).


------------------------------------------------------------
PASO 4: ENTRAR A LA WEB
------------------------------------------------------------
Abre tu navegador (Chrome/Edge) y ve a:
http://localhost:5173


============================================================
   COMANDOS ÚTILES Y SOLUCIÓN DE PROBLEMAS
============================================================

>> SI LOS DATOS FALLAN O QUIERES REINICIAR LA BASE DE DATOS:
Si necesitas borrar todo y volver a crear los libros de prueba, 
ejecuta esto en la terminal del BACKEND:

   node seed.js

(Recuerda reiniciar el servidor después si nodemon no lo hace solo).

>> PUERTOS USADOS:
- Backend: 4000
- Frontend: 5173

Para subir al git los cambios:
git add . (Prepara los cambios)

git commit -m "Explicación de lo que cambiaste" (Guarda los cambios)

git push (Sube los cambios a la nube)
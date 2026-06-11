# Twilight Chat AI — Proyecto Integrador M3

Este proyecto es una Prueba de Concepto (POC) interactiva diseñada para la agencia digital *ComicSansCon*. Permite a los fanáticos de la saga *Twilight* (Crepúsculo) conversar en tiempo real con sus personajes favoritos mediante Inteligencia Artificial (Google Gemini AI), utilizando una arquitectura segura que protege las credenciales de desarrollo en el servidor y una experiencia de usuario fluida sin recargas de página (SPA).

---

## 🌖 Personajes Elegidos y Personalidades

Para este proyecto, se diseñaron tres perfiles de personajes altamente contrastantes y característicos de la saga de Stephenie Meyer, estructurados mediante instrucciones del sistema (*System Prompts*) avanzados para lograr un tono conversacional inmersivo:

1. **Edward Cullen 🧛**: Formal, educado, melancólico, introspectivo y sumamente protector. Habla de manera poética, elegante y misteriosa, evitando revelar su verdadera naturaleza a menos que exista plena confianza.
2. **Jacob Black 🐺**: Cálido, apasionado, impulsivo, juvenil, directo y sumamente leal a su manada Quileute. Su lenguaje es informal, cercano y tiene un marcado desprecio sarcástico hacia los vampiros ("los fríos").
3. **Alice Cullen 🧛‍♀️**: Alegre, entusiasta, optimista y amigable. Amante de la moda y de socializar. Deja caer de forma juguetona pequeñas pistas sobre premoniciones y visiones que ha tenido sobre el futuro de la conversación.

---

## 📸  Capturas de pantalla de la Aplicación

### 1. Pantalla de Bienvenida (Home)
![Home Page](/src/assets/compu.png)

### 2. Galería de Selección de Personajes (Chat)
![Galería de Personajes](/src/assets/iphone14pro.gif)

### 3. Sala de Chat Activa con Jacob Black
![Chat Activo](/src/assets/ipadpro.png)

---

## 💡 Tabla de Funcionalidades

| Funcionalidad	| Descripción	| Tipo	| Estado |
| :------------ | :-----------: | ----- | ------ |
| Ruta Dinámica (SPA) | Navegación entre vistas (/home, /chat, /about) mediante History API sin recargas del navegador. | Obligatorio	| ✅ Completado |
| Galería de Selección | Pantalla de bienvenida interactiva con tarjetas visuales de los tres personajes. | Extra Credit | ✅ Completado |
| Proxy Seguro Backend | Serverless Function en Node.js que oculta la API Key de Gemini en el servidor. | Obligatorio	| ✅ Completado |
| Diferenciación de Chats	| Estilos CSS diferenciados para burbujas de texto del usuario y del personaje.	| Obligatorio	| ✅ Completado |
| Scroll Automático |El área de mensajes se desliza hacia abajo automáticamente al recibir nuevas respuestas. | Obligatorio	| ✅ Completado |
| Indicador "Escribiendo..." | Estado de carga visual animado mientras el backend procesa la respuesta de la IA. | Obligatorio |✅ Completado |
| Marcas de Tiempo (Timestamps)	| Indicación de la hora exacta de envío (HH:MM) en cada burbuja de texto. | Extra Credit | ✅ Completado |
| Acceso por Teclado | Envío de mensajes presionando la tecla ENTER de forma directa sin usar el ratón.	| Extra Credit | ✅ Completado |

---

## 🏛️ Estructura del Proyecto (Modularización)

El código sigue estrictamente el patrón de **Separación de Responsabilidades:**
```bash
CHAT-BOT-TWILIGHT
├── api/
│   └── functions.js         # Backend: Serverless Function (Proxy seguro a Gemini)
├── src/
│   ├── assets/              # Recursos gráficos (Imágenes de Edward, Jacob, Alice y Logos)
│   ├── index.html           # Shell SPA: Contenedor HTML dinámico único
│   ├── styles.css           # Estilos responsivos Mobile-First con el tema de Twilight
│   ├── app.js               # Entrada principal: Ruteador e intercepción de enlaces 
│   ├── chat.js              # Lógica interactiva del chat (DOM, eventos, burbujas) 
│   ├── characters.js        # Constantes estáticas: Información y prompts de los personajes 
│   └── utils.js             # Funciones puras de utilidad (100% aisladas y testeables) 
├── tests/
│   └── utils.test.js        # Tests unitarios automatizados con Vitest
├── .env                     # Variables de entorno locales (API Key privada) 
├── .env.example             # Plantilla de variables de entorno pública 
├── .gitignore               # Configuración de exclusión para Git (Protección de credenciales) 
├── package.json             # Gestión de dependencias y scripts de ejecución 
└── vercel.json              # Controlador de redireccionamiento de rutas de Vercel 
```
---

## 🛠️ Tecnologías Utilizadas

Este proyecto integra y demuestra el dominio de los conceptos clave de desarrollo frontend y backend del Módulo 3:

*   **HTML5 Semántico**: Estructura accesible y limpia para los cascarones de la aplicación.
*   **CSS Responsivo (Mobile-First)**: Diseñado bajo un enfoque de adaptabilidad progresiva (celulares, tablets y ordenadores) mediante CSS Grid, Flexbox y media queries, utilizando una paleta de colores oscura, minimalista y elegante inspirada en las portadas clásicas de los libros.
*   **Vanilla JavaScript (ES6+)**: Modularización completa de responsabilidades sin dependencias externas de frameworks de frontend.
*   **History API (SPA)**: Ruteador dinámico que intercepta clicks, maneja los estados de navegación (`window.history.state`) y los botones nativos de "Atrás/Adelante" del navegador sin recargas de página.
*   **Node.js & Vercel Serverless Functions**: Backend seguro configurado como proxy en `/api/functions.js` para ocultar las API Keys y procesar llamadas de red con la IA.
*   **Google Generative AI SDK**: Implementación del SDK oficial de Google para entablar turnos de conversación de forma nativa con el modelo `gemini-2.5-flash`.
*   **Vitest**: Configuración y ejecución de pruebas unitarias locales automatizadas para garantizar la resiliencia de la lógica.

---

## 📥 Requisitos Previos

Antes de ejecutar el proyecto de forma local, asegúrate de tener instalado en tu computadora:

*   [Node.js](https://nodejs.org/) (Versión 18 o superior).
*   La herramienta de línea de comandos de Vercel instalada de forma global:
    ```bash
    npm install -g vercel
    ```

---

## ⚙️ Instalación y Configuración Local

Sigue estos sencillos pasos para instalar y ejecutar el entorno de desarrollo local:

### 1. Clonar el repositorio
Clona este repositorio de GitHub en tu máquina local:
```bash
git clone https://github.com/TU_USUARIO_DE_GITHUB/twilight-chat-ai.git
cd twilight-chat-ai
````

### 2. Instalar dependencias
Descarga las herramientas de dessarrollo e integración del proyecto (como Vitest y el SDK de Google):
```bash
npm install
````
### 3. Configurar el archivo de Variables de entorno (.env)
Para proteger tu API Key de gemini, la aplicación lee las claves desde las variables de entorno.

1. Crea un archivo `.env` en la raíz de tu proyecto.
2. Pega tu API Key en la siguiente variable de entorno (sin comillas, ni espacios):
```bash
GEMINI_API_KEY=AIzaSy...tu_clave_secreta_aqui
```
>🛑 **NUNCA** subas el archivo `.env`al repositorio. Ya esta en `.gitignore`. Obten tu API Key en [http://aistudio.google.com] → Get API Key

### 4. Ejecutar el proyecto de forma local
Para probar la interfaz de usuario y la conexión segura de backend, arranca el servidor local inteligente de Vercel:
```bash
npm run local
```
- La terminal te guiará para vincular el proyecto local con tu cuenta web de Vercel.
- Una vez compeltada la la vinculaciónn, abre la URL [http://localhost:3000] en tu navegador.

---

## ✅ Ejecución de pruebas Unitarias (Tests)
Este proyecto cuenta cin un set de pruebas unitarias automatizadas con **Vitest** enfocado en garantizar el comportamiento correcto de las funciones lógicas puras de la aplicación.

Para ejecutar las pruebas en tiempo real corre el sigueinte comando en tu terminal:
```bash
npm run test
```
### Pruebas implementadas:
- `validateMessage`: Comprueba que se validen los mensajes de texto correctos y se rechacen los mensajes vacíos, nulos o que contengan únicamente espacios en blanco.
- `limitHistory`: Comprueba que el historial de mensajes de la sesion se recorte correctamente para mantener únicamente las últimas interacciones del chat, ahorrando tokens y previniendo errores de Rate Limit (429).
- `extractResponseText`: Comprueba que la respuesta de Gemini se parsee correctamente y que la aplicación devuelva un mensaje de error amigable y controlado si el payload de la API llega nulo o dañado.

---

## 🛸 Despliegue en Vercel

### Conectar GitHub con Vercel

1. Subir el código a GitHub:
```bash
git add .
git commit -m "Twilight chat production ready"
git push origin main
```
2. Ve al [Vercel](https://vercel.com) e inicia sesiónn con tu cuenta de GitHub.
3. Haz click en **"Add New..."** y selecciona **"Project"**.
4. Importa el repositorio `twilight-chat-ai`.
5. En la sección **"Environment Variables"** del panel de configuracion de despliegue, agrega la variable:
    - **Name:** `GEMINI_API_KEY`
    - **Value:** *Pega aqui tu API Key real de Google Gemini.*
        
> ⚠️ ¡Recuerda **NO COMPARTIR** con nadie tu API Key!
6. Haz click en **"Deploy"**. Vercel compilará y publicará tu proyecto de forma segura en internet.

---

## 🌐 Enlances del Proyecto
- **Repositorio de Github:** [https://github.com/ferposadagarcia-maker/Twilight-Chat-AI.git]
- **Aplicación Desplegada en Vercel:** [https://twilight-chat-ai.vercel.app/]

---

## 🤓 Registro de Uso de la Inteligencia Artifical

Durante el desarrollo de este proyecto se utilizó un enfoque riguroso de ingeniería de prompts para interactuar con la IA de asistencia. A continuación se detallan las bitácoras reales de prompts estructurados utilizados para resolver los desafíos lógicos de la aplicación.


 **1. 📝 Diseño de los System Prompts de los personajes**
    
- **Contexto:** SPA de chat interactivo en Vanilla JavaScript que consume el SDK oficial de Google Gemini AI para simular personajes ficticios de la saga Crepúsculo.

- **Objetivo:** Generar instrucciones de sistema *(systemInstruction)* altamente descriptivas y delimitadas para evitar respuestas robóticas o monólogos extensos, estructurando el prompt de personalidad como un contrato claro.

- **Restricciones:**
    - No usar frameworks.
    - Las respuestas deben estar acotadas a un formato de chat rápido (máximo 2 o 3 oraciones cortas).
    - Mantener rígidamente la fidelidad al tono (Edward formal/poético, Jacob enérgico/sarcástico, Alice optimista/vidente).
    - El prompt del sistema debe ser procesado de manera limpia por el SDK sin requerir manipulación de cadenas en el backend.
- **Evidencia:**
    - *Problema:* Al usar un prompt simple como *"Responde como Edward Cullen"*, Gemini respondía con párrafos gigantescos, usaba palabras sumamente modernas y rompía el rol ante preguntas complejas.
    - *Payload actual:* El backend usa `gemini-2.5-flash` a través del método `getGenerativeModel`.
- **Formato de Salida:**
Tres bloques de instrucciones de sistema independientes estructurados estrictamente en formato de texto plano con secciones dedicadas a: Perfil, Personalidad, Comportamiento y Ejemplos de Tono.
- **Criterios de Éxito:**
    - Respuestas de la IA que nunca superen las 3 oraciones.
    - Jacob Black debe referirse de forma despectiva a los Cullen como "chupasangres" o "fríos".
    - Alice Cullen debe mencionar sutilmente visiones del futuro relacionadas con el chat.

**2. 📝 Resolución de Conflictos de Enrutamiento en `vercel.json`**

- **Contexto:** Proyecto SPA con Vanilla JS donde todos los archivos estáticos de frontend están dentro de la subcarpeta `src/` y las Serverless Functions de Node de backend están en la raíz dentro de `/api.`
- **Objetivo:** Solucionar el conflicto de redirección local en el emulador `vercel dev` donde la llamada `POST` a `/api/functions` arrojaba un error de red `404: NOT_FOUND`.
- **Restricciones:**
    - No mover los archivos estáticos fuera de `/src`.
    - No mover las funciones fuera de `/api`.
    - La barra de direcciones en producción no debe mostrar el subdirectorio `/src/index.html` (debe verse simplemente como `/home` o `/chat`).
- **Evidencia:**
    - Problema: Al hacer `POST` al backend, el emulador local devolvía 404 porque la regla catch-all original de `vercel.json` (`/((?!api).*)`) colisionaba al evaluar la ruta con la biblioteca interna `path-to-regexp`, desviando erróneamente el flujo hacia el archivo estático `/src/index.html` (que no admite peticiones `POST`).
    - Network: El inspector de Chrome mostraba la llamada `/api/functions` en rojo con estatus 404.
- Formato de Salida:
Una estructura de archivo vercel.json limpia y explícita, que evite expresiones regulares comodín genéricas y defina de forma manual las únicas páginas de la SPA.
- Criterios de Éxito:
    - Las llamadas a `/api/functions` deben llegar directamente a `/api/functions.js` sin desvíos.
    - Las llamadas a `/home`, `/chat` y `/about` deben cargarse limpiamente desde `/src/index`.html sin mostrar el subdirectorio en la barra de navegación.

**3. 📝 Solución del Bug de Caché Local de Vercel (`.vercel/cache`)**

- **Objetivo:** Diagnosticar por qué el emulador local `vercel dev` seguía ejecutando código viejo con modelos descontinuados a pesar de que el código fuente ya había sido guardado con las correcciones en el editor.

- **Problema:** El compilador local de Vercel almacena en memoria caché los archivos de funciones dentro de la carpeta local oculta `.vercel/`.

- **Resolución:** Se implementó una limpieza manual de caché eliminando la carpeta temporal `.vercel` e inicializando el enlace mediante `npm run local` (`vercel dev`) desde cero, logrando que el compilador reconstruyera la Serverless Function con el modelo Gemini correcto de forma limpia.

**4. 📝 Patrón de Programación Defensiva en `chat.js`**

- **Contexto:** Acoplamiento de la interactividad del DOM entre los archivos `app.js` (ruteador que renderiza el HTML) y `chat.js` (cerebro del chat que vincula eventos).
- **Objetivo:** Diseñar una vinculación a prueba de fallos de escritura (errores de dedo) en los identificadores de la caja de mensajes, previniendo caídas del sistema cuando la pantalla cargue de forma dinámica.
- **Restricciones:**
    - No usar librerías de enlace de datos.
    - No sobrecargar `app.js` con lógica de eventos.
- **Evidencia:**
    -  *Problema:* Al presionar Enviar, el sistema se congelaba arrojando un error en la consola: `TypeError: Cannot read properties of null (reading 'querySelector')` porque en el HTML se escribió `id="message-area"` (singular) pero en JavaScript se seleccionó como `document.getElementById('messages-area')` (plural).
    - *Línea del crash:* El navegador detenía el envío en `messagesArea.querySelector('div')`.
- **Formato de Salida:**
Un patrón de selección defensivo utilizando evaluación de cortocircuito (`||`) en JavaScript.
- **Criterios de Éxito:**
    - El chat debe ser inmune si el ID del HTML está escrito en singular (`message-area`) o en plural (`messages-area`).
    - Los escuchas de eventos del botón Enviar y de la tecla ENTER nunca deben quedar huérfanos ni inactivos.

    --- 

    ## 💻 Desarrolladora 
    
    Fernanda Posada
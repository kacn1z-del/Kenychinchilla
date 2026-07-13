# KCN Studio — kenychinchilla.com

Sitio web de **KCN Studio** (Keny Chinchilla Navarro), agencia de desarrollo de software, apps y páginas web en Costa Rica.

---

## ⚠️ Lo primero que hay que saber

Este proyecto tiene una carpeta `src/` con archivos React (`App.tsx`, `main.tsx`, etc.) que **no se usan**. El sitio real que se publica es **`index.html`**, un archivo HTML/CSS/JS puro y autocontenido. Esto es así por cómo evolucionó el proyecto (empezó como HTML estático, se intentó migrar a React, pero la migración nunca se conectó).

**Regla de oro: todo cambio de contenido, diseño o funcionalidad del sitio principal se hace en `index.html`. La carpeta `src/` puede ignorarse.**

---

## 🗂️ Estructura del proyecto

```
├── index.html                    ← EL SITIO REAL (todo vive aquí: HTML, CSS y JS)
├── api/
│   └── chat.js                   ← Función serverless (Vercel) que conecta con Gemini
├── public/
│   ├── diccionario.html          ← Página del Diccionario Vivo (lenguas indígenas)
│   ├── diccionario-indigena.json ← Datos del diccionario (2,491 palabras)
│   ├── logo-kcn-icon.png         ← Logo usado en el header y footer
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── og-image.png
├── src/                          ← NO SE USA (React sin conectar, dejar como está)
├── vercel.json
├── package.json
└── vite.config.ts
```

**Importante sobre `public/`:** todo lo que se pone en esta carpeta se copia tal cual al sitio final. Si necesitás agregar una página nueva (como se hizo con `diccionario.html`), va aquí, **no en la raíz** — de lo contrario Vite la ignora al construir el sitio y da error 404.

---

## ✨ Funcionalidades del sitio

### 1. Sitio principal (`index.html`)
Landing page completa: Hero, Portafolio, Servicios (6 categorías), comparación "Por qué KCN", Testimonios, Proceso, Precios (4 planes), sección de pago, FAQ, teaser de Lenguas Vivas, Footer.

### 2. Traductor Español / Inglés
Botón **"ES / EN"** en el menú (junto al de modo claro/oscuro). Traduce todo el contenido del sitio principal al instante, sin recargar la página. Recuerda la elección del visitante (`localStorage`).

- El diccionario de traducciones vive dentro de `index.html`, en el objeto `KCN_EN` (dentro de un `<script>` cerca del cierre de `</body>`).
- Cada texto traducible tiene un atributo `data-i18n="clave"` en el HTML.
- **Para agregar contenido nuevo que también deba traducirse:** agregar `data-i18n="nombre.clave"` al elemento en español, y agregar esa misma clave con su traducción al objeto `KCN_EN`.

### 3. Chat con Inteligencia Artificial (Gemini)
Botón azul flotante (esquina inferior izquierda). Responde preguntas sobre servicios, precios y tiempos de entrega.

- Frontend: JS embebido en `index.html` (busca `kcn-chat-fixed`).
- Backend: `api/chat.js`, función serverless de Vercel que llama a la API de Gemini.
- **Requiere la variable de entorno `GEMINI_API_KEY`** configurada en Vercel (Settings → Environment Variables). Se obtiene gratis en [Google AI Studio](https://aistudio.google.com/).
- Si el chat responde "Disculpa, tuve un problema para responder", casi siempre es porque falta esa variable o no se hizo redeploy después de agregarla.

### 4. Pago con PayPal
Sección "Realizar pago" (dentro de Precios). El visitante escribe un monto y paga con tarjeta o cuenta PayPal.

- El botón de pago permanece "apagado" (gris) hasta que se escribe un monto válido.
- El **Client ID de PayPal** está embebido directo en `index.html` (buscar `paypal.com/sdk/js?client-id=`).
- Actualmente usa el Client ID de **Sandbox** (modo de prueba, dinero falso). Para cobrar de verdad hay que:
  1. Activar la cuenta **Live** en [developer.paypal.com](https://developer.paypal.com) (Apps & Credentials → switch a "Live")
  2. Reemplazar el Client ID de Sandbox por el de Live en esa misma línea

### 5. Diccionario Vivo — Lenguas Indígenas (`public/diccionario.html`)
Página aparte (no dentro del `index.html`, para no sobrecargar el sitio principal). Incluye:

- **Buscador** de 2,491 palabras y frases en 6 lenguas: bribri, cabécar, maléku, boruca, ngäbe y térraba (busca sin importar acentos).
- **Filtros por lengua** (chips de colores).
- **"Aportar palabra"**: formulario para que la comunidad agregue palabras nuevas, con sistema de votos (una palabra queda "Validada" al llegar a 5 votos). Usa **Firebase Firestore** como base de datos en tiempo real (colección `palabras_indigenas`).
- Nota visible invitando a la comunidad a proponer palabras que todavía no existen en ninguna lengua (ej. "Servicios", "Portafolio") para poder traducir el menú del sitio más adelante.

**Los datos del diccionario están en `public/diccionario-indigena.json`.** Si se agregan palabras ahí manualmente, deben mantener el mismo formato:
```json
["Español", "bribri", "cabécar", "maléku", "boruca", "ngäbe", "térraba"]
```
Usar `"—"` o `""` cuando no se tenga la traducción a una lengua específica.

---

## 🔧 Cómo hacer cambios comunes

| Quiero cambiar... | Dónde |
|---|---|
| Número de WhatsApp | Buscar `50687359034` en `index.html` (aparece varias veces) |
| Precios de los planes | Sección `id="precios"` en `index.html` |
| Textos de servicios | Sección `id="servicios"` en `index.html` |
| Preguntas del FAQ | Sección `id="faq"` en `index.html` |
| Colores del sitio | Variables `:root` al inicio del `<style>` de `index.html` (`--black`, `--blue`, `--green`, etc.) |
| Agregar una palabra al diccionario | `public/diccionario-indigena.json` |
| El mensaje del asistente de IA | `SYSTEM_PROMPT` dentro de `api/chat.js` |

---

## 🚀 Despliegue (Vercel)

**Variables de entorno necesarias** (Vercel → Settings → Environment Variables):
- `GEMINI_API_KEY` → clave de Google AI Studio, para que funcione el chat

**Dominio:** `kenychinchilla.com`, conectado vía DNS en Porkbun:
- Registro `A` (raíz) → `76.76.21.21`
- Registro `CNAME` (`www`) → `cname.vercel-dns.com`

⚠️ **Cuidado con proyectos duplicados en Vercel.** En algún momento se crearon varias copias del mismo proyecto (`kenychinchilla`, `kenychinchilla-v8o9`, etc.), todas conectadas al mismo repo de GitHub. Si el sitio muestra cambios viejos después de subir algo nuevo, revisar en Vercel → Settings → Domains **cuál proyecto tiene realmente conectado `kenychinchilla.com`** — es probable que se esté editando el repo correcto pero mirando el despliegue equivocado.

---

## 🐛 Cosas raras que ya pasaron (para no perder tiempo de nuevo)

- **Cambios que no se reflejan en el sitio:** casi siempre es (1) faltó hacer redeploy después de una variable de entorno nueva, o (2) hay un proyecto de Vercel duplicado sirviendo una versión vieja.
- **Error "client-id not recognized" en PayPal:** el Client ID copiado estaba incompleto o pertenecía a otra app. Sacar uno nuevo desde developer.paypal.com y copiarlo con el botón de copiar, no a mano.
- **`api/chat.js` no existe / error 404:** confirmar que el archivo esté literalmente en la carpeta `api/` en la raíz del repo (no dentro de `src/` ni en otro lado).
- **Páginas nuevas (`diccionario.html`) dan 404 aunque estén en GitHub:** deben ir dentro de `public/`, no en la raíz — Vite solo empaqueta `index.html` como entrada, todo lo demás en la raíz se ignora.

---

## 📞 Contacto del negocio

- WhatsApp: +506 8735-9034
- Email: kchinchilla.pos@gmail.com
- Ubicación: San José, Costa Rica

---

*Última actualización: julio 2026*

// Función serverless de Vercel (Node.js runtime).
// Recibe el historial de mensajes del chat y responde usando Gemini.
// Requiere la variable de entorno GEMINI_API_KEY configurada en Vercel.

const SYSTEM_PROMPT = `Eres el asistente virtual de "KCN Studio" (Keny Chinchilla Navarro), una agencia de desarrollo de software, apps y páginas web en Costa Rica.

Tu rol:
- Ayudar a los visitantes a entender los servicios: Diseño Web (desde $120), Apps Móviles (desde $699), Software Empresarial (desde $999), Tiendas Online (desde $499), Diseño de Marca y Marketing Digital.
- Explicar el proceso: consulta gratuita → diseño y aprobación → desarrollo ágil → lanzamiento y soporte.
- Responder dudas sobre tiempos de entrega (página básica: 3-7 días, sitio profesional: 1-2 semanas, e-commerce: 2-3 semanas, app móvil: 3-6 semanas).
- Métodos de pago: SINPE Móvil, transferencia bancaria, PayPal y efectivo.
- Ser cercano, profesional y directo. Tono costarricense amable pero eficiente, sin sonar robótico.
- Si preguntan algo muy específico de su proyecto o quieren cotización personalizada, invita a escribir por WhatsApp para hablar directo con Keny.
- Mantén las respuestas breves (2-3 oraciones cortas como máximo), claras y en español (a menos que te escriban en inglés). Nunca dejes una idea a medias: si vas a explicar algo, resúmelo en pocas palabras en vez de extenderte.
- Nunca inventes precios o plazos que no tengas; en ese caso, sugiere confirmar por WhatsApp.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Falta configurar GEMINI_API_KEY en el servidor' });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Se requiere un arreglo de mensajes' });
    }

    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', errText);
      return res.status(502).json({ error: 'Error al conectar con el asistente de IA' });
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Disculpa, no pude generar una respuesta en este momento. ¿Podrías reformular tu pregunta?';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

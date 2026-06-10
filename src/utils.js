/**
 * Valida si el mensaje ingresado por el usuario es apto para ser enviado.
 * @param {string} text - El texto del mensaje.
 * @param {number} maxChars - Límite máximo de caracteres.
 * @returns {boolean}
 */
export function validateMessage(text, maxChars = 400) {
  if (typeof text !== 'string') return false;

  const cleanText = text.trim();
  return cleanText.length > 0 && cleanText.length <= maxChars;
}

/**
 * Extrae de forma segura el texto de respuesta del objeto retornado por la API.
 * @param {object} rawResponse - Respuesta sin procesar del servidor.
 * @returns {string}
 */
export function extractResponseText(rawResponse) {
  const reply = rawResponse?.reply ?? "No obtuve respuesta del personaje.";

  if (typeof reply === 'string') {
    return reply.trim();
  }

  return "Ocurrió un error al procesar el mensaje.";
}

/**
 * Recorta un array de historial de chat para mantener únicamente las interacciones más recientes.
 * @param {array} history - Lista de mensajes.
 * @param {number} maxLimit - Número máximo de mensajes a conservar.
 * @returns {array}
 */
export function limitHistory(history, maxLimit = 12) {
  if (!Array.isArray(history)) return [];

  return history.slice(-maxLimit);
}

/**
 * Prepara el historial para construir el payload que se enviará a la API de AI.
 * @param {array} history - Historial de conversación actual.
 * @returns {array}
 */
export function prepareApiPayload(history) {
  const optimizedHistory = limitHistory(history);

  return optimizedHistory.filter(msg => {
    const hasValidRole = msg?.role === 'user' || msg?.role === 'model';
    const hasContent = typeof msg?.content === 'string' && msg.content.trim().length > 0;
    return hasValidRole && hasContent;
  });
}

/**
 * Genera una cadena con la hora actual en formato de 24 horas (HH:MM).
 * @returns {string}
 */
export function getFormattedTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

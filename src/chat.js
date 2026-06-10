import { validateMessage, extractResponseText, prepareApiPayload, getFormattedTime } from './utils.js';

let conversationHistory = [];

export function initChat(characterId, systemPrompt, elements) {
    conversationHistory = [];

    const messageInput = elements.messageInput || document.getElementById('message-input');
    const sendBtn = elements.sendBtn || document.getElementById('send-btn');
    const messagesArea = elements.messagesArea || document.getElementById('messages-area');

    if (!messageInput || !sendBtn || !messagesArea) {
        console.error('Error crítico: No se encontraron los elementos del chat en el DOM.');
        return;
    }
    
    messageInput.focus();

    sendBtn.onclick = () => sendMessage(characterId, systemPrompt, messageInput, messagesArea);

    messageInput.onkeydown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(characterId, systemPrompt, messageInput, messagesArea);
        }
    };
}

async function sendMessage(characterId, systemPrompt, inputEl, messagesArea) {
    const text = inputEl.value;
    if (!validateMessage(text)) return;

    inputEl.value = '';

    const activeMessagesArea = messagesArea || document.getElementById('messages-area') || document.getElementById('message-area');
    if (!activeMessagesArea) {
        console.error('No se pudo encontrar el área de mensajes');
        return;
    }

    const emptyMessage = activeMessagesArea.querySelector('div');
    if (emptyMessage && emptyMessage.textContent.includes('Comienza tu conversación')) {
        emptyMessage.remove();
    }

    appendMessageBubble('user', text, activeMessagesArea);

    conversationHistory.push({ role: 'user', content: text });

    const typingIndicator = appendTypingIndicator(activeMessagesArea);

    try {
        const cleanedHistory = prepareApiPayload(conversationHistory);

        const response = await fetch('/api/functions.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                history: cleanedHistory,
                systemPrompt: systemPrompt 
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error al conectar con el servidor.');
        }


        const replyText = extractResponseText(data);
        
        typingIndicator.remove();

        appendMessageBubble('model', replyText, activeMessagesArea);

        conversationHistory.push({ role: 'model', content: replyText });

    } catch (error) {
        console.error(error);
        typingIndicator.remove();
        appendErrorBubble(activeMessagesArea);
    }


function appendMessageBubble(sender, text, messagesArea) {
    const bubble = document.createElement('div');
    const time = getFormattedTime();

    const isUser = sender === 'user';
    bubble.style.alignSelf = isUser ? 'flex-end' : 'flex-start';
    bubble.style.backgroundColor = isUser ? 'var(--accent-red)' : 'var(--bg-primary)';
    bubble.style.color = 'var(--text-white)';
    bubble.style.padding = '0.8rem 1.2rem';
    bubble.style.borderRadius = isUser ? '12px 12px 0 12px' : '12px 12px 12px 0';
    bubble.style.maxWidth = '80%';
    bubble.style.border = isUser ? 'none' : '1px solid var(--border-color)';
    bubble.style.position = 'relative';

    bubble.innerHTML = `
        <p style="font-size: 0.95rem; margin-bottom: 0.2rem; line-height: 1.4;">${text}</p>
        <span style="font-size: 0.7rem; color: var(--text-muted); display: block; text-align: right;">${time}</span>
        `;
    
        messagesArea.appendChild(bubble); 
        autoScroll(messagesArea);
}


function appendTypingIndicator(messagesArea) {
    const indicator = document.createElement('div');
    indicator.style.alignSelf = 'flex-start';
    indicator.style.color = 'var(--text-muted)';
    indicator.style.fontSize = '0.85rem';
    indicator.style.fontStyle = 'italic';
    indicator.style.padding = '0.5rem 1rem';

    indicator.innerHTML = `Escribiendo...`;

    messagesArea.appendChild(indicator);
    autoScroll(messagesArea);
    return indicator;
    }

function appendErrorBubble(messagesArea) {
    const errorBubble = document.createElement('div');
    errorBubble.style.alignSelf = 'center';
    errorBubble.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    errorBubble.style.color = '#ff4d4d';
    errorBubble.style.padding = '0.6rem 1rem';
    errorBubble.style.borderRadius = '4px';
    errorBubble.style.fontStyle = '0.85rem';
    errorBubble.style.border = '1px solid #ff4d4d';

    errorBubble.textContent = 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo.';

    messagesArea.appendChild(errorBubble);
    autoScroll(messagesArea);
    }

function autoScroll(messagesArea) {
    messagesArea.scrollTop = messagesArea.scrollHeight;
    }
}
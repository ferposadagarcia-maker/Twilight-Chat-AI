import { characters } from './characters.js';
import { initChat } from './chat.js';

function renderHome() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="view-container">
            <h1 class="font-serif" style="font-size: 2.5rem; text-align: center; margin-bottom: 1rem; letter-spacing: 2px;">BIENVENIDO A TWILIGHT CHAT</h1>
            <p style="text-align: center; color: var(--text-muted); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">¿Estás listo para adentrarte en el frio bosque de Washington y conversar con los Cullens y otros personajes de Twilight?</p>
            
            <div style="text-align: center; margin-top: 2rem;">
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Esta es la descripción de la aplicación. Aquí puedes elegir con quién quieres hablar:</p>
                <a href="/chat" class="nav-link" data-link style="border: 1px solid var(--accent-red); padding: 0.8rem 1.5rem; border-radius: 4px; color: var(--text-white); text-decoration: none; text-transform: uppercase; letetr-sapcing: 1px; transition: backgorund 0.3s;">Ir al Chat ->
                </a>
            </div>
        </div>        
    `;
}

function renderChat(){
    const app = document.getElementById('app');

    const cardsHTML = Object.values(characters).map(character => `   
    <div class="character-card">

        <div class="card-image-container">
            <img src="/assets/${character.id}.png" alt="${character.name}" class="card-image">
            <div class="card-name-overlay">
                <h2 class="font-serif">${character.name}</h2>
            </div>
        </div>
        
        <div class="card-body">
            <p class="card-role">${character.role}</p>
            <p class="card-description">${character.description}</p>
        
            <button class="select-char-btn" data-id="${character.id}"> Comenzar a chatear</button>
        </div>
    </div>    
`).join('');

    app.innerHTML = `
        <div class="view-container">
            <h1 class="font-serif main-title">Elige con quién chatear</h1>
                 <p class="main-subtitle">Selecciona al personaje con quién quieres pláticar:
                 </p>

                 <div class="characters-gallery">${cardsHTML}
            </div>
        </div>
    `;
    const buttons = app.querySelectorAll('.select-char-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const characterId = e.currentTarget.getAttribute('data-id');
            window.history.pushState({ characterId }, null, '/chat');
            renderActiveChat(characterId);
        });
    });
}

function renderActiveChat(characterId) {
    const app = document.getElementById('app');
    const character = characters[characterId];

    if (!character) return;

    app.innerHTML = `
        <div class="chat-wrapper">
            
            <header class="chat-header">
                <div class="chat-header-info">
                    <img src="/assets/${character.id}.png" alt="${character.name}" class="chat-header-avatar">
                    <div>
                        <h2 class="font-serif chat-header-name">${character.name}</h2>

                        <span class="chat-status"></span>
                            En línea
                        </span>
                    </div>
                </div>
                <a href="/chat" class="btn-volver" data-link>
                    Volver ←
                </a>
            </header>

            <section id="messages-area" class="messages-container">
                <div class="empty-chat-message">
                    Comienza tu conversación con ${character.name}.
                </div>
            </section>

            <div class="composer-container">
                <textarea id="message-input" placeholder="Escribe un mensaje..." rows="1" maxlength="400"></textarea>
                <button id="send-btn" aria-label="Enviar" title="Enviar">➤</button>
            </div>
        </div>
    `;
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesArea = document.getElementById('messagesArea');

    initChat(characterId, character.systemPrompt, { messageInput, sendBtn, messagesArea });
}

function renderAbout() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="view-container">
            <h1 class="font-serif" style="font-size: 2.5rem; text-align: center; margin-bottom: 1rem; letter-spacing: 1px;">Acerca de TwilightChat</h1>
            <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 1rem; text-align: justify;">Twilight Chat es una aplicación de chat interactiva que te permite conversar con los personajes de la saga Twilight mediante una AI. Inspirada en el contraste estético delas portadas de los libros, esta aplicación ofrece una experiencia inmersiva para los fans.</p>
            <p style="color: var(--text-muted); line-height: 1.8; text-align: justify;">Desarrollado con JavaScript Vanilla, CSS responsivo bajo la filosifia Mobile-First, y conectado de forma segura mediante Serverless Functions de Vercel con la API de Google Gemini.</p>
        </div>
    `;
}

function renderNotFound() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="view-container" style="text-align: center; padding: 3rem 0;">
            <h1 class="font-serif" style="font-size: 3rem; color: var(--accent-red); margin-bottom: 1rem;">404 - Página No Encontrada</h1>
            <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">¡Vaya! Parece que te has perdido en el bosque de Forks...</h2>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">Incluso con el don de Alice, no pudimos prever esta ruta.</p>
            <a href="/home" data-link style="border: 1px solid var(--text-white); padding: 0.6rem 1.2rem; color: var(--text-white); text-decoration: none; border-radius: 4px; text-transform: uppercase; font-size: 0.9rem; transition: background 0.3s;">Volver al Inicio</a>
        </div>
    `;
}

const routes = {
    '/':     renderHome,
    '/home': renderHome,
    '/chat': renderChat,
    '/about': renderAbout
};

function router() {
    const path = window.location.pathname;

    if (path ==='/chat') {
        const state = window.history.state;
        if (state && state.characterId) {
            renderActiveChat(state.characterId);
            return;
        }
    }

    const renderFunction = routes[path] || renderNotFound;

    renderFunction();

    updateActiveNavLink(path);
}

export function navigateTo(url) {
    if (window.location.pathname !== url) {
        window.history.pushState(null, null, url);
    } else {
        window.history.replaceState(null, null, url);
    }
    router();
}

function setupLinkInterception() {
    document.body.addEventListener('click', (e) => {

        const link = e.target.closest('a');
        if (link && link.hasAttribute('data-link')) {
            e.preventDefault();
            const targetUrl = link.getAttribute('href');
            navigateTo(targetUrl);
        }
    });
}

function updateActiveNavLink(currentPath) {
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupLinkInterception();
    window.addEventListener('popstate', router);
    
    router()
});
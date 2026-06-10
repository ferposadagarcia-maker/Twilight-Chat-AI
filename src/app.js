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
    <div class="character-card" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; width: 220px; text-align: center; transition: transform 0.3s, border-color 0.3s;">
        
        <img src="/assets/${character.id}.png" alt="${character.name}" style="width: 80px; height: 80px; border-radius: 50%; objet-fit: cover: margin-bottom: 1rem; border: 2px solid var(--accent-red9;"></img>
        
        <h2 class="font-serif" style="font-size: 1.4rem; margin-bottom: 0.5rem; color: var(---text-white);">${character.name}</h2>
        <p style="font-size: 0.8rem; color: var(--accent-red); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.8rem;">${character.name}</p>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.5rem;
        height: 60px; overflow: hidden; line-height: 1.4;">${character.description}</p>
        
        <button class="select-char-btn" data-id="${character.id}" style="background-color: transparent; border: 1px solid var(--accent-red); color: var(--text-white); padding: 0.5rem
        1.rem; border-radius: 4px; cursor: pointer; width 100%; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; transition: background 0.3s;">Comenzar a chatear
        </button>
    </div>
`).join('');

    app.innerHTML = `
        <div class="view-container">
            <h1 class="font-serif" style="font-size: 2.5rem; text-align: center; margin-bottom: 1rem; letter-spacing: 1px;">Elige con quién chatear</h1>
                 <p style="text-align: center; color: var(--text-muted); margin-bottom: 2rem;">Selecciona al personaje con quién quieres pláticar:</p>

                 <div class="characters-gallery" style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">${cardsHTML}
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
        <div class="view-container" style="max-width: 600px; margin: 0 auto; width: 100%;">
            
            <header class="chat-header" style="display: flex; align-items: center; justify-content: space-between; background-color: var(--bg-secondary); padding: 1rem; border-radius: 8px 8px 0 0; border: 1px solid var(--border-color); border-bottom: none;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <img src="/assets/${character.id}.png" alt="${character.name}" style="width: 45px; height: 45px; border-radius: 50%; object-fit cover; border: 1px solid var(--accent-red);">
                    
                    <div>
                        <h2 class="font-serif" style="font-size: 1.2rem; margin: 0;">${character.name}</h2>
                        <span style="font-size: 0.75rem; color: #4cd964; display: flex; align-items: center; gap: 0.3rem;">
                            <span style="width: 8px; height: 8px; background-color: #4cd964; border-radius: 50%; display: inline-block;"></span>
                            En línea
                        </span>
                    </div>
                </div>
                <a href="/chat" data-link style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; border: 1px solid var(--border-color); padding: 0.3rem 0.6rem; border-radius: 4px;">
                    Volver ←
                </a>
            </header>

            <section id="messages-area" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); height: 350px; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
                <div style="text-align: center; color: var(--text-muted); font-size: 0.85rem; margin-top: auto; margin-bottom: auto;">
                    Comienza tu conversación con ${character.name}.
                </div>
            </section>

            <div class="composer" style="display: flex; gap: 0.5rem; background-color: var(--bg-secondary); padding: 0.8rem; border-radius: 0 0 8px 8px; border: 1px solid var(--border-color); border-top: none;">
                <textarea id="message-input" placeholder="Escribe un mensaje..." rows="1" style="flex: 1; background-color: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-white); padding: 0.6rem; border-radius: 4px; resize: none; font-family: inherit; font-size: 0.9rem; outline: none;" maxlength="400"></textarea>
                <button id="send-btn" style="background-color: var(--accent-red); border: none; color: var(--text-white); padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-weight: bold; transition: background 0.3s;">
                    Enviar
                </button>
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
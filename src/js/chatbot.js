/**
 * chatbot.js — Premium Custom Chatbot Widget
 * Floating widget at bottom-right corner with quick replies, typing animations,
 * interactive name collection, and keyword matching.
 */

const KEYWORDS = {
  pitch: 'We craft compelling, investor-ready pitch decks designed to captivate investors and secure funding. Key features include TAM/SAM/SOM market sizing, clear unit economics, and targeted storytelling. You can read details in the "What We Do" section or fill out the contact form below to get started!',
  deck: 'We craft compelling, investor-ready pitch decks designed to captivate investors and secure funding. Key features include TAM/SAM/SOM market sizing, clear unit economics, and targeted storytelling. You can read details in the "What We Do" section or fill out the contact form below to get started!',
  plan: 'Our Sustainable Business Plan for Growth service provides a comprehensive strategic roadmap covering TAM/SAM/SOM research, revenue model design, sales & marketing strategy, and 3-year financial projections to build a profitable business. Explore details in the "What We Do" section.',
  business: 'Our Sustainable Business Plan for Growth service provides a comprehensive strategic roadmap covering TAM/SAM/SOM research, revenue model design, sales & marketing strategy, and 3-year financial projections to build a profitable business. Explore details in the "What We Do" section.',
  challenge: 'The Doer Startup Ideation Challenge helps early-stage entrepreneurs refine business models and access seed funding/grants. You can register for the challenge directly using the link: <a href="https://docs.google.com/forms/d/e/1FAIpQLSdYXza_gDihHxcYEMmX20E6whOIrAiZndqy5zf7ceNZK7xnFw/viewform" target="_blank" rel="noopener noreferrer" class="chat-link">Ideation Challenge Registration →</a>',
  ideation: 'The Doer Startup Ideation Challenge helps early-stage entrepreneurs refine business models and access seed funding/grants. You can register for the challenge directly using the link: <a href="https://docs.google.com/forms/d/e/1FAIpQLSdYXza_gDihHxcYEMmX20E6whOIrAiZndqy5zf7ceNZK7xnFw/viewform" target="_blank" rel="noopener noreferrer" class="chat-link">Ideation Challenge Registration →</a>',
  register: 'You can register for the Doer Ideation Challenge directly here: <a href="https://docs.google.com/forms/d/e/1FAIpQLSdYXza_gDihHxcYEMmX20E6whOIrAiZndqy5zf7ceNZK7xnFw/viewform" target="_blank" rel="noopener noreferrer" class="chat-link">Ideation Challenge Registration →</a>',
  incubat: 'Our incubation services connect you with seasoned mentors, weekly progress tracking, and access to investor networks to help secure your first grant/cheque.',
  mentorship: 'Our mentorship connects you with weekly syncs, mock selection committees, and strategic insights. Fill out the form at the bottom of the page to connect with a mentor.',
  mentor: 'Our mentorship connects you with weekly syncs, mock selection committees, and strategic insights. Fill out the form at the bottom of the page to connect with a mentor.',
  contact: 'You can reach us through our contact form at the bottom of the page, or by email at <a href="mailto:hello@doer.global" class="chat-link">hello@doer.global</a>. Our team usually responds within 24 hours!',
  email: 'Send us an email at <a href="mailto:hello@doer.global" class="chat-link">hello@doer.global</a> and we will get back to you shortly.',
};

const QUICK_REPLIES = [
  { text: '📊 Pitch Deck Builder', query: 'Tell me about the Investor-Ready Pitch Deck' },
  { text: '📋 Business Plan', query: 'Tell me about the Sustainable Business Plan' },
  { text: '🚀 Ideation Challenge', query: 'How to register for the Ideation Challenge?' },
  { text: '✉️ Contact Us', query: 'How can I contact Doer Global?' }
];

let userName = '';
let expectingName = false;

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function init() {
  const fab = document.getElementById('chatbot-fab');
  const chatWindow = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const sendBtn = document.getElementById('chatbot-send');
  const inputEl = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  const suggestionsContainer = document.getElementById('chatbot-suggestions');

  if (!fab || !chatWindow || !messagesContainer) return;

  // Toggle Chat window
  fab.addEventListener('click', () => {
    const isActive = chatWindow.classList.contains('chatbot-window--active');
    if (isActive) {
      chatWindow.classList.remove('chatbot-window--active');
      fab.setAttribute('aria-expanded', 'false');
    } else {
      chatWindow.classList.add('chatbot-window--active');
      fab.setAttribute('aria-expanded', 'true');
      inputEl.focus();

      // Show welcome message if empty
      if (messagesContainer.children.length === 0) {
        showWelcomeMessage();
      }
    }
  });

  // Close Button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('chatbot-window--active');
      fab.setAttribute('aria-expanded', 'false');
    });
  }

  // Send message on click
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      handleUserSubmit();
    });
  }

  // Send message on Enter keypress
  if (inputEl) {
    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleUserSubmit();
      }
    });
  }

  // Render suggestion pills
  renderSuggestions();

  function showWelcomeMessage() {
    appendBotMessage(`${getGreeting()}! Welcome to Doer Global Support. What is your name?`);
    expectingName = true;
  }

  function renderSuggestions() {
    if (!suggestionsContainer) return;
    suggestionsContainer.innerHTML = QUICK_REPLIES.map(reply => `
      <button class="chat-suggestion" data-query="${reply.query}">
        ${reply.text}
      </button>
    `).join('');

    suggestionsContainer.querySelectorAll('.chat-suggestion').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.dataset.query;
        appendUserMessage(query);
        processBotResponse(query);
      });
    });
  }

  function handleUserSubmit() {
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = '';
    appendUserMessage(text);
    processBotResponse(text);
  }

  function appendUserMessage(text) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message chat-message--user';
    msgEl.innerHTML = `
      <div class="chat-message__bubble">${escapeHTML(text)}</div>
    `;
    messagesContainer.appendChild(msgEl);
    scrollToBottom();
  }

  function appendBotMessage(html) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message chat-message--bot';
    msgEl.innerHTML = `
      <div class="chat-message__avatar">D</div>
      <div class="chat-message__bubble">${html}</div>
    `;
    messagesContainer.appendChild(msgEl);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const indicatorEl = document.createElement('div');
    indicatorEl.className = 'chat-message chat-message--bot chat-typing-indicator';
    indicatorEl.id = 'chat-typing-indicator';
    indicatorEl.innerHTML = `
      <div class="chat-message__avatar">D</div>
      <div class="chat-message__bubble">
        <span class="chat-dot"></span>
        <span class="chat-dot"></span>
        <span class="chat-dot"></span>
      </div>
    `;
    messagesContainer.appendChild(indicatorEl);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  function processBotResponse(rawText) {
    const text = rawText.toLowerCase();

    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();

      // Check name collection state
      if (expectingName) {
        userName = rawText;
        expectingName = false;
        appendBotMessage(`Nice to meet you, ${escapeHTML(userName)}! How can Doer Global assist you with your startup today?`);
        return;
      }

      // Check greeting inputs dynamically
      const greetingWords = ['hello', 'hi', 'hey', 'greetings'];
      const isGreeting = greetingWords.some(word => text.includes(word));

      if (isGreeting) {
        if (userName) {
          appendBotMessage(`${getGreeting()}, ${escapeHTML(userName)}! How can I assist you with your venture today?`);
        } else {
          appendBotMessage(`${getGreeting()}! Welcome to Doer Global Support. What is your name?`);
          expectingName = true;
        }
        return;
      }

      // Keyword lookup
      let matchedResponse = '';
      for (const [key, value] of Object.entries(KEYWORDS)) {
        if (text.includes(key)) {
          matchedResponse = value;
          break;
        }
      }

      if (matchedResponse) {
        appendBotMessage(matchedResponse);
      } else {
        appendBotMessage(
          `I'm not sure I understand, ${escapeHTML(userName || 'there')}. But I can help you with Pitch Decks, Business Plans, Mentorship, or the Ideation Challenge. Please ask a related question or click a suggestion below.`
        );
      }
    }, 750); // Premium interactive delay
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

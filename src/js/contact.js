/**
 * contact.js — Contact form with floating labels, validation & toast notifications
 */

export function init() {
  renderForm();
  initValidation();
}

/**
 * Show a toast notification
 * @param {string} message - Toast message text
 * @param {'success'|'error'} type - Toast type
 */
export function showToast(message, type = 'success') {
  // Remove any existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : '✕'}</span>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.classList.add('toast--exit');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

function renderForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.innerHTML = `
    <div class="input-group">
      <input 
        type="text" 
        class="input-group__input" 
        id="contact-name" 
        name="name" 
        placeholder=" " 
        required
        autocomplete="name"
      />
      <label class="input-group__label" for="contact-name">Your Name</label>
      <span class="input-group__error" id="name-error">Please enter your name</span>
    </div>

    <div class="input-group">
      <input 
        type="email" 
        class="input-group__input" 
        id="contact-email" 
        name="email" 
        placeholder=" " 
        required
        autocomplete="email"
      />
      <label class="input-group__label" for="contact-email">Email Address</label>
      <span class="input-group__error" id="email-error">Please enter a valid email</span>
    </div>

    <div class="input-group">
      <select 
        class="input-group__input" 
        id="contact-subject" 
        name="subject" 
        required
      >
        <option value="" disabled selected>Select a Subject</option>
        <option value="pitch-deck">Pitch Deck</option>
        <option value="business-plan">Business Plan</option>
        <option value="mentorship">Mentorship</option>
        <option value="ideation">Ideation Challenge</option>
        <option value="other">Other</option>
      </select>
      <label class="input-group__label" for="contact-subject" style="top: -4px; font-size: 0.75rem; color: var(--accent-primary);">Subject</label>
      <span class="input-group__error" id="subject-error">Please select a subject</span>
    </div>

    <div class="input-group">
      <textarea 
        class="input-group__input" 
        id="contact-message" 
        name="message" 
        placeholder=" " 
        required
        rows="4"
      ></textarea>
      <label class="input-group__label" for="contact-message" style="top: -4px; font-size: 0.75rem; color: var(--accent-primary);">Your Message</label>
      <span class="input-group__error" id="message-error">Please enter a message</span>
    </div>

    <button type="submit" class="btn btn-primary" id="contact-submit">
      Send Message
    </button>
  `;
}

function initValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Inline validation on blur
  const fields = [
    { id: 'contact-name', errorId: 'name-error', validate: (v) => v.trim().length > 0 },
    { id: 'contact-email', errorId: 'email-error', validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'contact-subject', errorId: 'subject-error', validate: (v) => v.length > 0 },
    { id: 'contact-message', errorId: 'message-error', validate: (v) => v.trim().length > 10 },
  ];

  fields.forEach(({ id, errorId, validate }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);
    if (!input || !error) return;

    input.addEventListener('blur', () => {
      const isValid = validate(input.value);
      input.classList.toggle('input--error', !isValid);
      input.classList.toggle('input--valid', isValid);
      error.classList.toggle('visible', !isValid);
    });

    // Clear error on focus
    input.addEventListener('focus', () => {
      input.classList.remove('input--error');
      error.classList.remove('visible');
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let allValid = true;
    fields.forEach(({ id, errorId, validate }) => {
      const input = document.getElementById(id);
      const error = document.getElementById(errorId);
      if (!input || !error) return;
      const isValid = validate(input.value);
      input.classList.toggle('input--error', !isValid);
      input.classList.toggle('input--valid', isValid);
      error.classList.toggle('visible', !isValid);
      if (!isValid) allValid = false;
    });

    if (!allValid) {
      showToast('Please fill in all fields correctly.', 'error');
      return;
    }

    // Show loading state
    const submitBtn = document.getElementById('contact-submit');
    if (submitBtn) {
      submitBtn.classList.add('btn--loading');
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    }

    // Simulate submission
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.classList.remove('btn--loading');
        submitBtn.innerHTML = '✓ Sent!';
        setTimeout(() => {
          submitBtn.innerHTML = 'Send Message';
        }, 2000);
      }

      showToast('Message sent successfully! We\'ll get back to you soon.', 'success');

      // Reset form
      form.reset();
      fields.forEach(({ id }) => {
        const input = document.getElementById(id);
        if (input) {
          input.classList.remove('input--valid', 'input--error');
        }
      });
    }, 1500);
  });
}

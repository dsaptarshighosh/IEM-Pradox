/**
 * Living Lens - Form Validation & UI Helpers
 * Replaces native alert() with styled inline feedback.
 */

export function showError(inputEl, message) {
  clearError(inputEl);
  inputEl.classList.add('input-error');
  
  const errorMsg = document.createElement('div');
  errorMsg.className = 'field-error-msg';
  errorMsg.textContent = message;
  
  // Insert right after input or select wrapper
  const container = inputEl.closest('.select-wrapper') || inputEl;
  container.insertAdjacentElement('afterend', errorMsg);
}

export function clearError(inputEl) {
  inputEl.classList.remove('input-error');
  const parent = inputEl.closest('.form-group') || inputEl.parentElement;
  if (parent) {
    const existing = parent.querySelector('.field-error-msg');
    if (existing) existing.remove();
  }
}

export function setupFormValidation(form, submitCallback) {
  if (!form) return;

  // Clear errors on input
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => clearError(input));
    input.addEventListener('change', () => clearError(input));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let hasError = false;

    // Check required fields
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      const val = (input.value || '').trim();
      if (!val) {
        showError(input, 'This field is required');
        hasError = true;
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showError(input, 'Please enter a valid email address');
        hasError = true;
      } else if (input.type === 'number') {
        const num = parseFloat(val);
        const min = input.getAttribute('min');
        const max = input.getAttribute('max');
        if (min !== null && num < parseFloat(min)) {
          showError(input, `Value must be at least ${min}`);
          hasError = true;
        } else if (max !== null && num > parseFloat(max)) {
          showError(input, `Value cannot exceed ${max}`);
          hasError = true;
        }
      }
    });

    if (!hasError && submitCallback) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      await submitCallback(data, form);
    }
  });
}

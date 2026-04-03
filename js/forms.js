(function () {
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateField(input) {
    if (!input) return true;
    const value = input.value.trim();

    if (input.hasAttribute('required') && !value) {
      return false;
    }

    if (input.type === 'email' && value && !isValidEmail(value)) {
      return false;
    }

    return true;
  }

  function setFeedback(node, type, message) {
    if (!node) return;
    node.classList.remove('success', 'error');
    node.classList.add(type);
    node.textContent = message;
    node.style.display = 'block';
  }

  async function submitToNetlify(form) {
    const formData = new FormData(form);
    const encoded = new URLSearchParams(formData).toString();
    return fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encoded,
    });
  }

  function initForms() {
    const forms = document.querySelectorAll('form[data-netlify="true"]');
    if (!forms.length) return;

    forms.forEach((form) => {
      const feedback = form.querySelector('.form-feedback');

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let valid = true;

        requiredFields.forEach((field) => {
          const fieldValid = validateField(field);
          field.setAttribute('aria-invalid', String(!fieldValid));
          if (!fieldValid) valid = false;
        });

        if (!valid) {
          setFeedback(feedback, 'error', 'Please complete all required fields correctly.');
          return;
        }

        try {
          if (window.location.protocol === 'file:') {
            setFeedback(feedback, 'success', 'Form validated successfully. On Netlify, this will submit and send notifications.');
            form.reset();
            return;
          }

          const response = await submitToNetlify(form);
          if (response.ok) {
            setFeedback(feedback, 'success', 'Thank you. Your message has been sent successfully.');
            form.reset();
          } else {
            setFeedback(feedback, 'error', 'Submission failed. Please try again shortly.');
          }
        } catch (error) {
          setFeedback(feedback, 'error', 'Network issue. Please check your connection and try again.');
        }
      });
    });
  }

  window.FormsModule = {
    initForms,
  };
})();

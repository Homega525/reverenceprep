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

  function setSubmitState(button, isLoading) {
    if (!button) return;
    if (!button.dataset.defaultText) {
      button.dataset.defaultText = button.textContent || '';
    }
    button.disabled = isLoading;
    button.setAttribute('aria-busy', String(isLoading));
    button.textContent = isLoading ? 'Submitting...' : button.dataset.defaultText;
  }

  async function submitToNetlify(form) {
    return fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
  }

  function getSuccessMessage(formName) {
    if (formName === 'admission-form') {
      return 'Thank you! Your admission application has been received. We will contact you shortly.';
    }
    if (formName === 'contact-form' || formName === 'quick-contact-form') {
      return 'Thank you for reaching out! We will get back to you as soon as possible.';
    }
    return 'Thank you. Your submission has been received.';
  }

  function initForms() {
    const forms = document.querySelectorAll('form[data-netlify="true"]');
    if (!forms.length) return;

    forms.forEach((form) => {
      const feedback = form.querySelector('.form-feedback');
      const submitBtn = form.querySelector('button[type="submit"]');
      const formName = form.getAttribute('name') || '';

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
          setSubmitState(submitBtn, true);

          if (window.location.protocol === 'file:') {
            setFeedback(
              feedback,
              'error',
              'Please run this site through a local server to test form submissions.'
            );
            return;
          }

          const response = await submitToNetlify(form);
          if (response.ok) {
            setFeedback(feedback, 'success', getSuccessMessage(formName));
            form.reset();
          } else {
            setFeedback(feedback, 'error', 'Something went wrong. Please try again.');
          }
        } catch (error) {
          setFeedback(feedback, 'error', 'Something went wrong. Please try again.');
        } finally {
          setSubmitState(submitBtn, false);
        }
      });
    });
  }

  window.FormsModule = {
    initForms,
  };
})();

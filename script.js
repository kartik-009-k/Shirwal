(function () {
  // Robust modal handling wrapped in DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    const FOCUSABLE_SELECTORS = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    // Keep track of the currently open modal and the element that had focus before opening
    let openModal = null;
    let previousActiveElement = null;

    function getModal(selectorOrElement) {
      if (!selectorOrElement) return null;
      if (typeof selectorOrElement === 'string') {
        try {
          return document.querySelector(selectorOrElement);
        } catch (e) {
          return null;
        }
      }
      return selectorOrElement instanceof Element ? selectorOrElement : null;
    }

    function trapFocus(modal) {
      if (!modal) return;
      const focusables = Array.from(modal.querySelectorAll(FOCUSABLE_SELECTORS));
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      function handleTab(e) {
        if (e.key !== 'Tab') return;
        if (focusables.length === 1) {
          e.preventDefault();
          first.focus();
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }

      modal.__modalTabHandler = handleTab;
      modal.addEventListener('keydown', handleTab);
    }

    function releaseFocusTrap(modal) {
      if (!modal || !modal.__modalTabHandler) return;
      modal.removeEventListener('keydown', modal.__modalTabHandler);
      delete modal.__modalTabHandler;
    }

    function openModalElement(modal) {
      modal = getModal(modal);
      if (!modal || openModal === modal) return;

      previousActiveElement = document.activeElement;
      openModal = modal;

      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('is-open');

      // make modal focusable
      if (!modal.hasAttribute('tabindex')) modal.setAttribute('tabindex', '-1');

      // focus the first meaningful element inside modal
      const focusable = modal.querySelector(FOCUSABLE_SELECTORS);
      (focusable || modal).focus();

      // trap focus
      trapFocus(modal);

      // add escape and overlay click handlers
      document.addEventListener('keydown', handleDocumentKeydown);
    }

    function closeModalElement(modal, options = {}) {
      modal = getModal(modal) || openModal;
      if (!modal) return;

      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('is-open');

      releaseFocusTrap(modal);

      // restore focus
      try {
        if (options.restoreFocus !== false && previousActiveElement && previousActiveElement.focus) {
          previousActiveElement.focus();
        }
      } catch (e) {
        // ignore focus restore errors
      }

      openModal = null;
      previousActiveElement = null;

      document.removeEventListener('keydown', handleDocumentKeydown);
    }

    function handleDocumentKeydown(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (openModal) closeModalElement(openModal);
      }
    }

    // Delegated event handling for open and close triggers
    // Open triggers: [data-modal-target] or [data-modal-open] attributes
    document.addEventListener('click', (e) => {
      const openTrigger = e.target.closest('[data-modal-target], [data-modal-open]');
      if (openTrigger) {
        e.preventDefault();
        const target = openTrigger.getAttribute('data-modal-target') || openTrigger.getAttribute('data-modal-open');
        if (target) {
          openModalElement(target);
        } else {
          // Fallback: data-modal-open could be used as boolean on a button located next to a modal element
          const autoModal = openTrigger.closest('[data-modal]') || document.querySelector('.modal');
          if (autoModal) openModalElement(autoModal);
        }
        return;
      }

      const closeTrigger = e.target.closest('[data-modal-close]');
      if (closeTrigger) {
        e.preventDefault();
        // allow data-modal-close to specify the selector or be inside the modal
        const target = closeTrigger.getAttribute('data-modal-close');
        if (target) closeModalElement(target);
        else closeModalElement();
        return;
      }

      // Click on modal overlay to close: look for element with attribute data-modal or role="dialog"
      const modalOverlay = e.target.closest('[data-modal], .modal, [role="dialog"]');
      if (modalOverlay && modalOverlay === e.target) {
        // clicked directly on overlay/background
        closeModalElement(modalOverlay);
      }
    });

    // Also listen for clicks specifically on the modal overlay area for better reliability
    // This covers cases where overlay class is .modal or data-modal attribute is used
    const overlaySelectors = '[data-modal], .modal, [role="dialog"]';
    Array.from(document.querySelectorAll(overlaySelectors)).forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModalElement(overlay);
      });
    });

    // Provide a small public API on window in case inline handlers or other scripts rely on it
    window.ModalManager = {
      open(selectorOrElement) {
        openModalElement(selectorOrElement);
      },
      close(selectorOrElement) {
        closeModalElement(selectorOrElement);
      },
      isOpen() {
        return !!openModal;
      }
    };

    // If there's a specific contact modal identified by #contactModal, ensure it gets overlay click handler
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
      contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) closeModalElement(contactModal);
      });
    }

    // Defensive: ensure any existing inline data attributes on contact open/close buttons will work
    // No further action needed here since delegation above covers them
  });
})();

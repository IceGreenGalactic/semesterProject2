let registrationModal;

// Create the registration modal element
registrationModal = document.createElement('div');
registrationModal.classList.add('modal', 'fade');
registrationModal.id = 'registrationModal';
registrationModal.setAttribute('tabindex', '-1');
registrationModal.setAttribute('aria-labelledby', 'registrationModalLabel');
registrationModal.setAttribute('aria-hidden', 'true');

// Add modal content
registrationModal.innerHTML = `

<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h2 class="modal-title headline-text" id="registrationModalLabel">Register at AuctionHouse</h2>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <form id="registrationForm">
        <div class="mb-3">
          <label for="email" class="login-text form-label">Email</label>
          <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
        </div>
        <div class="mb-3">
          <label for="password" class="login-text form-label">Password</label>
          <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password">
        </div>
        <div class="mb-3">
          <label for="name" class="login-text form-label">Username</label>
          <input type="text" class="form-control" id="name" name="name" placeholder="Enter your username">
        </div>
        <div class="mb-3">
          <label for="avatar" class="login-text form-label">Avatar</label>
          <input type="url" class="form-control" id="avatar" name="avatar" placeholder="Enter a URL">
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mb-4">Register</button>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <div class="text-secondary text-center">
        <p class="m-0">Already have an account? <a href="#!" class="login-text link text-decoration-none"
          id="logInLink">Login</a></p>
      </div>
    </div>
  </div>
</div>
</div>
`;

// Append the registration modal to the body
document.body.appendChild(registrationModal);

// Export the registration modal for use in other modules if needed
export { registrationModal };
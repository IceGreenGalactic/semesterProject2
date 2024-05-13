let loginModal;

loginModal = document.createElement('div');
loginModal.classList.add('modal', 'fade');
loginModal.id = 'loginModal';
loginModal.setAttribute('tabindex', '-1');
loginModal.setAttribute('aria-labelledby', 'loginModalLabel');
loginModal.setAttribute('aria-hidden', 'true');

// Add modal content
loginModal.innerHTML = `
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h2 class="modal-title headline-text" id="loginModalLabel">Login to<br />AuctionHouse</h2>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <form id="loginForm">
        <div class="mb-3">
          <label for="email" class="login-text form-label">Email</label>
          <input type="text" class="form-control" id="email" name="email" placeholder="Enter your email">
        </div>
        <div class="mb-3">
          <label for="password" class="login-text form-label">Password</label>
          <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password">
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" name="rememberMe" id="rememberMe">
            <label class="login-text form-check-label text-secondary" for="rememberMe">Keep me logged in</label>
          </div>
          <a href="#!" class="login-text link text-decoration-none">Forgot password?</a>
        </div>
        <div class="d-grid my-3">
          <button type="submit" class="btn btn-primary btn-md">Log in</button>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <div class="text-secondary text-center">
        <p class="m-0">Don't have an account? <a href="#!" class="login-text link text-decoration-none"
            id="signUpLink">Sign up</a>
      </div>
    </div>
  </div>
</div>
`;

document.body.appendChild(loginModal);

export { loginModal };

/**
 * Shared Navbar Component for Living Lens
 * Injected automatically into every page.
 */

export function renderNavbar() {
  const existingNav = document.getElementById('navbar');
  const target = existingNav || document.createElement('header');

  if (!existingNav) {
    target.id = 'navbar';
    document.body.prepend(target);
  }

  // Determine current page & auth state
  const pathname = window.location.pathname;
  const page = pathname.split('/').pop() || 'index.html';
  const userJson = localStorage.getItem('livinglens_user');
  const user = userJson ? JSON.parse(userJson) : null;

  // Build nav action buttons based on design PDF
  let actionsHtml = '';

  const isAuthPage = [
    'signin.html',
    'zookeeper-login.html',
    'admin-login.html',
    'citizen-login.html',
    'citizen-register.html'
  ].includes(page);

  const isIndex = page === 'index.html' || page === '';

  if (isIndex) {
    if (user) {
      const dashboardLink = 
        user.role === 'zookeeper' ? 'observations.html' :
        user.role === 'admin' ? 'admin-zookeeper-creator.html' :
        'citizen-home.html';
      actionsHtml = `
        <a href="${dashboardLink}" class="nav-btn">Dashboard</a>
        <a href="live-map.html" class="nav-btn">Live Map</a>
        <button id="nav-sign-out-btn" class="nav-btn" style="background:#f06a6a; color:#fff;">Sign Out</button>
      `;
    } else {
      actionsHtml = `
        <a href="signin.html" class="nav-btn">Sign In</a>
        <a href="live-map.html" class="nav-btn">Live Map</a>
      `;
    }
  } else if (isAuthPage) {
    actionsHtml = `
      <a href="index.html" class="nav-btn">Home</a>
    `;
  } else if (page === 'live-map.html') {
    if (user) {
      actionsHtml = `
        <a href="index.html" class="nav-btn">Home</a>
        <button id="nav-sign-out-btn" class="nav-btn" style="background:#f06a6a; color:#fff;">Sign Out</button>
      `;
    } else {
      actionsHtml = `
        <a href="index.html" class="nav-btn">Home</a>
        <a href="signin.html" class="nav-btn">Sign In</a>
      `;
    }
  } else {
    // Logged in pages: observations, upload-observation, citizen-home, admin-zookeeper-creator
    actionsHtml = `
      <a href="index.html" class="nav-btn">Home</a>
      <a href="live-map.html" class="nav-btn">Live Map</a>
      <button id="nav-sign-out-btn" class="nav-btn" style="background:#f06a6a; color:#fff;">Sign Out</button>
    `;
  }

  target.innerHTML = `
    <nav class="navbar-container">
      <a href="index.html" class="navbar-logo">Living Lens</a>
      <div class="navbar-actions">
        ${actionsHtml}
      </div>
    </nav>
  `;

  // Attach sign out event listener if present
  const signOutBtn = document.getElementById('nav-sign-out-btn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      localStorage.removeItem('livinglens_user');
      window.location.href = 'index.html';
    });
  }
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderNavbar);
} else {
  renderNavbar();
}

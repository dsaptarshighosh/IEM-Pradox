/**
 * Living Lens - Mock Authentication & Route Guards
 */

const STORAGE_KEY = 'livinglens_user';

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const user = raw ? JSON.parse(raw) : null;
    if (user?.role === 'zookeeper') {
      user.role = 'forest_officer';
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
    return user;
  } catch {
    return null;
  }
}

export function saveUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
}

export function signOut() {
  clearUser();
  window.location.href = 'index.html';
}

/**
 * Enforces role access for guarded pages.
 * @param {string} requiredRole - 'forest_officer' | 'admin' | 'citizen'
 */
export function requireRole(requiredRole) {
  const user = getCurrentUser();

  if (!user || user.role !== requiredRole) {
    // Redirect to corresponding role login page
    if (requiredRole === 'forest_officer') {
      window.location.href = 'officer-login.html';
    } else if (requiredRole === 'admin') {
      window.location.href = 'admin-login.html';
    } else if (requiredRole === 'citizen') {
      window.location.href = 'citizen-login.html';
    } else {
      window.location.href = 'signin.html';
    }
    return false;
  }

  return true;
}

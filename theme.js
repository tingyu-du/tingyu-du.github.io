(() => {
  const key = 'tingyu-du-theme';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem(key); } catch {}
  function apply(theme) {
    root.dataset.theme = theme;
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-checked', String(theme === 'dark'));
      toggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }
  const current = () => preference === 'dark' || preference === 'light'
    ? preference : system.matches ? 'dark' : 'light';
  apply(current());
  document.addEventListener('DOMContentLoaded', () => apply(current()));
  document.addEventListener('click', event => {
    if (!event.target.closest?.('.theme-toggle')) return;
    preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(key, preference); } catch {}
    apply(preference);
  });
  system.addEventListener('change', () => apply(current()));
  window.addEventListener('storage', event => {
    if (event.key !== key) return;
    preference = event.newValue;
    apply(current());
  });
})();

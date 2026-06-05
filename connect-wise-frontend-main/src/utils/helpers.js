import Cookies from 'js-cookie';

export function decodeJWT(token) {
  if (!token) return null;
  const payload = token.split('.')[1];
  const decoded = atob(payload);
  return JSON.parse(decoded);
}

export function getTokenCookie() {
  const cookieName = import.meta.env.VITE_COOKIE_NAME;
  if (!cookieName) return null;
  return Cookies.get(cookieName);
}

export function setTokenCookie(token) {
  const cookieName = import.meta.env.VITE_COOKIE_NAME;
  if (!cookieName) throw Error('Cookie name is not defined');
  Cookies.set(cookieName, token, { expires: 7 });
}

export function removeTokenCookie() {
  const cookieName = import.meta.env.VITE_COOKIE_NAME;
  if (!cookieName) throw Error('Cookie name is not defined');
  Cookies.remove(cookieName);
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function paginationNumbers(start, total) {
  var current = start,
    last = total,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

export function formatMoney(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

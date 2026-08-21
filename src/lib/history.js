const KEY = 'tarot-nhatky';
const MAX_ENTRIES = 20;

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(history) {
  try {
    localStorage.setItem(KEY, JSON.stringify(history));
  } catch {
    // hết chỗ hoặc bị chặn — nhật ký vẫn sống trong phiên này.
  }
}

export function pushEntry(history, entry) {
  return [entry, ...history].slice(0, MAX_ENTRIES);
}

export function today() {
  return new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

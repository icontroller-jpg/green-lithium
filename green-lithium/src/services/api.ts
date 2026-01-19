// src/services/api.ts
let API_BASE = "";

export async function loadConfig() {
  const res = await fetch("/config/");
  const cfg = await res.json();
  API_BASE = cfg.API_BASE;
}

export async function apiFetch(path: string, options?: RequestInit) {
  if (!API_BASE) {
    throw new Error("API base not loaded");
  }
  return fetch(`${API_BASE}${path}`, options);
}

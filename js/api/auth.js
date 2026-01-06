import {
  AUTHENTICATION_URL,
  REQUEST_TOKEN_URL,
  SESSION_URL,
} from '/js/constants.js';

export async function authentication ({ apiKey }) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json',
  });

  const response = await fetch(AUTHENTICATION_URL, { headers });

  if (!response.ok) {
    throw new Error('API KEY invalida');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error('API KEY invalida');
  }
}

export async function generateRequestToken ({ apiKey }) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json',
  });
  const response = await fetch(REQUEST_TOKEN_URL, { headers });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error('Authentication failed');
  }

  if (!('request_token' in data)) {
    throw new Error('Authentication failed');
  }

  return data;
}

export async function generateSession ({ requestToken, apiKey }) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json',
  });

  const response = await fetch(SESSION_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({ request_token: requestToken }),
  });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error('Authentication failed');
  }

  if (!('session_id' in data)) {
    throw new Error('Authentication failed');
  }

  return data;
}
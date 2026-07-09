const trackingEndpoint = '/api/telegram-event';

function getDeviceType() {
  const userAgent = navigator.userAgent || '';

  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
  if (/mobi|android|iphone|ipod|blackberry|phone/i.test(userAgent)) return 'mobile';
  return 'desktop';
}

function getClientContext() {
  return {
    url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer || 'direct',
    language: navigator.language,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    deviceType: getDeviceType(),
    screen: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function trackTelegramEvent(event, details = {}) {
  if (typeof window === 'undefined') return;

  fetch(trackingEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event,
      details,
      client: getClientContext(),
      sentAt: new Date().toISOString(),
    }),
    keepalive: true,
  }).catch(() => {
    // Tracking must never break the reading experience.
  });
}

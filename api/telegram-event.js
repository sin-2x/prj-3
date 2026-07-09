const maxTextLength = 3500;
const uzbekistanTimeZone = 'Asia/Tashkent';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

async function getIpLocation(ip) {
  if (!ip || ip === 'unknown' || ip === '::1' || ip === '127.0.0.1') {
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1800);

  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: controller.signal,
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!data.success) return null;

    return {
      country: data.country,
      region: data.region,
      city: data.city,
      isp: data.connection?.isp,
      org: data.connection?.org,
      asn: data.connection?.asn,
    };
  } catch (error) {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function eventTitle(event) {
  const titles = {
    site_open: 'Сайт открыт',
    book_open: 'Книга открыта',
    page_next: 'Нажали Келесі бет',
    page_previous: 'Нажали Алдыңғы бет',
  };

  return titles[event] || event;
}

function formatUzbekistanTime(value) {
  const date = value ? new Date(value) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;

  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: uzbekistanTimeZone,
  }).format(safeDate);
}

function formatLocation(location) {
  if (!location) return 'Не удалось определить';

  const place = [location.city, location.region, location.country].filter(Boolean).join(', ');
  const network = [location.isp || location.org, location.asn ? `AS${location.asn}` : ''].filter(Boolean).join(' / ');

  if (place && network) return `${place} (${network})`;
  return place || network || 'Не удалось определить';
}

async function buildMessage(payload, req) {
  const { event, details = {}, client = {}, sentAt } = payload;
  const ip = getIp(req);
  const location = await getIpLocation(ip);
  const rows = [
    `<b>${escapeHtml(eventTitle(event))}</b>`,
    '',
    `<b>Время UZ:</b> ${escapeHtml(formatUzbekistanTime(sentAt))}`,
    `<b>Время ISO:</b> ${escapeHtml(sentAt || new Date().toISOString())}`,
    `<b>URL:</b> ${escapeHtml(client.url)}`,
    `<b>Страница книги:</b> ${escapeHtml(details.page || '-')}`,
    `<b>Действие:</b> ${escapeHtml(details.action || event)}`,
    `<b>Источник клика:</b> ${escapeHtml(details.source || '-')}`,
    '',
    `<b>Устройство:</b> ${escapeHtml(client.deviceType || 'unknown')}`,
    `<b>Экран:</b> ${escapeHtml(client.screen || '-')}`,
    `<b>Окно:</b> ${escapeHtml(client.viewport || '-')}`,
    `<b>Язык:</b> ${escapeHtml(client.language || '-')}`,
    `<b>Таймзона клиента:</b> ${escapeHtml(client.timezone || '-')}`,
    `<b>Платформа:</b> ${escapeHtml(client.platform || '-')}`,
    `<b>IP:</b> ${escapeHtml(ip)}`,
    `<b>Локация по IP:</b> ${escapeHtml(formatLocation(location))}`,
    `<b>Referrer:</b> ${escapeHtml(client.referrer || 'direct')}`,
    '',
    `<b>User-Agent:</b> ${escapeHtml(client.userAgent || '-')}`,
  ];

  return rows.join('\n').slice(0, maxTextLength);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(200).json({ ok: false, skipped: 'Telegram env vars are not configured' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const text = await buildMessage(payload || {}, req);

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ ok: false, error: 'Telegram request failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(400).json({ ok: false, error: 'Bad request' });
  }
}

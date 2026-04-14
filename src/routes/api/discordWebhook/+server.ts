import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const WEBHOOK = env.DC_WEBHOOK;

const ipCooldown = new Map<string, number>();
const COOLDOWN_MS = 3000;

export const POST: RequestHandler = async ({ request }) => {
	if (!WEBHOOK) {
		return new Response('Webhook not configured', { status: 500 });
	}

	let text = '';
	let image: string | null = null;

	try {
		const data = await request.json();
		text = data.text ?? '';
		image = data.image ?? null;
	} catch {
		return new Response('Invalid JSON', { status: 400 });
	}

	const ip =
		request.headers.get('x-forwarded-for')?.split(',')[0] ||
		request.headers.get('cf-connecting-ip') ||
		'unknown';

	const now = Date.now();
	const last = ipCooldown.get(ip) ?? 0;

	if (now - last < COOLDOWN_MS) {
		return new Response('Slow down', { status: 429 });
	}

	ipCooldown.set(ip, now);

	type Payload = {
		content: string;
	};

	const body: Payload = {
		content: text || ''
	};

	if (image) {
		const base64 = image.split(',')[1];

		const form = new FormData();
		form.append('payload_json', JSON.stringify(body));
		form.append('file', new Blob([Buffer.from(base64, 'base64')]), 'drawing.png');

		await fetch(WEBHOOK, {
			method: 'POST',
			body: form
		});
	} else {
		await fetch(WEBHOOK, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
	}

	return new Response('ok');
};

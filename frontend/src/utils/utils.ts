import { YTREGREX } from './constants';

export const getYoutubeId = (url: string): string | null => {
  const match = url.match(YTREGREX);
  return match && match[1].length === 11 ? match[1] : null;
};

export const getXId = (url: string) => {
  const match = url.match(/(?:status|statuse)\/(\d+)/);
  return match ? match[1] : null;
};

export async function checkIsPdf(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return contentType === 'application/pdf';
  } catch (error) {
    console.error('Could not verify link', error);
    return false;
  }
}

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '')
    .replace(/^-+|-+$/g, '');
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy!', err);
  }
};

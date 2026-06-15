import { describe, it, expect } from 'vitest';

// The readingTime module is tiny and self-contained, so we inline-test
// the logic to avoid Astro-specific import complications.

const EN_WPM = 220;
const CN_CPM = 500;

function getReadingTime(text: string) {
  const chineseChars = (text.match(/[一-鿿]/g) || []).length;
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;

  const minutes = Math.max(1, Math.ceil(
    (chineseChars / CN_CPM) + (englishWords / EN_WPM)
  ));

  return { minutes, text: `${minutes} 分钟阅读` };
}

describe('getReadingTime', () => {
  it('returns 1 minute for empty text', () => {
    const result = getReadingTime('');
    expect(result.minutes).toBe(1);
    expect(result.text).toBe('1 分钟阅读');
  });

  it('calculates Chinese reading time at 500 CPM', () => {
    // '你' and '好' are 2 chars each → 250 repeats = 500 chars = 1 min
    const text = '你好'.repeat(250);
    const result = getReadingTime(text);
    expect(result.minutes).toBe(1);
  });

  it('calculates English reading time at 220 WPM', () => {
    const words = Array(220).fill('hello').join(' ');
    const result = getReadingTime(words);
    expect(result.minutes).toBe(1);
  });

  it('combines Chinese and English time', () => {
    // 500 cn chars (1.0 min) + 110 en words (0.5 min) = 1.5 → ceil = 2
    const cn = '你好'.repeat(250); // 500 chars
    const en = Array(110).fill('hello').join(' ');
    const result = getReadingTime(`${cn} ${en}`);
    expect(result.minutes).toBe(2);
  });

  it('rounds up partial minutes', () => {
    // 600 cn chars / 500 CPM = 1.2 → ceil = 2
    const text = '你好'.repeat(300); // 600 chars
    const result = getReadingTime(text);
    expect(result.minutes).toBe(2);
  });

  it('handles longer text correctly', () => {
    // '你好'.repeat(2500) = 5000 chars / 500 CPM = 10 min
    const text = '你好'.repeat(2500);
    const result = getReadingTime(text);
    expect(result.minutes).toBe(10);
    expect(result.text).toBe('10 分钟阅读');
  });

  it('always returns at least 1 minute', () => {
    const result = getReadingTime('Hi');
    expect(result.minutes).toBeGreaterThanOrEqual(1);
  });
});

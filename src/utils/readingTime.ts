const WORDS_PER_MINUTE = 220;

export function getReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));

  return {
    minutes,
    text: `${minutes} min read`
  };
}

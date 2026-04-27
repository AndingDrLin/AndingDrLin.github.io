const WORDS_PER_MINUTE = 220;
const CHARS_PER_MINUTE = 500;

export function getReadingTime(text: string) {
  const words = text.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;
  const chineseChars = text.match(/[一-鿿]/g)?.length ?? 0;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE + chineseChars / CHARS_PER_MINUTE));

  return {
    minutes,
    text: `${minutes} 分钟阅读`
  };
}

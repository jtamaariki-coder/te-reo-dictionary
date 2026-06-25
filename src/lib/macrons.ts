const MACRON_MAP: Record<string, string> = {
  ā: 'a', Ā: 'A',
  ē: 'e', Ē: 'E',
  ī: 'i', Ī: 'I',
  ō: 'o', Ō: 'O',
  ū: 'u', Ū: 'U',
}

export function stripMacrons(str: string): string {
  return str.replace(/[āĀēĒīĪōŌūŪ]/g, (ch) => MACRON_MAP[ch] ?? ch)
}

export function normalise(str: string): string {
  return stripMacrons(str).toLowerCase()
}

export function formatText(text: string, maxChar: number): string {
    return text.length > maxChar ? (text.substring(0,maxChar)+'...') : text
}

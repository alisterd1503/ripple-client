export default function validateUsername(username: string, usedNames: string[]) {
    if (username.trim().length < 1) return { valid: false, message: 'Username must be at least one character long.' };
    if (/\s/.test(username)) return { valid: false, message: 'Username cannot contain spaces.' };
    if (usedNames.includes(username)) return { valid: false, message: 'Username is already taken.' };
    return { valid: true, message: 'Username is valid.' };
}
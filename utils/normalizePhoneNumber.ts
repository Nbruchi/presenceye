export function normalizePhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, "");

    // If the number starts with 0, replace with country code
    if (digitsOnly.startsWith("0")) {
        return `250${digitsOnly.slice(1)}`;
    }

    // If the number doesn't start with country code, add it
    if (!digitsOnly.startsWith("250")) {
        return `250${digitsOnly}`;
    }

    return digitsOnly;
}

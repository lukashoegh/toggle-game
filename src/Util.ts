export function toString(stringSymbol: string | symbol): string {
    return (typeof stringSymbol === 'string') ? stringSymbol : '(unnamed)';
}

/**
 * Attempts to parse a string or number into an number. If it fails just returns the original.
 * @param value The string or number to be parsed
 */
export function defensiveParseInt(value: string | number): string | number {
    let valueAsNumber = parseInt(value + '', 10);
    return (isNaN(valueAsNumber)) ? value : valueAsNumber;
}
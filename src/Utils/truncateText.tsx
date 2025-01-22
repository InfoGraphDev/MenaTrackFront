export function TruncateTextFunction(text, maxLength = 40) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
}

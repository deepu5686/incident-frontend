export const dateFormatter = (timestamp: string): string => {

    const date = new Date(timestamp)

    return date.toLocaleDateString();
}
export function formatDate(isoDate?: string) {
    if (!isoDate) return '';
    try {
        const date = new Date(isoDate);

        const dateOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        } as const;

        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
        } as const;

        const formattedDate = date.toLocaleDateString('ru-RU', dateOptions);
        const formattedTime = date.toLocaleTimeString('ru-RU', timeOptions);

        return `${formattedDate} ${formattedTime}`;
    } catch (e) {
        console.error(e);
        return '';
    }
}

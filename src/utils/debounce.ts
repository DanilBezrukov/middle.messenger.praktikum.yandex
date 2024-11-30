type func<T> = (...args: T[]) => unknown;

export function debounce<T = unknown>(func: func<T>, delay: number) {
    let timerId: ReturnType<typeof setTimeout>;
    return (...args: T[]) => {
        clearTimeout(timerId);

        return new Promise(resolve => {
            timerId = setTimeout(() => {
                resolve(func(...args));
            }, delay);
        });
    };
}

import { useRef } from 'react';

function useDebounce(callback, delay) {
    const timeoutId = useRef();

    return function (...args) {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => callback(...args), delay);
    }
}

export default useDebounce;

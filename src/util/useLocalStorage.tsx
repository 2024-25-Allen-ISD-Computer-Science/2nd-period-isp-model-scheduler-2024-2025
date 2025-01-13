import { useState, useEffect } from "react";

export default function useLocalStorage<T>(key: string, initValue: T): [T, (value: T) => void] {

    // Fetch data from local storage
    const data = localStorage.getItem(key);

    // Initialize starting value on function call
    const [value, setValue] = useState<T>(() => {
        if (data != null) {
            return JSON.parse(data) as T;
        }
        return initValue;
    });

    // Update local storage on state change
    useEffect(() => {
        if (value != null) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue];
}
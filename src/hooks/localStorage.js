import { useEffect } from "react";
import { useState } from "react";

export default function useLocalStorage(key, defaultValue) {
    const raw = localStorage.getItem(key);

    let cooked;
    if (raw != null) {
        cooked = JSON.parse(raw);
    } else {
        cooked = defaultValue;
    }
    const [storage, setStorage] = useState(cooked);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storage));
    }, [storage]);

    return { storage, setStorage };
}

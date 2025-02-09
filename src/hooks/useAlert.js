import { useRef, useState, useCallback, useEffect } from "react";

function useAlert(timeoutDuration = 2500) {
    const [alert, setAlert] = useState({
        message: "",
        type: "",
        show: false,
    });
    const timeoutRef = useRef(null);
    const showAlert = useCallback(
        (message, type = "message") => {
            clearTimeout(timeoutRef.current);
            setAlert({ message, type, show: true });
            timeoutRef.current = setTimeout(() => {
                setAlert((prev) => ({ ...prev, show: false }));
            }, timeoutDuration);
        },
        [timeoutDuration]
    );
    const terminateAlert = useCallback(() => {
        clearTimeout(timeoutRef.current);
        setAlert((prev) => ({ ...prev, show: false }));
    });
    useEffect(() => {
        clearTimeout(timeoutRef.current);
    }, []);
    return { alert, showAlert, terminateAlert };
}

export { useAlert };

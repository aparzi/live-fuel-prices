import {useEffect, useState} from "react";
import axios from "axios";

export function useAxiosPost(url: string, payload: any) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .post(url, payload)
            .then((response) => setData(response.data))
            .catch((error) => setError(error.message))
            .finally(() => setLoaded(true));
    }, []);

    return { data, error, loaded };
}
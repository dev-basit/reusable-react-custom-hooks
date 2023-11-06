import { useEffect, useState } from "react";
import { postApi } from "./api/Api_optimized";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await postApi(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }

      fetchData();
    };
  }, [url]);

  return { data, error, loading };
}

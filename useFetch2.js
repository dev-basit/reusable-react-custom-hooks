import { useState, useEffect } from "react";
// install and import axios

const useFetch = (url, payload) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: "",
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    axios.post(url, payload)
      .then(({ data }) => {
        setState({
          data,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: "",
        });
      })
      .catch((error) => {
        setState({
          data: null,
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: error.message || "Failed to fetch",
        });
      });
  }, []);

  return { ...state };
};

export default useFetch;

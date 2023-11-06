import { useState, useEffect } from "react";

const doNothing = () => {};
const defaultConfig = {
  onSuccess: doNothing,
  onError: doNothing,
};

const useQuery = (fn, config = defaultConfig) => {
  const [state, setState] = useState({
    orders: [],
    ordersCount: 0,
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: "",
  });
  const { onSuccess, onError } = config;

  const runQuery = () => {
    if (!fn) return;

    setState((item) => ({ ...item, isLoading: true }));
    fn()
      .then((data) => {
        setState({
          orders: data?.orders,
          ordersCount: data?.ordersCount,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: "",
        });
        onSuccess(data);
      })
      .catch((error) => {
        setState({
          orders: [],
          ordersCount: 0,
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: error.message || "Failed to fetch",
        });
        onError(error);
      });
  };

  useEffect(runQuery, []);

  return { ...state, refetch: runQuery };
};

export default useQuery;

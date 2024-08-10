"use client"

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useAxios = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    axios.get<T>(url)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      setError(error);
    }).finally(() => {
      setLoading(false);
    })
  }, [url])
  
  useEffect(() => {
    fetchData();
  }, [fetchData, url])

  const refetchData = () => {
    fetchData();
  }

  return { data, loading, error, refetchData };

}

export default useAxios;

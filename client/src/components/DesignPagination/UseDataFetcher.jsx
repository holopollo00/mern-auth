import React, { useEffect, useState } from "react";

export default function UseDataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/design`);

        if (!res.ok) {
          throw new Error("Network response was not Ok!");
        }
        const jsonData = await res.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return {
    loading,
    data,
  };
}

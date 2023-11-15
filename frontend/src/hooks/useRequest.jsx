import { useState } from 'react';

const useRequest = ({ url, method }) => {
  const [loading, setLoading] = useState(false);

  const sendRequest = async (body) => {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: !!body && method !== 'GET' ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    setLoading(false);

    return data;
  };

  return {sendRequest, loading};
};

export default useRequest;

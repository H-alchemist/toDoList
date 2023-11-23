import { useEffect, useState } from "react";

const UseFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, you can set an error state here if needed
      }
    };

    fetchData();
  }, [url]);

  return { data };
};

export default UseFetch;

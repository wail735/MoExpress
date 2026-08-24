// ============================================================================
// HOOK : useAsync.js
// ROLE : Managed Async API Call Lifecycle (loading, data, error)
// ============================================================================

import { useState, useCallback } from "react";

export const useAsync = (asyncFunction) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...params) => {
      setLoading(true);
      setError(null);
      try {
        const response = await asyncFunction(...params);
        setData(response);
        return response;
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  return { loading, data, error, execute };
};

export default useAsync;

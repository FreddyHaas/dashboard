import { useEffect, useState } from 'react';

interface UseAsyncDataOptions<T> {
    fetchFn: () => Promise<T>;
    dependencies?: React.DependencyList;
    initialData?: T | null;
}

interface UseAsyncDataReturn<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useAsyncData<T>({
    fetchFn,
    dependencies = [],
    initialData = null,
}: UseAsyncDataOptions<T>): UseAsyncDataReturn<T> {
    const [data, setData] = useState<T | null>(initialData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await fetchFn();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let isCancelled = false;
        
        const executeFetch = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const result = await fetchFn();
                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch data');
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        };

        executeFetch();

        return () => {
            isCancelled = true;
        };
    }, dependencies);

    const refetch = () => {
        fetchData();
    };

    return {
        data,
        isLoading,
        error,
        refetch,
    };
}

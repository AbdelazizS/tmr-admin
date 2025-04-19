// src/hooks/useAreas.ts
export function useAreas() {
    const [areas, setAreas] = useState<PropertyArea[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchAreas = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/areas');
        setAreas(response.data);
      } catch (err) {
        setError('Failed to fetch areas');
      } finally {
        setIsLoading(false);
      }
    };
  
    const createArea = async (data: z.infer<typeof areaFormSchema>) => {
      try {
        await api.post('/areas', data);
        await fetchAreas();
      } catch (err) {
        throw new Error('Failed to create area');
      }
    };
  
    // Add update and delete functions
  
    useEffect(() => {
      fetchAreas();
    }, []);
  
    return {
      areas,
      isLoading,
      error,
      createArea,
      updateArea,
      deleteArea,
      refetch: fetchAreas
    };
  }
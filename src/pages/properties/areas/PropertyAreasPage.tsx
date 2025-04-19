// src/pages/properties/areas/PropertyAreasPage.tsx
export function PropertyAreasPage() {
    const { areas, isLoading, error, createArea, updateArea, deleteArea } = useAreas();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
  
    return (
      <div className="p-4 space-y-4">
        <PageHeader 
          title="Property Areas"
          action={
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="mr-2" /> Add Area
            </Button>
          }
        />
        
        <AreaTable areas={areas} />
        
        <CreateDialog
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          schema={areaFormSchema}
          onSubmit={createArea}
        />
      </div>
    );
  }
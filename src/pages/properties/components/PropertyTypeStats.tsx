import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const PropertyTypeStats = ({ types = [] }: { types?: PropertyType[] }) => {
  // Safely calculate total properties with initial value
  const totalProperties = types.reduce((sum, type) => sum + (type?.relatedPropertiesCount || 0), 0);
  
  // Safely get most popular type
  const mostPopular = types.length > 0 
    ? types.reduce((a, b) => 
        (a?.relatedPropertiesCount || 0) > (b?.relatedPropertiesCount || 0) ? a : b
      )
    : null;

  // Safely get recently added type
  const recentlyAdded = types.length > 0 ? types[types.length - 1] : null;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Types</CardDescription>
          <CardTitle>{types.length}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Properties</CardDescription>
          <CardTitle>{totalProperties}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Most Popular</CardDescription>
          <CardTitle className="capitalize">
            {mostPopular?.title || 'N/A'}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Recently Added</CardDescription>
          <CardTitle className="capitalize">
            {recentlyAdded?.title || 'N/A'}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useProperties } from "@/hooks/useProperties";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, ArrowUp, ArrowDown, Home, DollarSign, Clock, MapPin, Bed, Bath, Ruler, TrendingUp, Calendar, FileText, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyStatus } from "@/types/property";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { properties, isLoading } = useProperties();

  // Calculate metrics
// Calculate total value and average price only for "for_sale" properties
const forSaleProperties = properties.filter(property => property.status === 'for_sale');

const totalValue = forSaleProperties.reduce((sum, property) => sum + Number(property.price), 0);

const avgPrice = forSaleProperties.length > 0 
  ? Math.round(totalValue / forSaleProperties.length) 
  : 0;

  
  const featuredProperties = properties.slice(0, 3); // Get first 3 properties as featured

  const getStatusCount = (status: PropertyStatus) => {
    console.log(properties.status  === status );
    
    return properties.filter(p => p.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Property Dashboard</h1>
          <p className="text-muted-foreground">Your complete property management overview</p>
        </div>
        <Button onClick={() => navigate("/properties/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Properties"
          value={properties.length}
          icon={<Home className="h-4 w-4" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Portfolio Value"
          value={`${(totalValue / 1000000).toFixed(1)}M AED`}
          icon={<DollarSign className="h-4 w-4" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Avg. Property Value"
          value={`${avgPrice.toLocaleString()} AED`}
          icon={<TrendingUp className="h-4 w-4" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Available For Selling"
          value={getStatusCount("for_sale")}
          icon={<MapPin className="h-4 w-4" />}
          isLoading={isLoading}
        />
      </div>

   
      {/* Featured Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
              ))
            ) : featuredProperties.length > 0 ? (
              featuredProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  // onClick={() => navigate(`/properties/${property.id}`)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-muted-foreground">
                No featured properties available
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 justify-center">
          <Button variant="ghost" onClick={() => navigate("/properties")}>
            View All Properties
          </Button>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <QuickActionCard
          title="Schedule Viewings"
          description="Arrange property showings"
          icon={<Calendar className="h-6 w-6" />}
          // action={() => navigate("/appointments")}
        />
        <QuickActionCard
          title="Generate Reports"
          description="Create property reports"
          icon={<FileText className="h-6 w-6" />}
          // action={() => navigate("/reports")}
        />
        <QuickActionCard
          title="Manage Clients"
          description="View buyer/seller contacts"
          icon={<Users className="h-6 w-6" />}
          // action={() => navigate("/clients")}
        />
        <QuickActionCard
          title="Market Analysis"
          description="Local price trends"
          icon={<TrendingUp className="h-6 w-6" />}
          // action={() => navigate("/market")}
        />
      </div>
    </div>
  );
};

// Component for metric cards
const MetricCard = ({
  title,
  value,
  icon,
  isLoading,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  isLoading: boolean;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-3/4" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
};

// Component for status cards
const StatusCard = ({
  status,
  count,
  description,
  isLoading,
}: {
  status: PropertyStatus;
  count: number;
  description: string;
  isLoading: boolean;
}) => {
  const statusColors = {
    for_sale: 'bg-green-100 text-green-800',
    for_rent: 'bg-blue-100 text-blue-800',
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="capitalize">{status}</CardTitle>
          <Badge className={`${statusColors[status]} hover:${statusColors[status]}`}>
            {/* {isLoading ? <Skeleton className="h-4 w-8" /> : count} */}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

// Component for property cards
const PropertyCard = ({
  property,
  onClick,
}: {
  property: Property;
  onClick: () => void;
}) => {
  return (
    <Card 
      className="cursor-pointer transition-colors py-0"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
          {property.images?.length > 0 ? (
            <img 
              src={property.images[0]} 
              alt={property.images[0].alt || property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Home className="h-8 w-8 text-gray-400" />
            </div>
          )}

        </div>
        <div className="p-4">
          <h3 className="font-medium truncate">{property.title}</h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {property.location}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex space-x-2 text-sm">
              <span className="flex items-center">
                <Bed className="h-3 w-3 mr-1" /> {property.bedrooms}
              </span>
              <span className="flex items-center">
                <Bath className="h-3 w-3 mr-1" /> {property.bathrooms}
              </span>
              <span className="flex items-center">
                <Ruler className="h-3 w-3 mr-1" /> {property.area} sqft
              </span>
            </div>
            <span className="font-medium">{property.price.toLocaleString()} AED</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for quick action cards
const QuickActionCard = ({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}) => {
  return (
    <Button 
      variant="outline" 
      className="h-auto p-4 flex flex-col items-start gap-2 text-left"
      onClick={action}
    >
      <div className="p-2 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Button>
  );
};
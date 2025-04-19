import { useParams } from "react-router-dom";
import { useProperty } from "@/hooks/useProperty";
import { PropertyGallery } from "@/components/properties/Gallery";
import { PropertyDetails } from "@/components/properties/Details";
import { AmenitiesList } from "@/components/properties/Amenities";
import { FloorPlans } from "@/components/properties/FloorPlans";
import { NeighborhoodInfo } from "@/components/properties/Neighborhood";
import { InquiryForm } from "@/components/inquiries/Form";
import { SimilarProperties } from "@/components/properties/Similar";

export const PropertyDetailsPage = () => {
  const { id } = useParams();
  const { property, isLoading } = useProperty(id);

  if (isLoading) return <div>Loading...</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div className="space-y-8">
      {/* Header with actions */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{property.title}</h1>
          <p className="text-muted-foreground">{property.location}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit</Button>
          <Button>Contact Owner</Button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <PropertyGallery images={property.images} />
          <PropertyDetails property={property} />
          <AmenitiesList amenities={property.amenities} />
          {property.floorPlans && <FloorPlans plans={property.floorPlans} />}
        </div>

        <div className="space-y-6">
          <div className="sticky top-4 space-y-6">
            <PriceCard 
              price={property.price} 
              pricePerSqft={property.pricePerSqft}
              status={property.status}
            />
            <InquiryForm propertyId={property.id} />
            <NeighborhoodInfo areaId={property.areaId} />
          </div>
        </div>
      </div>

      <SimilarProperties 
        currentPropertyId={property.id}
        area={property.location}
        type={property.type}
      />
    </div>
  );
};
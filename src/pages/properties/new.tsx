import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyFormSchema, PropertyFormSchema } from "@/schemas/property";
import {
  propertyStatuses,
  propertyStatusLabels,
  propertyTypes,
} from "@/types/property";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { useCallback, useState } from "react";
import { ImagePreview } from "@/components/ui/image-preview";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { VideoUpload } from "@/components/ui/video-upload";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { usePropertyStore } from "@/stores/propertyStore";
import { api } from "@/lib/api";

export const PropertyNewPage = () => {
  const navigate = useNavigate();
  // const { createProperty, isLoading } = usePropertyStore();
  const [neighborhoodEnabled, setNeighborhoodEnabled] = useState(false);
  const [amenities, setAmenities] = useState<
    { name: string; distance: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newAmenity, setNewAmenity] = useState({ name: "", distance: "" });
  const [landmarks, setLandmarks] = useState<
    { name: string; distance: string }[]
  >([]);
  const [newLandmark, setNewLandmark] = useState({ name: "", distance: "" });
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  const form = useForm<PropertyFormSchema>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      status: "for_sale",
      description: "",
      type: "apartment",
      price: null,
      bedrooms: null,
      bathrooms: null,
      area: null,
      is_featured: false, // Added default value
      location: "",
      district: "",
      address: "",
      year_built: new Date().getFullYear(),
      video_tour: null,
      features: [],
      neighborhood: null,
      amenities: [],
      images: [],
    },
  });

  const handleAddLandmark = () => {
    if (newLandmark.name && newLandmark.distance) {
      setLandmarks([...landmarks, newLandmark]);
      setNewLandmark({ name: "", distance: "" });
    }
  };

  const handleRemoveLandmark = (index: number) => {
    setLandmarks(landmarks.filter((_, i) => i !== index));
  };

  const handleAddFeature = () => {
    if (newFeature) {
      setFeatures([...features, newFeature]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddAmenity = () => {
    if (newAmenity.name && newAmenity.distance) {
      setAmenities([...amenities, newAmenity]);
      form.setValue("amenities", [...amenities, newAmenity]);
      setNewAmenity({ name: "", distance: "" });
    }
  };

  const handleRemoveAmenity = (index: number) => {
    const updated = amenities.filter((_, i) => i !== index);
    setAmenities(updated);
    form.setValue("amenities", updated);
  };

  const handleImageUpload = (files: File[]) => {
    const currentImages = form.getValues("images") || [];
    form.setValue("images", [
      ...currentImages,
      ...files.map((file) => ({ file })),
    ]);
  };

  const handleImageRemove = (index: number) => {
    const currentImages = form.getValues("images") || [];
    const updated = currentImages.filter((_, i) => i !== index);
    form.setValue("images", updated);
  };

  const onSubmit = async (values: PropertyFormSchema) => {
    const formData = new FormData();

    // Append simple fields
    formData.append("title", values.title);
    formData.append("status", values.status);
    formData.append("type", values.type);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("bedrooms", values.bedrooms.toString());
    formData.append("bathrooms", values.bathrooms.toString());
    formData.append("area", values.area.toString());
    formData.append("is_featured", values.is_featured ? "1" : "0");
    formData.append("location", values.location);
    formData.append("district", values.district);
    formData.append("address", values.address);
    formData.append("year_built", values.year_built.toString());
    // Append features

    features.forEach((feature, index) => {
      formData.append(`features[${index}][feature]`, feature);
    });

    // ✅ Amenities (array of { name, category, icon })
    values.amenities?.forEach((amenity, index) => {
      formData.append(`amenities[${index}][name]`, amenity.name);
      formData.append(`amenities[${index}][distance]`, amenity.distance);
    });

    // return  ;

    // ✅ Images (array of File)
    if (values.images && Array.isArray(values.images)) {
      values.images.forEach((wrapped, index) => {
        const file = wrapped?.file; // unwrap the actual File

        if (file instanceof File) {
          formData.append(`images[${index}]`, file);
        }
      });
    }
    // ✅ Video Tour (optional File)
    if (values.video_tour instanceof File) {
      formData.append("video_tour", values.video_tour);
    }

    if (values.neighborhood) {
      if (values.neighborhood.description) {
        formData.append(
          "neighborhood[description]",
          values.neighborhood.description
        );
      }

      if (landmarks?.length > 0) {
        landmarks.forEach((landmark, index) => {
          formData.append(
            `neighborhood[landmarks][${index}][name]`,
            landmark.name
          );
          formData.append(
            `neighborhood[landmarks][${index}][distance]`,
            landmark.distance
          );
        });
      }
    }

    // return;
    try {
      setIsLoading(true);
      const response = await api.post("/properties", formData);
      if (response?.status === 201) {
        toast.success("Property created successfully!");
        navigate("/properties");
        // Optionally redirect or reset form
      } else {
        toast.error("Something went wrong while creating the property.");
      }
    } catch (error) {
      if (error) toast.error("Failed to create property.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Basic Information */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Property title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Basic Information */}
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District or Emirate</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sharjah , Abu Dhabi , Dubai"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {propertyStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {propertyStatusLabels[status]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(propertyTypes).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (AED)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Property Details */}
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area (sqm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year_built"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Built</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={new Date().getFullYear().toString()}
                      {...field}
                      onChange={(e) =>
                        // || new Date().getFullYear()
                        field.onChange(parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City/Area" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-6">
              <FormField
                className="w-full"
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Full address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Video Tour */}
              <FormField
                control={form.control}
                name="video_tour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Tour</FormLabel>
                    <FormControl>
                      <VideoUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed property description"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Neighborhood */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  id="neighborhood-toggle"
                  checked={neighborhoodEnabled}
                  onCheckedChange={(checked) => {
                    setNeighborhoodEnabled(checked);
                    if (!checked) {
                      form.setValue("neighborhood", null);
                    } else {
                      form.setValue("neighborhood", {
                        description: "",
                        landmarks: [],
                        features: [],
                      });
                    }
                  }}
                />
                <FormLabel htmlFor="neighborhood-toggle">
                  Add Neighborhood Information
                </FormLabel>
              </div>

              {neighborhoodEnabled && (
                <>
                  <FormField
                    control={form.control}
                    name="neighborhood.description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Neighborhood Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Located in one of Dubai's most iconic waterfront communities..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2 space-y-4 mt-4">
                    <div>
                      <FormLabel>Landmarks & Distances</FormLabel>
                      <div className="space-y-2 mt-2">
                        {landmarks.map((landmark, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge variant="outline" className="flex-1 p-2">
                              {landmark.name} - {landmark.distance}
                            </Badge>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveLandmark(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <Input
                            placeholder="Landmark name (e.g., Atlantis The Palm)"
                            value={newLandmark.name}
                            onChange={(e) =>
                              setNewLandmark({
                                ...newLandmark,
                                name: e.target.value,
                              })
                            }
                          />
                          <Input
                            placeholder="Distance (e.g., 1.2 km)"
                            value={newLandmark.distance}
                            onChange={(e) =>
                              setNewLandmark({
                                ...newLandmark,
                                distance: e.target.value,
                              })
                            }
                            className="w-32"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddLandmark}
                          >
                            Add Landmark
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div>
              <FormLabel>Features</FormLabel>
              <div className="space-y-2 mt-2">
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="ml-2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Feature (e.g., Private Beach)"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddFeature}
                  >
                    Add Feature
                  </Button>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="md:col-span-2 ">
              <FormLabel>Amenities</FormLabel>
              <div className="space-y-4 mt-2">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Input value={amenity.name} readOnly className="flex-1" />
                    <Input value={amenity.distance} readOnly className="w-32" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAmenity(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Amenity name"
                    value={newAmenity.name}
                    onChange={(e) =>
                      setNewAmenity({ ...newAmenity, name: e.target.value })
                    }
                    className="flex-1"
                  />
                  <Input
                    placeholder="Distance"
                    value={newAmenity.distance}
                    onChange={(e) =>
                      setNewAmenity({ ...newAmenity, distance: e.target.value })
                    }
                    className="w-32"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddAmenity}
                  >
                    Add
                  </Button>
                </div>
              </div>
              {form.formState.errors.amenities && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.amenities.message}
                </p>
              )}
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <>
                        <FileUpload
                          accept="image/*"
                          multiple
                          onUpload={handleImageUpload}
                        />
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                          {field.value?.map((image, index) => (
                            <ImagePreview
                              key={index}
                              src={
                                image.file
                                  ? URL.createObjectURL(image.file)
                                  : image.url || ""
                              }
                              alt={image.alt || `Property image ${index + 1}`}
                              onRemove={() => handleImageRemove(index)}
                            />
                          ))}
                        </div>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Add the isFeatured toggle switch */}
            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Featured Property
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Mark this property as featured (will appear in featured
                      section)
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/properties")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Property"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

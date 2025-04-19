import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyFormSchema, PropertyFormSchema } from "@/schemas/property";
import { propertyStatuses, propertyTypes } from "@/types/property";
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
import { useEffect, useState, useMemo, useCallback } from "react";
import { ImagePreview } from "@/components/ui/image-preview";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { VideoUpload } from "@/components/ui/video-upload";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { usePropertyStore } from "@/stores/propertyStore";

export const PropertyEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { properties, updateProperty, isLoading } = usePropertyStore();

  // State for arrays
  const [neighborhoodEnabled, setNeighborhoodEnabled] = useState(false);
  const [amenities, setAmenities] = useState<{ name: string; distance: string }[]>([]);
  const [newAmenity, setNewAmenity] = useState({ name: "", distance: "" });
  const [landmarks, setLandmarks] = useState<{ name: string; distance: string }[]>([]);
  const [newLandmark, setNewLandmark] = useState({ name: "", distance: "" });
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  // Form setup
  const form = useForm<PropertyFormSchema>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: useMemo(
      () => ({
        title: "",
        status: "available",
        description: "",
        type: "apartment",
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        isFeatured: false,
        location: "",
        address: "",
        year_built: new Date().getFullYear(),
        video_tour: null,
        neighborhood: null,
        amenities: [],
        images: [],
      }),
      []
    ),
  });

  // Memoize property lookup
  const prop = useMemo(
    () => properties.find((p) => p.id === Number(id)),
    [id, properties]
  );

  // Populate form on load
  useEffect(() => {
    if (!prop) return;
    form.reset({
      title: prop.title,
      status: prop.status,
      description: prop.description,
      type: prop.type,
      price: prop.price,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      area: prop.area,
      isFeatured: prop.isFeatured,
      location: prop.location,
      address: prop.address,
      year_built: prop.year_built,
      video_tour: prop.video_tour,
      neighborhood: prop.neighborhood
        ? { description: prop.neighborhood.description }
        : null,
      amenities: prop.amenities,
      images: prop.images.map((img) => ({ url: img.url, alt: img.alt })),
    });
    setAmenities(prop.amenities);
    if (prop.neighborhood) {
      setNeighborhoodEnabled(true);
      setLandmarks(prop.neighborhood.landmarks);
      setFeatures(prop.neighborhood.features);
    }
  }, [prop, form]);

  // Handlers
  const handleAddLandmark = useCallback(() => {
    if (newLandmark.name && newLandmark.distance) {
      const updated = [...landmarks, newLandmark];
      setLandmarks(updated);
      form.setValue("neighborhood.landmarks", updated);
      setNewLandmark({ name: "", distance: "" });
    }
  }, [newLandmark, landmarks, form]);

  const handleRemoveLandmark = useCallback(
    (index: number) => {
      const updated = landmarks.filter((_, i) => i !== index);
      setLandmarks(updated);
      form.setValue("neighborhood.landmarks", updated);
    },
    [landmarks, form]
  );

  const handleAddFeature = useCallback(() => {
    if (newFeature) {
      const updated = [...features, newFeature];
      setFeatures(updated);
      form.setValue("neighborhood.features", updated);
      setNewFeature("");
    }
  }, [newFeature, features, form]);

  const handleRemoveFeature = useCallback(
    (index: number) => {
      const updated = features.filter((_, i) => i !== index);
      setFeatures(updated);
      form.setValue("neighborhood.features", updated);
    },
    [features, form]
  );

  const handleAddAmenity = useCallback(() => {
    if (newAmenity.name && newAmenity.distance) {
      const updated = [...amenities, newAmenity];
      setAmenities(updated);
      form.setValue("amenities", updated);
      setNewAmenity({ name: "", distance: "" });
    }
  }, [newAmenity, amenities, form]);

  const handleRemoveAmenity = useCallback(
    (index: number) => {
      const updated = amenities.filter((_, i) => i !== index);
      setAmenities(updated);
      form.setValue("amenities", updated);
    },
    [amenities, form]
  );

  const handleImageUpload = useCallback(
    (files: File[]) => {
      const current = form.getValues("images") || [];
      form.setValue(
        "images",
        [...current, ...files.map((file) => ({ file }))]
      );
    },
    [form]
  );

  const handleImageRemove = useCallback(
    (index: number) => {
      const current = form.getValues("images") || [];
      const updated = current.filter((_, i) => i !== index);
      form.setValue("images", updated);
    },
    [form]
  );

  const onSubmit = useCallback(
    async (values: PropertyFormSchema) => {
      try {
        const neighborhood = neighborhoodEnabled
          ? {
              description: values.neighborhood?.description || "",
              landmarks,
              features,
            }
          : null;
        await updateProperty(Number(id), { ...values, neighborhood });
        toast.success("Property updated successfully");
        navigate("/properties");
      } catch (err) {
        toast.error("Failed to update property", {
          description: err instanceof Error ? err.message : "Unknown error",
        });
      }
    },
    [id, updateProperty, navigate, neighborhoodEnabled, landmarks, features]
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Property</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Title */}
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

            {/* Status */}
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(propertyStatuses).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type */}
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
                      <SelectTrigger>
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

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bedrooms */}
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

            {/* Bathrooms */}
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

            {/* Area */}
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
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Year Built */}
            <FormField
              control={form.control}
              name="year_built"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Built</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={`${new Date().getFullYear()}`}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
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

            {/* Address */}
            <FormField
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
                    form.setValue(
                      "neighborhood",
                      checked
                        ? { description: "", landmarks: [], features: [] }
                        : null
                    );
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
                    <FormLabel>Landmarks & Distances</FormLabel>
                    <div className="space-y-2 mt-2">
                      {landmarks.map((landmark, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Badge variant="outline" className="flex-1 p-2">
                            {landmark.name} - {landmark.distance}
                          </Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveLandmark(idx)}
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
                            setNewLandmark({ ...newLandmark, name: e.target.value })
                          }
                        />
                        <Input
                          placeholder="Distance (e.g., 1.2 km)"
                          value={newLandmark.distance}
                          onChange={(e) =>
                            setNewLandmark({ ...newLandmark, distance: e.target.value })
                          }
                          className="w-32"
                        />
                        <Button type="button" variant="outline" onClick={handleAddLandmark}>
                          Add Landmark
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Features */}
            <div>
              <FormLabel>Features</FormLabel>
              <div className="space-y-2 mt-2">
                <div className="flex flex-wrap gap-2">
                  {features.map((feat, idx) => (
                    <Badge key={idx} variant="secondary">
                      {feat}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
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
                  <Button type="button" variant="outline" onClick={handleAddFeature}>
                    Add Feature
                  </Button>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="md:col-span-2">
              <FormLabel>Amenities</FormLabel>
              <div className="space-y-4 mt-2">
                {amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <Input value={amenity.name} readOnly className="flex-1" />
                    <Input value={amenity.distance} readOnly className="w-32" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAmenity(idx)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Amenity name"
                    value={newAmenity.name}
                    onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Distance"
                    value={newAmenity.distance}
                    onChange={(e) => setNewAmenity({ ...newAmenity, distance: e.target.value })}
                    className="w-32"
                  />
                  <Button type="button" variant="outline" onClick={handleAddAmenity}>
                    Add
                  </Button>
                </div>
                {form.formState.errors.amenities && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.amenities.message}
                  </p>
                )}
              </div>
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
                        <FileUpload accept="image/*" multiple onUpload={handleImageUpload} />
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                          {field.value?.map((image, idx) => (
                            <ImagePreview
                              key={idx}
                              src={
                                image.file ? URL.createObjectURL(image.file) : image.url || ""
                              }
                              alt={image.alt || `Property image ${idx + 1}`}
                              onRemove={() => handleImageRemove(idx)}
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

            {/* Featured Toggle */}
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Property</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Mark this property as featured (will appear in featured section)
                    </p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/properties")}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Property"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

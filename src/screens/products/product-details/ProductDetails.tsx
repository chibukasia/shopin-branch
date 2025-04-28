"use client";
import Collapsible from "@/components/molecules/accordions/Collapsible";
import { useParams } from "next/navigation";
import { fetchProductDetails } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const ProductDetailsScreen = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(id as string),
  });

  const productData = useMemo(() => {
    if (data) {
      const details = [];
      const inventory = [];
      const shipping = [];
      for (const key in data) {
        if (
          typeof data[key] !== "object" &&
          !key.includes("_id") &&
          data[key] !== null &&
          key !== "id" &&
          key !== "short_description" &&
          key !== "long_description" &&
          key !== "primary_image" &&
          key !== "image_gallery"
        ) {
          details.push({
            name: key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase()),
            value: data[key],
          });
        } else if (key === "inventory") {
          for (const inventoryKey in data[key]) {
            if (
              !inventoryKey.includes("_id") &&
              data[key][inventoryKey] !== null &&
              inventoryKey !== "id"
            ) {
              inventory.push({
                name: inventoryKey
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase()),
                value:
                  typeof data[key][inventoryKey] === "boolean"
                    ? data[key][inventoryKey]
                      ? "Yes"
                      : "No"
                    : data[key][inventoryKey],
              });
            }
          }
        } else if (key === "shipping") {
          for (const shippingKey in data[key]) {
            if (
              !shippingKey.includes("_id") &&
              data[key][shippingKey] !== null &&
              typeof data[key][shippingKey] !== "object" &&
              shippingKey !== "id"
            ) {
              shipping.push({
                name: shippingKey
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase()),
                value: data[key][shippingKey],
              });
            } else if (typeof data[key][shippingKey] === "object") {
              for (const shippingKey2 in data[key][shippingKey]) {
                if (
                  !shippingKey2.includes("_id") &&
                  data[key][shippingKey][shippingKey2] !== null
                ) {
                  shipping.push({
                    name: shippingKey2
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase()),
                    value: data[key][shippingKey][shippingKey2],
                  });
                }
              }
            }
          }
        }
      }
      return {
        details: details.filter((detail) => detail.name !== "Primary Image"),
        attributes: data.attributes,
        inventory,
        categories: data.categories,
        shipping,
        images: [data.primary_image, ...data.image_gallery],
        long_description: data.long_description,
        short_description: data.short_description,
        reviews: data.product_reviews,
        tags: data.tags,
      };
    }
    return null;
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-3/4">
        <h1>Product Details</h1>
        <p>Details about the product will be displayed here.</p>
      </div>
      {isLoading && <p>Loading...</p>}
      {productData && (
        <>
          <div className="w-3/4 flex gap-3">
            <div className="w-1/2">
              <div
                style={{
                  backgroundImage: `url("${productData.images[0]}")`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-[450px] h-[450px] bg-gray-200 rounded-lg"
              ></div>
              <div className="flex gap-2 py-5 w-full overflow-scroll">
                {productData.images.map((image) => (
                  <div
                    key={image}
                    style={{
                      backgroundImage: `url("${image}")`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="w-20 h-20 min-w-20 cursor-pointer flex items-center justify-center border border-primary rounded-lg shadow-md"
                  ></div>
                ))}
              </div>
            </div>
            <div className="w-1/2 px-5">
              <Collapsible title="Product Details">
                <div className="flex flex-col gap-2">
                  {productData.details.map((detail) => (
                    <div key={detail.name} className="flex gap-2">
                      <div className="w-1/2">
                        <h1 className="text-xs font-medium">{detail.name}:</h1>
                      </div>
                      <div className="w-1/2">
                        <div
                          dangerouslySetInnerHTML={{ __html: detail.value }}
                          className="text-sm text-muted-foreground"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Collapsible>
              <Collapsible title="Product Description">
                <h1 className="text-sm font-medium">Short Description:</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: productData.short_description,
                  }}
                  className="text-sm text-muted-foreground"
                ></div>
                <h1 className="text-sm font-medium">Long Description:</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: productData.long_description,
                  }}
                  className="text-sm text-muted-foreground"
                ></div>
              </Collapsible>
              <Collapsible title="Product Inventory">
                {productData.inventory.map((invent) => (
                  <div className="flex gap-2" key={invent.name}>
                    <div className="w-1/2">
                      <h1 className="text-xs font-medium">{invent.name}:</h1>
                    </div>
                    <div className="w-1/2">
                      <p className="text-xs text-muted-foreground">
                        {invent.name === "Stock Status"
                          ? invent.value !== "out_of_stock"
                            ? "Yes"
                            : "No"
                          : invent.value}
                      </p>
                    </div>
                  </div>
                ))}
              </Collapsible>
              <Collapsible title="Product Shipping">
                {productData.shipping.map((ship) => (
                  <div className="flex gap-2" key={ship.name}>
                    <div className="w-1/2">
                      <h1 className="text-xs font-medium">{ship.name}:</h1>
                    </div>
                    <div className="w-1/2">
                      <p className="text-xs text-muted-foreground">
                        {ship.value}
                      </p>
                    </div>
                  </div>
                ))}
              </Collapsible>
              <Collapsible title="Product Attributes">
                {productData.attributes.map((attr) => (
                  <div className="flex gap-2" key={attr.name}>
                    <div className="w-1/2">
                      <h1 className="text-xs font-medium">{attr.name}:</h1>
                    </div>
                    <div className="w-1/2">
                      <p className="text-xs text-muted-foreground">
                        {attr.values.join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </Collapsible>
              <Collapsible title="Product Categories">
                {productData.categories.map((cat) => (
                  <div className="flex gap-2" key={cat.name}>
                    <div className="">
                      <p className="text-xs text-muted-foreground">
                        {cat.name}
                      </p>
                    </div>
                  </div>
                ))}
              </Collapsible>
            </div>
          </div>
          <div className="w-3/4 flex flex-col gap-3">
            <div className="h-[1px] bg-muted-foreground w-full my-2"></div>
            <div
              dangerouslySetInnerHTML={{
                __html: productData.long_description,
              }}
              className="text-sm text-muted-foreground"
            ></div>

            <div>
              <h1 className="text-sm font-medium">Product Reviews:</h1>
              {productData.reviews.length > 0 ? (
                <div></div>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              )}
            </div>
            <div>
              <h1 className="text-sm font-medium">Product Tags:</h1>
              {productData.tags.length > 0 ? (
                <div></div>
              ) : (
                <p className="text-sm text-muted-foreground">No tags.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailsScreen;

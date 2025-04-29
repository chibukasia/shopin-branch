"use client";
import Collapsible from "@/components/molecules/accordions/Collapsible";
import { useParams } from "next/navigation";
import { fetchProductDetails } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { EAttribute } from "../types";

const ProductDetailsScreen = () => {
    const [imgIndex, setImgIndex] = useState(0)
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
      
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <svg
            className="w-40 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z"
              fill="transparent"
            />
            <path
              d="M93.9717 27.2674C88.8395 16.6461 80.3136 9.99999 69.9999 9.99999C59.6862 9.99999 51.1603 16.6461 45.0281 27.2674"
              stroke="#3B82F6"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
      {productData && (
        <>
        {/* <h1 className="text-left">Product Details</h1> */}
          <div className="w-3/4 flex gap-3">
            <div className="w-1/2">
              <div
                style={{
                  backgroundImage: `url("${productData.images[imgIndex]}")`,
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
                    onClick={() => setImgIndex(productData.images.indexOf(image))}
                    className="w-16 h-16 min-w-16 cursor-pointer flex items-center justify-center border border-primary rounded-lg shadow-md"
                  ></div>
                ))}
              </div>
            </div>
            <div className="w-1/2 px-5">
                <h1 className="text-2xl font-bold">{productData.details[0].value}</h1>
              <Collapsible title="Product Details">
                <div className="flex flex-col gap-2">
                  {productData.details.map((detail) => (
                    <div key={detail.name} className="flex gap-2">
                      <div className="w-1/2">
                        <h1 className="text-xs font-medium">{detail.name}:</h1>
                      </div>
                      <div className="w-1/2">
                        <div
                          dangerouslySetInnerHTML={{ __html: detail.value.toString().replace(/\b\w/g, (char: string) => char.toUpperCase()) }}
                          className="text-sm text-muted-foreground"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Collapsible>
              <Collapsible title="Product Description">
                <h1 className="text-sm font-medium leading-none">Short Description:</h1>
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
                          ? invent.value.replace(/_/g, " ")
                              .replace(/\b\w/g, (char: string) => char.toUpperCase())
                          : invent.value.toString().replace(/\b\w/g, (char: string) => char.toUpperCase())}
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
                        {ship.value.toString().replace(/\b\w/g, (char: string) => char.toUpperCase())}
                      </p>
                    </div>
                  </div>
                ))}
              </Collapsible>
              <Collapsible title="Product Attributes">
                {productData.attributes.map((attr: EAttribute) => (
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
                {productData.categories.map((cat: {name: string}) => (
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

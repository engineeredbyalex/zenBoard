import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";
import Image from "next/image";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || { variations: [] }
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [variations, setVariations] = useState(
    productProperties.variations || []
  );
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCategoriesLoading(true);
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
      setCategoriesLoading(false);
    });
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: {
        ...productProperties,
        variations,
      },
    };

    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }

    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => [...oldImages, ...res.data.links]);
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  function addVariation() {
    setVariations((prevVariations) => [
      ...prevVariations,
      { name: "", values: [] },
    ]);
  }

  function updateVariationName(index, name) {
    setVariations((prevVariations) => {
      const newVariations = [...prevVariations];
      newVariations[index].name = name;
      return newVariations;
    });
  }

  function updateVariationValues(index, values) {
    setVariations((prevVariations) => {
      const newVariations = [...prevVariations];
      newVariations[index].values = values.split(",").map((value) => value.trim());
      return newVariations;
    });
  }

  function removeVariation(index) {
    setVariations((prevVariations) => {
      const newVariations = [...prevVariations];
      newVariations.splice(index, 1);
      return newVariations;
    });
  }

  return (
    <form onSubmit={saveProduct}>
      <label className="block mt-4">Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
      <label className="block mt-4">Category</label>
      <select
        value={category}
        onChange={(ev) => setCategory(ev.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      >
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {categoriesLoading && <Spinner />}
      {true && (
        <div className="">
          <label className="block mt-4">Variations</label>
          <div>
            {variations.map((variation, index) => (
              <div key={index} className="flex mt-2">
                <input
                  type="text"
                  placeholder="Variation Name"
                  value={variation.name}
                  onChange={(ev) => updateVariationName(index, ev.target.value)}
                  className="w-1/4 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Values (comma-separated)"
                  value={variation.values.join(", ")}
                  onChange={(ev) => updateVariationValues(index, ev.target.value)}
                  className="w-3/4 p-2 border border-gray-300 rounded ml-2"
                />
                <button
                  type="button"
                  onClick={() => removeVariation(index)}
                  className="ml-2 p-2 bg-red-500 text-white rounded cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addVariation}
              className="mt-2 p-2 bg-green-500 text-white rounded cursor-pointer"
            >
              Add Variation
            </button>
          </div>
        </div>
      )}
      <label className="block mt-4">Photos</label>
      <div className="flex flex-wrap gap-4">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-4"
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="relative group">
                <div
                  onClick={() => deleteImage(link)}
                  className="w-full h-[2rem] red_background  cursor-pointer white_text flex items-center justify-center "
                >
                  Delete
                </div>
                <div className="h-[10rem] bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                  <Image
                    width={200}
                    height={200}
                    src={link}
                    alt=""
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label htmlFor="upload" className="upload-btn cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>
            Add image
          </div>
          <input
            id="upload"
            type="file"
            onChange={uploadImages}
            className="hidden"
          />
        </label>
      </div>
      <label className="block mt-4">Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
      <label className="block mt-4">Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
      <button type="submit" className="btn-primary mt-4">
        Save
      </button>
    </form>
  );
}

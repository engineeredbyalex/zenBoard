import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";
import Image from "next/image";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: existingProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState(existingProperties || []);

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  function addProperty() {
    setProperties([...properties, { name: "", values: [""] }]);
  }

  function removeProperty(index) {
    const newProperties = [...properties];
    newProperties.splice(index, 1);
    setProperties(newProperties);
  }

  function addPropertyValue(propertyIndex) {
    const newProperties = [...properties];
    newProperties[propertyIndex].values.push("");
    setProperties(newProperties);
  }

  function removePropertyValue(propertyIndex, valueIndex) {
    const newProperties = [...properties];
    newProperties[propertyIndex].values.splice(valueIndex, 1);
    setProperties(newProperties);
  }

  function handlePropertyNameChange(ev, index) {
    const newProperties = [...properties];
    newProperties[index].name = ev.target.value;
    setProperties(newProperties);
  }

  function handlePropertyValueChange(ev, propertyIndex, valueIndex) {
    const newProperties = [...properties];
    newProperties[propertyIndex].values[valueIndex] = ev.target.value;
    setProperties(newProperties);
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      try {
        const res = await axios.post("/api/upload", data);
        setImages((oldImages) => {
          return [...oldImages, ...res.data.links];
        });
        setIsUploading(false);
      } catch (error) {
        console.error('Error uploading images:', error);
        setIsUploading(false);
      }
    }
  }

  async function saveProduct(ev) {
    ev.preventDefault();

    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: properties.map(property => ({ name: property.name, values: property.values })),
    };

    try {
      if (_id) {
        await axios.put("/api/products", { ...data, _id });
      } else {
        await axios.post("/api/products", data);
      }

      setGoToProducts(true);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }

  return (
    <form onSubmit={saveProduct} className="p-4">
      <label className="block">Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        className="border p-2 my-2 w-full"
      />
      <select
        value={category}
        onChange={(ev) => setCategory(ev.target.value)}
        className="border p-2 my-2 w-full"
      >
        <option value="">No category</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c.name} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>

      <div className="w-full mb-10">
        <label className="block"><h5>Properties</h5></label>
        <div className="flex flex-wrap gap-[2rem]">
          {properties.map((property, index) => (
            <div key={index} className="flex flex-wrap gap-[2rem]">
              <input
                className="border p-2 w-[15rem]"
                type="text"
                placeholder="Nume proprietate"
                value={property.name}
                onChange={(ev) => handlePropertyNameChange(ev, index)}
              />
              {property.values?.map((value, valueIndex) => (
                <input
                  key={valueIndex}
                  type="text"
                  placeholder="Proprietate produs"
                  value={value}
                  onChange={(ev) => handlePropertyValueChange(ev, index, valueIndex)}
                  className="border px-5"
                />
              ))}
              <div className="flex items-center  gap-5">
                <button className="bg-[#000] text-white font-bold  w-[7rem] rounded  h-[3rem]" type="button" onClick={() => addPropertyValue(index)}>
                  <h5>
                    Add Value
                  </h5>
                </button>
                <button className="bg-[#000] text-white font-bold  w-[7rem] rounded  h-[3rem]" type="button" onClick={() => removeProperty(index)}>
                  <h5> Delete</h5>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addProperty}
          className="bg-[#000] text-white font-bold  w-[15rem] rounded mt-10 h-[3rem]"
        >
          Add property
        </button>
      </div>
      <label> <h5>Images</h5></label>
      <div className="mb-2 flex flex-wrap gap-1">

        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={(images) => setImages(images)}
        >
          {images?.length > 0 &&
            images.map((link, index) => (
              <div
                key={link}
                className="h-[200px] w-[200px] bg-white p-4 shadow-sm rounded-sm border border-gray-200 flex flex-col items-center justify-center"
              >
                <Image
                  src={link}
                  alt=""
                  className="rounded-lg w-[150px] h-[150px]"
                />
                <button
                  className="bg-red-500 text-white  px-2 py-1 rounded mt-1"
                  onClick={() => deleteImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
        </ReactSortable>
        {isUploading && <div className="h-24 flex items-center"></div>}

        <label className="h-[200px] w-[200px] cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
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
          <div>Add Image</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
      <label>
        <h5>Description</h5>
      </label>
      <textarea
        className="min-h-[30vh] border p-2 my-2 w-full"
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <h5>Extras</h5>
      <label>
        <h5>Price</h5>
      </label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
        className="border p-2 my-2 w-full"
      />
      <button
        type="submit"
        className="bg-[#000] text-white font-bold py-2 px-4 rounded mt-4"
      >
        Save
      </button>
    </form>
  );
}

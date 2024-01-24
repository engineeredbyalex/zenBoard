import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/common/Spinner";

function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    setIsLoading(true);
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
      setIsLoading(false);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map(p => ({
        name: p.name,
        values: p.values.split(','),
      })),
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }

    setName('');
    setParentCategory('');
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(',')
      }))
    );
  }

  function deleteCategory(category) {
    const confirmDelete = window.confirm(`Do you want to delete ${category.name}?`);

    if (confirmDelete) {
      const { _id } = category;
      axios.delete('/api/categories?_id=' + _id)
        .then(() => {
          fetchCategories();
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
  }

  function addProperty() {
    setProperties(prev => {
      return [...prev, { name: '', values: '' }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h3 className="uppercase grey_text">Categorii</h3>
      <label className=" uppercase grey_text mt-10 mb-10">
        {editedCategory
          ? `Editează categoria ${editedCategory.name}`
          : 'Adaugă o categorie nouă'}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1 mt-10 mb-10">
          <input
            className="w-[20rem] light_grey_background py-3 px-3"
            type="text"
            placeholder={'Nume categorie'}
            onChange={ev => setName(ev.target.value)}
            value={name} />
          <select
            className="w-[20rem] light_grey_background py-3 px-3"
            onChange={ev => setParentCategory(ev.target.value)}
            value={parentCategory}>
            <option className="w-[20rem] light_grey_background py-3 px-3" value="">Categorie principală</option>
            {categories.length > 0 && categories.map(category => (
              <option className="w-[20rem] light_grey_background py-3 px-3" key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block uppercase grey_text">Proprietăți</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-primary text-sm mb-2">
            Adaugă o proprietate nouă
          </button>
          {properties.length > 0 && properties.map((property, index) => (
            <div key={index} className="flex gap-1 mb-2">
              <input type="text"
                value={property.name}
                className="mb-0"
                onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                placeholder="property name (example: color)" />
              <input type="text"
                className="mb-0"
                onChange={ev =>
                  handlePropertyValuesChange(
                    index,
                    property, ev.target.value
                  )}
                value={property.values}
                placeholder="values, comma separated" />
              <button
                onClick={() => removeProperty(index)}
                type="button"
                className="btn-red">
                Șterge
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
              }}
              className="btn-primary">Anulează</button>
          )}
          <button type="submit"
            className="btn-primary py-1 rounded-lg">
            Salvează
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Nume categorie</td>
              <td>Categorie principală</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3}>
                  <div className="py-4">
                    <Spinner fullWidth={true} />
                  </div>
                </td>
              </tr>
            )}
            {categories.length > 0 && categories.map(category => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td className="flex flex-col gap-5">
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    Editează
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-red">Șterge</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default Categories;

import ProductForm from "@/components/forms/ProductForm";
import Layout from "@/components/layout/Layout";

export default function NewProduct() {
  return (
    <Layout>
      <h1>Produs Nou</h1>
      <ProductForm />
    </Layout>
  );
}
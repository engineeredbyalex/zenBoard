import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/forms/ProductForm";
import Spinner from "@/components/common/Spinner";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get('/api/products?id=' + id).then(response => {
      setProductInfo(response.data);
      setIsLoading(false);
    });
  }, [id]);
  return (
    <Layout>
      <h3 className="font-light uppercase grey_text">Editează produsul</h3>
      {isLoading && (
        <Spinner />
      )}
      {productInfo && (
        <ProductForm {...productInfo} />
      )}
    </Layout>
  );
}
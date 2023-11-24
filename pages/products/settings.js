import Layout from '@/components/Layout/Layout'
import { useState, useEffect } from 'react'
import axios from 'axios'

function productSettings() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then(res => {
            setProducts(res.data);
        });
    }, []);


    return (
        <Layout>
            <div>
                Adaugă disscount
            </div>
            <div className='grid grid-cols-3 gap-10'>
                {products.map(product => (
                    <div key={product._id} className='w-[20rem] h-auto'>
                        <h5>{product.title}</h5>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default productSettings 
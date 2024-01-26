import Layout from '@/components/layout/Layout'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image';

function View() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then(res => {
            setProducts(res.data);
        });
    }, []);

    return (
        <Layout>
            <div className='grid grid-cols-3 gap-10'>
                {products.map(product => (
                    <div key={product._id} className='w-[20rem] h-auto'>
                        <Image className='w-[250px] h-[250px]' src={product.images[0]} alt={product.title} />
                        <h5>{product.title}</h5>
                        <Link href={`/products/${product._id}`}>
                            <button className='btn-primary uppercase'>
                                Vezi produsul live
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default View;

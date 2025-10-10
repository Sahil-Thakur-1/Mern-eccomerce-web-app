import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../features/shop/categorySlice';
import { addProduct, editProduct, fetchProducts } from '../../features/shop/productSlice';
import { useParams } from 'react-router-dom';

const AddEditProduct = () => {
    const id = useParams().id;
    console.log(id);
    const initialState = {
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        stock: 0,
    };

    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    const { products } = useSelector((state) => state.product);

    useEffect(() => {
        if (id) {
            const productDetail = products.find((item) => item._id === id);
            if (productDetail) {
                setFormData(productDetail);
            }
            else {
                dispatch(fetchProducts());
            }
        }
        dispatch(fetchCategories());
    }, [dispatch, id, products]);

    const [formData, setFormData] = React.useState(initialState);

    const labelStyly = "text-gray-700 font-medium mb-1";

    return (
        <div className='flex flex-col h-[calc(100vh-64px)] overflow-y-auto bg-gray-50 w-full p-6'>
            {/* Page Title */}
            <h1 className='text-black font-bold text-3xl mb-6'>{id ? "Edit Product" : "Add Product"}</h1>

            {/* Form Container */}
            <form className='flex flex-col w-full gap-4'
                onSubmit={(e) => {
                    e.preventDefault();
                    if (id) {
                        const data = new FormData();
                        const productData = { ...formData };
                        delete productData.image;
                        data.append("productData", JSON.stringify(productData));
                        data.append("productId", id);
                        if (formData.image) {
                            data.append("image", formData.image);
                        }
                        dispatch(editProduct(data))
                    }
                    else {
                        const data = new FormData();
                        const productData = { ...formData };
                        delete productData.image;
                        data.append("productData", JSON.stringify(productData));
                        if (formData.image) {
                            data.append("image", formData.image);
                        }
                        dispatch(addProduct(data));
                    }
                    setFormData(initialState);
                }}>

                {/* Product Name */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='productName' className={labelStyly}>Product Name:</label>
                    <input
                        id='productName'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        type='text'
                        placeholder='Product Name'
                        className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none'
                    />
                </div>

                {/* Product Description */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='productDescription' className={labelStyly}>Product Description:</label>
                    <textarea
                        id='productDescription'
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder='Product Description'
                        className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none h-24'
                    ></textarea>
                </div>

                {/* Product Price */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='productPrice' className={labelStyly}>Product Price:</label>
                    <input
                        id='productPrice'
                        type='number'
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        value={formData.price}
                        placeholder='Product Price'
                        className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none'
                    />
                </div>

                {/* Product Category */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='category' className={labelStyly}>Product Category:</label>
                    <select
                        id='category'
                        className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none'
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        value={formData.category}
                    >
                        <option value="" disabled>Select Category</option>
                        {categories && categories.map((category) => {
                            return <option key={category._id} value={category._id}>{category.name}</option>
                        })}
                    </select>
                </div>

                {/* Product Image */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='productImage' className={labelStyly}>Product Image:</label>
                    <input
                        id='productImage'
                        type='file'
                        className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none'
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    />
                </div>

                {/* Product Stock */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='productStock' className={labelStyly}>Product Stock:</label>
                    <input
                        id='productStock'
                        type='number'
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        value={formData.stock}
                        placeholder='Product Stock'
                        className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none'
                    />
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold'
                >
                    {id ? "Edit Product" : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddEditProduct;


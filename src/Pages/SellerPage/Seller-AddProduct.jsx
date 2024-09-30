import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { seller_addProduct } from '../../Api/SelllerApi';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.number().positive("Price must be a positive number"),
    description: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    image: z.array(z.instanceof(File)).optional(), // Optional for validation purpose
});

function ProductAddingForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const [selectedImages, setSelectedImages] = useState([]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append("role", "seller");

        // Append each selected image to formData with 'image[]'
        for (const image of selectedImages) {
            formData.append('images', image);
        }


        try {
            const response = await seller_addProduct(formData);
            if (response && response.data) {
                toast(response.data.alert);
                navigate("/sellerDashboard");
            } else {
                toast("Failed to add product.");
            }
        } catch (error) {
            toast("Error occurred while adding the product.");
        }
    };

    // Handle multiple image file selection
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedImages(files);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full p-4 text-white rounded-lg shadow-md border border-white" style={{ width: '400px' }}>
                <h1 className="text-2xl font-bold mb-4 text-center text-[#872341]">Add New Product</h1>
                <form onSubmit={handleSubmit(onSubmit)} method='post' encType="multipart/form-data" className="flex flex-col">
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="Product Name"
                        className="mb-2 p-2 border border-white rounded placeholder:text-center bg-transparent"
                    />
                    {errors.name && <span className="text-red-400">{errors.name.message}</span>}

                    <input
                        type="number"
                        {...register("price", { valueAsNumber: true })}
                        placeholder="Price"
                        className="mb-2 p-2 border border-white rounded placeholder:text-center bg-transparent"
                    />
                    {errors.price && <span className="text-red-400">{errors.price.message}</span>}

                    <textarea
                        {...register("description")}
                        placeholder="Description"
                        className="mb-2 p-2 border border-white rounded placeholder:text-center bg-transparent h-24 resize-none"
                    />

                    <input
                        type="text"
                        {...register("category")}
                        placeholder="Category"
                        className="mb-2 p-2 border border-white rounded placeholder:text-center bg-transparent"
                    />
                    {errors.category && <span className="text-red-400">{errors.category.message}</span>}

                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="mb-2 border border-white rounded placeholder:text-center bg-transparent"
                        multiple
                    />

                    {selectedImages.length > 0 && selectedImages.map((images, index) => (
                        <span key={index} className="text-green-400">{images.name}</span>
                    ))}

                    <button
                        type="submit"
                        className="bg-[#872341] text-white p-2 rounded hover:bg-[#a23e55] transition duration-200"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductAddingForm;

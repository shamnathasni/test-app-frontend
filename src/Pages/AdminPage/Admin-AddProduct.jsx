import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

const schema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.number().positive("Price must be a positive number"),
    description: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    image: z.instanceof(File).optional(), // For the image upload
});

function ProductAddingForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const [selectedImage, setSelectedImage] = useState(null);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('category', data.category);
        
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

    const response = await seller-addProduct(formData) 
    if (response) {
        toast(response.data.alert)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full p-4 text-black rounded-lg shadow-md border border-white" style={{ width: '400px' }}>
                <h1 className="text-2xl font-bold mb-4 text-center text-[#872341]">Add New Product</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
                        {...register("image")}
                        onChange={handleImageChange}
                        className="mb-2 border border-white rounded placeholder:text-center bg-transparent"
                    />
                    {selectedImage && <span className="text-green-400">{selectedImage.name}</span>}

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

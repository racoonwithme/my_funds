// src/components/CategoryList.js
import React, { useEffect, useState } from 'react';
import { getCategories } from '../api';

const API_URL = process.env.REACT_APP_API_URL;

const CategoryList = ({ onCategoryDeleted }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleDeleteCategory = async (categoryId) => {
        const response = await fetch(`${API_URL}categories/delete/${categoryId}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setCategories(categories.filter(category => category.id !== categoryId));
            onCategoryDeleted();  // Обновление списка категорий
        } else {
            console.error('Ошибка при удалении категории');
        }
    };

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
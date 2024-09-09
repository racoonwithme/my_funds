import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { createTransaction, getCategories } from '../api';

const API_URL = process.env.REACT_APP_API_URL;

const TransactionForm = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            const formattedCategories = data.map(cat => ({
                value: cat.id,
                label: cat.name,
            }));
            setCategories(formattedCategories);
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const transaction = {
            category: selectedCategory ? selectedCategory.value : null,
            amount,
            comment,
            date,
        };
        await createTransaction(transaction);
        setSelectedCategory(null);
        setAmount('');
        setComment('');
        setDate('');
        setNewCategoryName('');
    };

    const handleCreateCategory = async () => {
        if (newCategoryName) {
            // Отправка POST-запроса на создание новой категории
            const response = await fetch(`${API_URL}categories/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newCategoryName }),
            });

            if (response.ok) {
                const newCategory = await response.json();
                setCategories([...categories, { value: newCategory.id, label: newCategory.name }]);
                setSelectedCategory({ value: newCategory.id, label: newCategory.name });
                setNewCategoryName('');
            } else {
                console.error('Ошибка при создании категории');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Transaction</h2>
            <Select
                options={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Select category"
                isClearable
                isSearchable
                onInputChange={(inputValue) => {
                    setNewCategoryName(inputValue);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && newCategoryName) {
                        handleCreateCategory();
                    }
                }}
                inputValue={newCategoryName}
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
            />
            <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;
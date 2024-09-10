import React, { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryList from './components/CategoryList';

const App = () => {
    const [refreshTransactions, setRefreshTransactions] = useState(false);
    const [refreshCategories, setRefreshCategories] = useState(false);

    const handleTransactionAdded = () => {
        setRefreshTransactions(!refreshTransactions);
    };

    const handleCategoryDeleted = () => {
        setRefreshCategories(!refreshCategories);
    };

    return (
        <div>
            <h1>My Funds</h1>
            <TransactionForm onTransactionAdded={handleTransactionAdded} />
            <TransactionList refresh={refreshTransactions} />
            <CategoryList onCategoryDeleted={handleCategoryDeleted} />
        </div>
    );
};

export default App;

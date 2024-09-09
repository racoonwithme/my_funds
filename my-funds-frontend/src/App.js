import React from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryList from './components/CategoryList';

const App = () => {
    return (
        <div>
            <h1>My Funds</h1>
            <TransactionForm />
            <TransactionList />
            <CategoryList />
        </div>
    );
};

export default App;

import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api';

const TransactionList = ({ refresh }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const data = await getTransactions();
            setTransactions(data);
        };
        fetchTransactions();
    }, [refresh]);

    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.category}: {transaction.amount} on {transaction.date} - {transaction.comment}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
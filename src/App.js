import "./App.css";
import { useState } from 'react';
import contactsData from './contacts.json';

function App() {
    const initialContacts = contactsData.slice(0, 5);
    const [contacts, setContacts] = useState(initialContacts);

    const remainingContacts = contactsData.slice(5);

    const addRandomContact = () => {
        if (remainingContacts.length === 0) return;

        const randomIndex = Math.floor(Math.random() * remainingContacts.length);
        const newContact = remainingContacts[randomIndex];

        setContacts((prevContacts) => [...prevContacts, newContact]);
        remainingContacts.splice(randomIndex, 1);
    };

    const sortByPopularity = () => {
        const sortedContacts = [...contacts].sort((a, b) => b.popularity - a.popularity);
        setContacts(sortedContacts);
    };

    const sortByName = () => {
        const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
        setContacts(sortedContacts);
    };

    const deleteContact = (id) => {
        setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== id));
    };

    return (
        <div className="App bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Contacts List</h1>

            <div className="flex justify-center mb-4">
                <button onClick={sortByPopularity} className="mr-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200">
                    Sort by Popularity
                </button>
                <button onClick={sortByName} className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200">
                    Sort by Name
                </button>
            </div>

            <button 
                onClick={addRandomContact} 
                className="mb-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Add Random Contact
            </button>

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 border-b text-left text-gray-600">Picture</th>
                        <th className="py-3 px-4 border-b text-left text-gray-600">Name</th>
                        <th className="py-3 px-4 border-b text-left text-gray-600">Popularity</th>
                        <th className="py-3 px-4 border-b text-left text-gray-600">Won an Oscar</th>
                        <th className="py-3 px-4 border-b text-left text-gray-600">Won an Emmy</th>
                        <th className="py-3 px-4 border-b text-left text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-100 transition duration-200">
                            <td className="py-2 px-4 border-b">
                                <img src={contact.pictureUrl} alt={contact.name} className="w-16 h-16 rounded-full" />
                            </td>
                            <td className="py-2 px-4 border-b">{contact.name}</td>
                            <td className="py-2 px-4 border-b">{contact.popularity.toFixed(2)}</td>
                            <td className="py-2 px-4 border-b">{contact.wonOscar ? '🏆' : ''}</td>
                            <td className="py-2 px-4 border-b">{contact.wonEmmy ? '🏆' : ''}</td>
                            <td className="py-2 px-4 border-b">
                                <button 
                                    onClick={() => deleteContact(contact.id)} 
                                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                                >
                                    Delete
                                </button>
                            </td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
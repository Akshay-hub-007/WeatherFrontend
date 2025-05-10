import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { History as His, Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

function History() {
    const [history, setHistory] = useState([]);
    const fetchHistory = async () => {
        try {
            const response = await axios.get("http://localhost:8080/history", { withCredentials: true });
            setHistory(response.data);
        } catch (error) {
            console.log("Error fetching history:", error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete/${id}`, { withCredentials: true });
            toast.success(response.data);
            fetchHistory();
        } catch (error) {
            console.log(error);
            toast.error("Error deleting entry");
        }
    };
    return (
        <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
                <His className="w-8 h-8 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-800">History</h1>
            </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.map((item, idx) => (
                    <Card key={idx} className="shadow-md hover:shadow-lg transition duration-200">
                        <CardHeader className="flex flex-col items-start space-y-1">
                            <div className="flex justify-between items-center w-full">
                                <CardTitle className="text-xl">{item.city}</CardTitle>
                                <button onClick={() => handleDelete(item?.id)}>
                                    <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                                </button>
                            </div>
                            <CardDescription className="text-sm text-gray-600">
                                {new Date(item.searchedAt).toLocaleString()}
                            </CardDescription>
                            <CardContent className="text-gray-700">
                                <p>{item.temperature}°C – {item.condition}</p>
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default History;

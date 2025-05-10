import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [points, setPoints] = useState(0);
  const [edit, setEdit] = useState(false)
  const [image, setImage] = useState("")
  const [mobile,setMobile]=useState("")
  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getDetails`, { withCredentials: true });
        setName(response.data.username);
        setEmail(response.data.email);
        setPoints(response.data.points || 0);
        setImage(response.data.image || "")
        setMobile(response.data.mobile)
      } catch (err) {
        console.error("Error fetching user details", err);
      }
    };
    getDetails();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          {
            image && image.length > 0 ? <>
              <div className="rounded-full w-[100px] h-[100px] flex items-center justify-center text-white text-4xl font-bold mb-4">
                <img
                  src={`data:image/jpeg;base64,${image}`}
                  alt="Profile"
                  className="rounded-full w-[100px] h-[100px] object-cover mb-4"
                  draggable="false"
                />

              </div>
            </> : <>
              <div className="rounded-full bg-blue-700 w-[100px] h-[100px] flex items-center justify-center text-white text-4xl font-bold mb-4">
                {name.charAt(0).toUpperCase() || 'A'}
              </div></>
          }

          <h2 className="text-2xl font-semibold mb-6">User Profile</h2>

          <div className="w-full space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                readOnly
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Points</label>
              <input
                type="number"
                value={points}
                readOnly
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Mobile Number</label>
              <input
                type="number"
                value={mobile}
                readOnly={edit}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className='space-x-3'>
              <Button onClick={()=>setEdit(true)}>Edit</Button>
              <Button onClick >Update</Button>
              <Button>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

import { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/user/userSlice';

export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  
  const [profileImage, setProfileImage] = useState(currentUser.profilePicture);
  const fileInputRef = useState(null);

  const handleSignOut = () => {
    dispatch(logout());
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div 
          className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={handleClick}
        >
          <img
            src={profileImage}
            alt='user'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
          />
        </div>
        <input
          type='file'
          accept='image/*'
          className='hidden'
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer' onClick={handleSignOut}>Sign Out</span>
      </div>
    </div>
  );
}

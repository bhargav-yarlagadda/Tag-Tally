'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { loadavg } from 'os';
import { scrapeAndStoreProduct } from '@/lib/actions';
const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    return (
      hostname.includes('amazon.com') ||
      hostname.includes('amazon.') ||
      hostname.includes('amazon.in') ||
      hostname.endsWith('amazon')
    );
  } catch (error) {
    return false;
  }
};

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/80 rounded-lg p-6 shadow-lg w-80 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Invalid URL</h2>
        <p className="text-gray-600 mb-6">
          Please enter a valid Amazon product URL.
        </p>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={onClose}
          
        >
          Close
        </button>
      </div>
    </div>
  );
};

const SearchBar = () => {
  const [userUrl, setUserUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading,setLoading] = useState(false)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedUrl = e.target.value;
    setUserUrl(parsedUrl);
  };

  const handleSearch = async (e:any) => {
    e.preventDefault();
    const isValid = isValidAmazonProductURL(userUrl);
    if (!isValid) {
      setIsModalOpen(true);
      return;
    }
    try{
      setLoading(true)
      const product = await scrapeAndStoreProduct(userUrl)
      setUserUrl('')
      }catch(e){
    } finally{
      setLoading(false)
    }
  };

  const closeModal = () => {
    setUserUrl('');
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />

      {/* Search Bar */}
      <form className="flex flex-wrap gap-4 mt-12" onSubmit={(e)=>{handleSearch(e)}}>
        <input
          type="text"
          onChange={handleInput}
          value={userUrl}
          placeholder="Enter product link"
          className="searchbar-input border border-gray-300 rounded-md px-4 py-2 focus:ring focus:outline-none"
        />
        <button
          type="submit"
          disabled={userUrl === ''}
          className={`${userUrl === '' ? 'bg-gray-600' :"bg-green-600 "}  rounded-md px-3 py-2 text-teal-200 hover:cursor-pointer`}
        >
          {loading ? "searching..." :'search'}
        </button>
      </form>
      <Image 
  src="assets/icons/hand-drawn-arrow.svg"
  alt="arrow"
  width={175}
  height={175}
  className=" hidden lg:block md:absolute left-[40%] -bottom-[18%] max-xl:left-[75%]  max-xl:right-10 max-xl:top-[68%] max-xl:-translate-y-[30px] max-xl:-rotate-45"
/>

    </div>
  );
};

export default SearchBar;

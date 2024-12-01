'use client';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
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

interface SearchBarProps {
  callback?: () => void; // Optional onClick function to modify state
}

const SearchBar: React.FC<SearchBarProps> = ({ callback }) => {
  const router = useRouter();
  const [userUrl, setUserUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUrl(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = isValidAmazonProductURL(userUrl);
    if (!isValid) {
      setIsModalOpen(true);
      return;
    }
    try {
      setLoading(true);
      const productId = await scrapeAndStoreProduct(userUrl);
      setUserUrl('');
      router.push(`/products/${productId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      <form className="flex flex-wrap gap-4 " onSubmit={async (e)=>{
        const _ = await handleSearch(e)
        !!callback && callback()

      }}>
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
          className={`${userUrl === '' ? 'bg-gray-600' : 'bg-green-600'} rounded-md px-3 py-2 text-teal-200 hover:cursor-pointer`}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      {callback && <button className=' rounded-md px-3 py-2 bg-red-700 text-teal-200 hover:cursor-pointer' onClick={callback}>Close</button>}
      </form>

      {/* Optional Image */}

      {/* Close Button (if `callback` is provided) */}
    </div>
  );
};

export default SearchBar;

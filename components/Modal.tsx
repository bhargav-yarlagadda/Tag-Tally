"use client";

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { addUserEmailToProduct } from '@/lib/actions';

interface Props {
  productId: string;
}

const Modal = ({ productId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addUserEmailToProduct(productId, email);
    
    setIsSubmitting(false);
    setEmail('');
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn"
        onClick={() => setIsOpen(true)}
      >
        Track
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-90 backdrop-blur-sm z-50">
          <div className="bg-gray-200 rounded-lg shadow-lg w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 border border-gray-200 rounded-md">
                <Image
                  src="/assets/icons/logo.svg"
                  alt="logo"
                  width={28}
                  height={28}
                />
              </div>

              <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                <Image
                  src="/assets/icons/x-close.svg"
                  alt="close"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Stay updated with product pricing alerts right in your inbox!
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Never miss a bargain again with our timely alerts!
            </p>

            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="w-8 h-8 border-t-2 border-blue-500 border-solid rounded-full animate-spin"
                  viewBox="0 0 24 24"
                />
              </div>
            ) : (
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="flex items-center border border-gray-300 rounded-md mb-4">
                  <Image
                    src="/assets/icons/mail.svg"
                    alt="mail"
                    width={20}
                    height={20}
                    className="ml-2 mr-2"
                  />
                  <input
                    required
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-md p-2 border-0 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin" viewBox="0 0 24 24" />
                  ) : (
                    'Track'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

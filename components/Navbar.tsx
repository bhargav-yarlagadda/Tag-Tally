'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';

const Navbar = () => {// State for toggling the search bar
  const router = useRouter();
  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  return (
    <header className="w-full h-[70px]  fixed bg-white z-[100] shadow-md">
      <nav className="nav flex justify-between h-full items-center px-4 py-3">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />
          <p className="text-lg font-bold">
            Tag<span className="text-primary">Tally</span>
          </p>
        </Link>

        {/* Icons and Search Section */}
        <div className="flex items-center gap-6">
          {isSearchVisible ? (
            <SearchBar
              callback={toggleSearch} // Close the search bar
            />
          ) : (
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={28}
              height={28}
              className="object-contain cursor-pointer"
              onClick={() => setSearchVisible(true)} // Show the search bar
            />
          )}
          <Image
            src="/assets/icons/black-heart.svg"
            alt="heart"
            onClick={() => {
              router.push('/products');
            }}
            width={28}
            height={28}
            className="object-contain cursor-pointer hover:scale-110 transition-all ease-in duration-300"
          />
          <Image
            src="/assets/icons/user.svg"
            alt="user"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

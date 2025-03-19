import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); 
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search Pokemon..."
        className="w-full max-w-md px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;



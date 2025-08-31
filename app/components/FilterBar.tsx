"use client";

import { useState } from 'react';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSortChange: (sortBy: string) => void;
  sortBy: string;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
}

export default function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  onSortChange,
  sortBy,
  priceRange,
  onPriceRangeChange,
  maxPrice
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      {/* Main Filters Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                try {
                  onCategoryChange(cat);
                } catch (error) {
                  console.error('Error changing category:', error);
                }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white border-primary-600 shadow-soft'
                  : 'bg-white text-primary-600 border-primary-600 hover:bg-primary-600 hover:text-white hover:shadow-soft'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => {
                try {
                  onSearchChange(e.target.value);
                } catch (error) {
                  console.error('Error updating search term:', error);
                }
              }}
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select
            value={sortBy}
            onChange={(e) => {
              try {
                onSortChange(e.target.value);
              } catch (error) {
                console.error('Error changing sort:', error);
              }
            }}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-sm text-primary-600 hover:text-primary-600/80 transition-colors"
        >
          <span className="mr-2">Advanced Filters</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Advanced Filters Content */}
        {isExpanded && (
          <div className="mt-4 space-y-4 animate-fadeIn">
            {/* Price Range Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => {
                    try {
                      onPriceRangeChange([parseInt(e.target.value), priceRange[1]]);
                    } catch (error) {
                      console.error('Error updating price range:', error);
                    }
                  }}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => {
                    try {
                      onPriceRangeChange([priceRange[0], parseInt(e.target.value)]);
                    } catch (error) {
                      console.error('Error updating price range:', error);
                    }
                  }}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            {/* Quick Price Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  try {
                    onPriceRangeChange([0, 25]);
                  } catch (error) {
                    console.error('Error setting price range:', error);
                  }
                }}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
              >
                Under $25
              </button>
              <button
                onClick={() => {
                  try {
                    onPriceRangeChange([25, 50]);
                  } catch (error) {
                    console.error('Error setting price range:', error);
                  }
                }}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
              >
                $25 - $50
              </button>
              <button
                onClick={() => {
                  try {
                    onPriceRangeChange([50, 100]);
                  } catch (error) {
                    console.error('Error setting price range:', error);
                  }
                }}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
              >
                $50 - $100
              </button>
              <button
                onClick={() => {
                  try {
                    onPriceRangeChange([100, maxPrice]);
                  } catch (error) {
                    console.error('Error setting price range:', error);
                  }
                }}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
              >
                Over $100
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

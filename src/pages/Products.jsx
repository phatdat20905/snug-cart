
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { 
  ChevronDown, 
  SlidersHorizontal,
  X,
  Check
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    priceRange: null,
    sortBy: 'featured'
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Price ranges
  const priceRanges = [
    { id: 'under50', label: 'Under $50', min: 0, max: 50 },
    { id: '50to100', label: '$50 - $100', min: 50, max: 100 },
    { id: '100to200', label: '$100 - $200', min: 100, max: 200 },
    { id: 'over200', label: 'Over $200', min: 200, max: 10000 }
  ];

  // Sorting options
  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'priceAsc', label: 'Price: Low to High' },
    { id: 'priceDesc', label: 'Price: High to Low' },
    { id: 'nameAsc', label: 'Name: A-Z' },
    { id: 'nameDesc', label: 'Name: Z-A' }
  ];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filters
    if (activeFilters.categories.length > 0) {
      result = result.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }
    
    // Apply price range filter
    if (activeFilters.priceRange) {
      const { min, max } = activeFilters.priceRange;
      result = result.filter(product => 
        product.price >= min && product.price <= max
      );
    }
    
    // Apply sorting
    switch (activeFilters.sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [activeFilters]);

  // Toggle category filter
  const toggleCategoryFilter = (category) => {
    setActiveFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories };
    });
  };

  // Set price range filter
  const setPriceRangeFilter = (range) => {
    setActiveFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === range ? null : range
    }));
  };

  // Set sort option
  const setSortOption = (sortBy) => {
    setActiveFilters(prev => ({ ...prev, sortBy }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      priceRange: null,
      sortBy: 'featured'
    });
  };

  // Get current sort option label
  const getCurrentSortLabel = () => {
    const option = sortOptions.find(option => option.id === activeFilters.sortBy);
    return option ? option.label : 'Featured';
  };

  // Check if any filter is active
  const hasActiveFilters = () => {
    return (
      activeFilters.categories.length > 0 ||
      activeFilters.priceRange !== null
    );
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
      
      {/* Filters and Sort Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            className="flex items-center gap-2 md:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal size={16} />
            Filters
          </Button>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex items-center gap-2">
            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Category
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {categories.map(category => (
                  <DropdownMenuItem 
                    key={category.id}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleCategoryFilter(category.name)}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`category-${category.id}`}
                        checked={activeFilters.categories.includes(category.name)}
                        onCheckedChange={() => toggleCategoryFilter(category.name)}
                      />
                      <label 
                        htmlFor={`category-${category.id}`}
                        className="cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Price Range Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Price
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {priceRanges.map(range => (
                  <DropdownMenuItem 
                    key={range.id}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setPriceRangeFilter(range)}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`price-${range.id}`}
                        checked={activeFilters.priceRange === range}
                        onCheckedChange={() => setPriceRangeFilter(range)}
                      />
                      <label 
                        htmlFor={`price-${range.id}`}
                        className="cursor-pointer"
                      >
                        {range.label}
                      </label>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Clear Filters Button */}
            {hasActiveFilters() && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearAllFilters}
                className="text-primary"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {getCurrentSortLabel()}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortOptions.map(option => (
                <DropdownMenuItem 
                  key={option.id}
                  onClick={() => setSortOption(option.id)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Active Filters */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-gray-500">Active Filters:</span>
          
          {activeFilters.categories.map(category => (
            <div 
              key={category}
              className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm"
            >
              {category}
              <button 
                onClick={() => toggleCategoryFilter(category)}
                className="text-gray-500 hover:text-primary ml-1"
                aria-label={`Remove ${category} filter`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          
          {activeFilters.priceRange && (
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm">
              {activeFilters.priceRange.label}
              <button 
                onClick={() => setPriceRangeFilter(null)}
                className="text-gray-500 hover:text-primary ml-1"
                aria-label={`Remove ${activeFilters.priceRange.label} filter`}
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          <button 
            onClick={clearAllFilters}
            className="text-primary text-sm hover:underline"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Results Count */}
      <p className="text-gray-500 mb-6">
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
      </p>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
          <Button onClick={clearAllFilters}>
            Clear All Filters
          </Button>
        </div>
      )}
      
      {/* Mobile Filters Sidebar */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex md:hidden">
          <div className="bg-white w-4/5 max-w-sm h-full p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="text-gray-500"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={`mobile-category-${category.id}`} 
                      checked={activeFilters.categories.includes(category.name)}
                      onCheckedChange={() => toggleCategoryFilter(category.name)}
                    />
                    <label 
                      htmlFor={`mobile-category-${category.id}`}
                      className="ml-2 text-gray-700 cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Ranges */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Price</h4>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <div key={range.id} className="flex items-center">
                    <Checkbox 
                      id={`mobile-price-${range.id}`} 
                      checked={activeFilters.priceRange === range}
                      onCheckedChange={() => setPriceRangeFilter(range)}
                    />
                    <label 
                      htmlFor={`mobile-price-${range.id}`}
                      className="ml-2 text-gray-700 cursor-pointer"
                    >
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 mt-8">
              <Button 
                onClick={() => {
                  setMobileFiltersOpen(false);
                }}
                className="flex-1"
              >
                Apply Filters
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  clearAllFilters();
                  setMobileFiltersOpen(false);
                }}
                className="flex-1"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

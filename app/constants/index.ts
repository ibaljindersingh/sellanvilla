// System Constants
export const SYSTEM_CONSTANTS = {
  // App Configuration
  APP_NAME: 'Sellan Villa',
  APP_DESCRIPTION: 'Fashion & Lifestyle',
  APP_VERSION: '1.0.0',
  
  // Local Storage Keys
  STORAGE_KEYS: {
    CART: 'cart',
    WISHLIST: 'wishlist',
    USER_PREFERENCES: 'userPreferences',
    LANGUAGE: 'language',
    THEME: 'theme'
  },
  
  // API Endpoints
  API_ENDPOINTS: {
    PRODUCTS: '/api/products',
    CATEGORIES: '/api/categories',
    ORDERS: '/api/orders',
    USERS: '/api/users'
  },
  
  // Default Values
  DEFAULTS: {
    ITEMS_PER_PAGE: 12,
    MAX_CART_ITEMS: 99,
    MAX_WISHLIST_ITEMS: 100,
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    DEBOUNCE_DELAY: 300, // 300ms
    ANIMATION_DURATION: 300 // 300ms
  },
  
  // Error Codes
  ERROR_CODES: {
    NETWORK_ERROR: 'NETWORK_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
    NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
  },
  
  // Validation Rules
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGTH: 128,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
    MIN_EMAIL_LENGTH: 5,
    MAX_EMAIL_LENGTH: 254,
    PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  
  // File Upload
  FILE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    MAX_FILES: 5
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 12,
    MAX_LIMIT: 100
  },
  
  // Cache
  CACHE: {
    PRODUCTS_TTL: 5 * 60 * 1000, // 5 minutes
    CATEGORIES_TTL: 30 * 60 * 1000, // 30 minutes
    USER_TTL: 15 * 60 * 1000 // 15 minutes
  }
} as const;

// Error Messages (System/Technical)
export const ERROR_MESSAGES = {
  // Network Errors
  NETWORK: {
    FETCH_FAILED: 'Failed to fetch data from server',
    TIMEOUT: 'Request timed out',
    OFFLINE: 'You are currently offline',
    SERVER_UNREACHABLE: 'Server is currently unreachable',
    IMAGE_LOAD_ERROR: 'Error loading image'
  },
  
  // Authentication Errors
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    SESSION_EXPIRED: 'Your session has expired',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    TOKEN_INVALID: 'Authentication token is invalid'
  },
  
  // Validation Errors
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
    PASSWORD_TOO_LONG: 'Password must be less than 128 characters',
    NAME_TOO_SHORT: 'Name must be at least 2 characters long',
    NAME_TOO_LONG: 'Name must be less than 50 characters'
  },
  
  // File Upload Errors
  FILE: {
    TOO_LARGE: 'File size exceeds maximum limit of 5MB',
    INVALID_TYPE: 'File type not supported',
    UPLOAD_FAILED: 'Failed to upload file',
    TOO_MANY_FILES: 'Too many files selected'
  },
  
  // Database Errors
  DATABASE: {
    CONNECTION_FAILED: 'Database connection failed',
    QUERY_FAILED: 'Database query failed',
    TRANSACTION_FAILED: 'Database transaction failed',
    CONSTRAINT_VIOLATION: 'Data constraint violation'
  },
  
  // Cart Errors
  CART: {
    CART_ERROR: 'Error updating cart. Please try again.',
    ITEM_NOT_FOUND: 'Item not found in cart',
    QUANTITY_INVALID: 'Invalid quantity specified',
    CART_FULL: 'Cart is full'
  },
  
  // Wishlist Errors
  WISHLIST: {
    WISHLIST_ERROR: 'Error updating wishlist. Please try again.',
    ITEM_NOT_FOUND: 'Item not found in wishlist',
    WISHLIST_FULL: 'Wishlist is full'
  }
} as const;

// Success Messages (System/Technical)
export const SUCCESS_MESSAGES = {
  // Authentication
  AUTH: {
    LOGIN_SUCCESS: 'Successfully logged in',
    LOGOUT_SUCCESS: 'Successfully logged out',
    REGISTRATION_SUCCESS: 'Account created successfully',
    PASSWORD_RESET_SUCCESS: 'Password reset email sent'
  },
  
  // Data Operations
  DATA: {
    CREATED: 'Data created successfully',
    UPDATED: 'Data updated successfully',
    DELETED: 'Data deleted successfully',
    SAVED: 'Data saved successfully'
  },
  
  // File Operations
  FILE: {
    UPLOADED: 'File uploaded successfully',
    DELETED: 'File deleted successfully',
    PROCESSED: 'File processed successfully'
  }
} as const;

// API Response Messages
export const API_MESSAGES = {
  // Success Responses
  SUCCESS: {
    PRODUCT_CREATED: 'Product created successfully',
    PRODUCT_UPDATED: 'Product updated successfully',
    PRODUCT_DELETED: 'Product deleted successfully',
    ORDER_CREATED: 'Order created successfully',
    ORDER_UPDATED: 'Order updated successfully',
    USER_UPDATED: 'User profile updated successfully'
  },
  
  // Error Responses
  ERROR: {
    PRODUCT_NOT_FOUND: 'Product not found',
    ORDER_NOT_FOUND: 'Order not found',
    USER_NOT_FOUND: 'User not found',
    CATEGORY_NOT_FOUND: 'Category not found',
    INVALID_PRODUCT_DATA: 'Invalid product data provided',
    INVALID_ORDER_DATA: 'Invalid order data provided',
    INVALID_USER_DATA: 'Invalid user data provided'
  }
} as const;

// Export all constants
export const CONSTANTS = {
  SYSTEM: SYSTEM_CONSTANTS,
  ERRORS: ERROR_MESSAGES,
  SUCCESS: SUCCESS_MESSAGES,
  API: API_MESSAGES
} as const;

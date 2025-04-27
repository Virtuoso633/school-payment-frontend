// src/services/api.ts
import axios from 'axios';

// Retrieve the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    console.error("Error: VITE_API_BASE_URL is not defined in environment variables.");
    // You might want to throw an error or have a default fallback,
    // but erroring out during development is often better.
}

// Create an Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Axios Interceptors (Optional but Recommended) ---

// Request Interceptor: Add JWT token to requests
apiClient.interceptors.request.use(
    (config) => {
        // Get the token from local storage (or session storage, context, etc.)
        // We'll implement login/token storage later
        const token = localStorage.getItem('authToken'); // Use a consistent key

        if (token) {
            // Add the Authorization header if a token exists
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // Continue with the modified request config
    },
    (error) => {
        // Handle request error (e.g., network error before sending)
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle global errors like 401 Unauthorized
apiClient.interceptors.response.use(
    (response) => {
        // If response is successful (2xx status code), just return it
        return response;
    },
    (error) => {
        // Handle errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const { status } = error.response;

            if (status === 401) {
                // Unauthorized - likely expired or invalid token
                console.error("API request Unauthorized (401). Token might be invalid or expired.");
                // Clear the potentially invalid token
                localStorage.removeItem('authToken');
                // Redirect to login page
                // Use window.location or React Router's navigate function
                // Make sure this doesn't cause infinite loops if login page itself uses the API
                if (window.location.pathname !== '/login') { // Avoid redirect loop
                     window.location.href = '/login'; // Simple redirect
                }
                 // You might want to show a notification to the user here
            } else if (status === 403) {
                // Forbidden - user authenticated but lacks permission
                console.error("API request Forbidden (403). User lacks permissions.");
                 // Show an error message, maybe redirect to an 'unauthorized' page
            }
            // Add handling for other common errors (404, 500, etc.) if needed
        } else if (error.request) {
            // The request was made but no response was received (e.g., network error, backend down)
            console.error('API request error: No response received.', error.request);
             // Show a generic network error message
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('API request setup error:', error.message);
        }

        // Reject the promise so the error can be caught in the calling component/hook
        return Promise.reject(error);
    }
);


// Export the configured Axios instance
export default apiClient;
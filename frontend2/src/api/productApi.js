import apiClient from "./apiClient";


// Objet regroupant les appels d'API relatifs à la gestion des produits
export const productApi = {
    // Récupère la liste des produits avec filtres optionnels en paramètre d'URL (GET /api/v1/products)
    getProducts: (params = "") => apiClient.get(`/products${params ? `?${params}` : ""}`),
    // Récupère les détails d'un produit spécifique grâce à son identifiant (GET /api/v1/products/:id)
    getProductById: (id) => apiClient.get(`/products/${id}`),
    // Effectue une recherche avec autocomplétion selon un mot-clé (GET /api/v1/products/autocomplete?q=...)
    autocomplete: (query) => apiClient.get(`/products/autocomplete?q=${encodeURIComponent(query)}`),
    // Crée un nouveau produit dans le catalogue (POST /api/v1/products)
    createProduct: (productData) => apiClient.post("/products", productData),
    // Met à jour les informations d'un produit existant (PUT /api/v1/products/:id)
    updateProduct: (id, data) => apiClient.put(`/products/${id}`, data),
    // Supprime un produit du catalogue selon son identifiant (DELETE /api/v1/products/:id)
    deleteProduct: (id) => apiClient.delete(`/products/${id}`),
  };
  
  // Exportation par défaut des services de produits
  export default productApi;
  
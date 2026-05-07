import axiosInstance from "./axios";

export interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    featured_image?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    status: string;
    created_at: string;
    published_at?: string;
}

export interface ArticleCreatePayload {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featured_image?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    status: string;
    published_at?: string;
}

const apiService = {
    /**
     * Get all articles (authenticated - for CMS)
     * GET /api/article
     */
    async getArticles(): Promise<Article[]> {
        const response = await axiosInstance.get("http://localhost:9804/api/article");
        const data = response.data;
        const items: Article[] = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);

        // Sort by created_at descending
        items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        return items;
    },

    /**
     * Get all public articles (no auth required)
     * GET /api/article/public
     */
    async getPublicArticles(): Promise<Article[]> {
        const response = await axiosInstance.get("http://localhost:9804/api/article/public");
        const data = response.data;
        const items: Article[] = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);

        // Sort by created_at descending
        items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        return items;
    },

    /**
     * Get single public article by ID (no auth required)
     * GET /api/article/public/:id
     */
    async getPublicArticleById(id: string): Promise<Article> {
        const response = await axiosInstance.get(`http://localhost:9804/api/article/public/${id}`);
        return response.data?.data || response.data;
    },

    /**
     * Get single article by ID
     * GET http://localhost:9804/api/article/:id
     */
    async getArticleById(id: string): Promise<Article> {
        const response = await axiosInstance.get(`http://localhost:9804/api/article/${id}`);
        // Unwrap data property if it exists
        return response.data?.data || response.data;
    },

    /**
     * Create new article
     * POST http://localhost:9804/api/article
     */
    async createArticle(payload: ArticleCreatePayload, imageFile?: File): Promise<Article> {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined) {
                // If this is the featured_image field, only append if it's a string (URL) 
                // and we DON'T have a new file. If we have a file, we'll append it later.
                if (key === "featured_image") {
                    if (!imageFile && value) {
                        formData.append(key, String(value));
                    }
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        if (imageFile) {
            formData.append("featured_image", imageFile);
        }

        const response = await axiosInstance.post<Article>("http://localhost:9804/api/article", formData);
        return response.data;
    },

    /**
     * Update article
     * PUT http://localhost:9804/api/article/:id
     */
    async updateArticle(id: string, payload: Partial<ArticleCreatePayload>, imageFile?: File): Promise<Article> {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined) {
                if (key === "featured_image") {
                    if (!imageFile && value) {
                        formData.append(key, String(value));
                    }
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        if (imageFile) {
            formData.append("featured_image", imageFile);
        }

        const response = await axiosInstance.put<Article>(`http://localhost:9804/api/article/${id}`, formData);
        return response.data;
    },

    /**
     * Delete article
     * DELETE /api/article/:id
     */
    async deleteArticle(id: string): Promise<void> {
        await axiosInstance.delete(`http://localhost:9804/api/article/${id}`);
    },
};

export default apiService;
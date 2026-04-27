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
}

const apiService = {
    /**
     * Get all articles
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
    async createArticle(payload: ArticleCreatePayload): Promise<Article> {
        const response = await axiosInstance.post<Article>("http://localhost:9804/api/article", payload);
        return response.data;
    },

    /**
     * Update article
     * PUT http://localhost:9804/api/article/:id
     */
    async updateArticle(id: string, payload: Partial<ArticleCreatePayload>): Promise<Article> {
        const response = await axiosInstance.put<Article>(`http://localhost:9804/api/article/${id}`, payload);
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
import axiosInstance from "./axios";

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface TagSnapshot {
  id: string;
  name: string;
  slug: string;
}

export interface Pagination {
  total: number;
  limit: number;
  page: number;
  total_page: number;
}

export interface TagListResponse {
  message: string;
  data: Tag[];
  pagination: Pagination;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  category_id?: string;
  tags?: TagSnapshot[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  status: string;
  created_at: string;
  published_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  parent_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleCreatePayload {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  category_id?: string;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  status: string;
  published_at?: string;
}

export interface ArticleListResponse {
  message: string;
  data: Article[];
  pagination: Pagination;
}

const apiService = {
  /**
   * Get all articles (authenticated - for CMS)
   * GET /api/article
   */
  async getArticles(): Promise<Article[]> {
    const response = await axiosInstance.get(
      "http://localhost:9804/api/article",
    );
    const data = response.data;
    const items: Article[] = Array.isArray(data.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

    // Sort by created_at descending
    items.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    return items;
  },

  /**
   * Get all public articles (no auth required)
   * GET /api/article/public
   */
  async getPublicArticles(): Promise<Article[]> {
    const response = await axiosInstance.get(
      "http://localhost:9804/api/article/public",
    );
    const data = response.data;
    const items: Article[] = Array.isArray(data.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

    // Sort by created_at descending
    items.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    return items;
  },

  /**
   * Get single public article by ID (no auth required)
   * GET /api/article/public/:id
   */
  async getPublicArticleById(id: string): Promise<Article> {
    const response = await axiosInstance.get(
      "http://localhost:9804/api/article/public/" + id,
    );
    return response.data?.data || response.data;
  },

  /**
   * Get single article by ID
   * GET http://localhost:9804/api/article/:id
   */
  async getArticleById(id: string): Promise<Article> {
    const response = await axiosInstance.get(
      "http://localhost:9804/api/article/" + id,
    );
    // Unwrap data property if it exists
    return response.data?.data || response.data;
  },

  /**
   * Create new article
   * POST http://localhost:9804/api/article
   */
  async createArticle(
    payload: ArticleCreatePayload,
    imageFile?: File,
  ): Promise<Article> {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "tags" && Array.isArray(value)) {
          value.forEach((tag) => formData.append("tags", tag));
        } else if (key === "featured_image") {
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

    const response = await axiosInstance.post<Article>(
      "http://localhost:9804/api/article",
      formData,
    );
    return response.data;
  },

  /**
   * Update article
   * PUT http://localhost:9804/api/article/:id
   */
  async updateArticle(
    id: string,
    payload: Partial<ArticleCreatePayload>,
    imageFile?: File,
  ): Promise<Article> {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "tags" && Array.isArray(value)) {
          value.forEach((tag) => formData.append("tags", tag));
        } else if (key === "featured_image") {
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

    const response = await axiosInstance.put<Article>(
      "http://localhost:9804/api/article/" + id,
      formData,
    );
    return response.data;
  },

  /**
   * Delete article
   * DELETE /api/article/:id
   */
  async deleteArticle(id: string): Promise<void> {
    await axiosInstance.delete("http://localhost:9804/api/article/" + id);
  },

  /**
   * Get all categories
   * GET http://localhost:9804/api/category
   */
  async getCategories(): Promise<Category[]> {
    const response = await axiosInstance.get(
      "http://localhost:9804/api/category",
    );
    const data = response.data;
    return Array.isArray(data.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];
  },

  /**
   * TAG ARTICLES API
   */

  /**
   * List all tags
   * GET /tag-articles
   */
  async getTags(
    params: {
      page?: number;
      limit?: number;
      search?: string;
      sort_by?: string;
    } = {},
  ): Promise<TagListResponse> {
    const response = await axiosInstance.get(
      "http://localhost:9804/api/tag-article",
      { params },
    );
    return response.data;
  },

  /**
   * Create new tag
   * POST /tag-articles
   */
  async createTag(payload: { name: string; slug?: string }): Promise<Tag> {
    const response = await axiosInstance.post(
      "http://localhost:9804/api/tag-article",
      payload,
    );
    return response.data?.data || response.data;
  },

  /**
   * Update tag
   * PUT /tag-articles/:id
   */
  async updateTag(
    id: string,
    payload: { name: string; slug?: string },
  ): Promise<Tag> {
    const response = await axiosInstance.put(
      "http://localhost:9804/api/tag-article/" + id,
      payload,
    );
    return response.data?.data || response.data;
  },

  /**
   * Delete tag
   * DELETE /tag-articles/:id
   */
  async deleteTag(id: string): Promise<void> {
    await axiosInstance.delete("http://localhost:9804/api/tag-article/" + id);
  },

  /**
   * Search articles by tags
   * GET /article/tags
   */
  async getArticlesByTags(
    tags: string[],
    field: "slug" | "name" = "slug",
    page: number = 1,
    limit: number = 10,
  ): Promise<ArticleListResponse> {
    const response = await axiosInstance.get(
      "http://localhost:9804/api/article/tags",
      {
        params: { tags, field, page, limit },
      },
    );
    return response.data;
  },

  /**
   * Search tag suggestions
   * GET /article/tags/search
   */
  async searchTags(query: string): Promise<TagSnapshot[]> {
    const response = await axiosInstance.get(
      "http://localhost:9804/api/article/tags/search",
      {
        params: { q: query },
      },
    );
    const data = response.data;
    return Array.isArray(data.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];
  },
};

export default apiService;

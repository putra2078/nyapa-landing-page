import axiosInstance from "./axios";

// ==================== TYPES ====================

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    companyId?: string | number;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    status: string;
    message: string;
    data: {
        user: User;
        token: string;
    };
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    fullname: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    companyName: string;
}

// ==================== SERVICE ====================

const authService = {
    /**
     * Login user
     * POST /api/v1/auth/login
     */
    async login(payload: LoginPayload): Promise<AuthResponse> {
        const response = await axiosInstance.post<AuthResponse>(
            "http://localhost:9800/auth/login",
            payload
        );
        return response.data;
    },

    /**
     * Register user baru
     * POST /api/v1/auth/register
     */
    async register(payload: RegisterPayload): Promise<AuthResponse> {
        const response = await axiosInstance.post<AuthResponse>(
            "/api/v1/auth/register",
            payload
        );
        return response.data;
    },

    /**
     * Simpan data auth (user + token) ke localStorage
     */
    saveAuth(data: { user: User; token: string }) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Simpan userId dan companyId secara terpisah seperti di Insomnia
        if (data.user?.id) {
            localStorage.setItem("userId", String(data.user.id));
        }
        if (data.user?.companyId) {
            localStorage.setItem("companyId", String(data.user.companyId));
        }
    },

    /**
     * Ambil token dari localStorage
     */
    getToken(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("token");
    },

    /**
     * Ambil data user dari localStorage
     */
    getUser(): User | null {
        if (typeof window === "undefined") return null;
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    /**
     * Hapus data auth dari localStorage
     */
    clearAuth() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("companyId");
    },

    /**
     * Cek apakah user sudah login
     */
    isAuthenticated(): boolean {
        return !!this.getToken();
    },
};

export default authService;

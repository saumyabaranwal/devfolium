const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export type PortfolioPayload = {
  slug: string;
  title: string;
  theme_id: string;
  profile: Record<string, unknown>;
};

export type PortfolioRecord = PortfolioPayload & {
  id: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
};

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(error?.detail ?? "Something went wrong.");
  }

  return response.json() as Promise<T>;
}

export function createPortfolio(payload: PortfolioPayload) {
  return request<PortfolioRecord>("/portfolios", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updatePortfolio(
  portfolioId: string,
  payload: Partial<PortfolioPayload> & {
    status?: "draft" | "published";
  },
) {
  return request<PortfolioRecord>(`/portfolios/${portfolioId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function getPortfolios() {
  return request<PortfolioRecord[]>("/portfolios");
}
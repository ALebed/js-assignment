const BASE_URL = "https://seekingalpha.free.beeceptor.com";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const apiService = async <Resp>(
    endpoint: string,
    method: HttpMethod = "GET",
    body: unknown = null,
    headers: Record<string, string> = {}
): Promise<Resp> => {
    const config: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, config);

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};

export default apiService;

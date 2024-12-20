interface RequestOptions extends RequestInit {
  accessToken?: string;
}
//TODO : 헤더 설정 추가
async function request<T>(
  url: string,
  { accessToken, ...options }: RequestOptions = {}
): Promise<T> {
  const headers = new Headers(options.headers || {});

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = (await response.json()) as T;
  return data;
}

export { request };

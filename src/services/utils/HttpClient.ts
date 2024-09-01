/* eslint-disable @typescript-eslint/no-explicit-any */
interface HttpRequestBody {
  [key: string]: any;
}

interface MethodsInterface {
  path: string;
  token: string;
  reqBody?: string | HttpRequestBody[] | null;
  contentType?: string;
}

class HttpClient {
  private baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get({ path, token }: MethodsInterface): Promise<any> {
    const fetchConfig = {
      headers: {
        'authorization': `Bearer ${token}`,
      },
    };

    const response = await fetch(`${this.baseURL}${path}`, fetchConfig);

    if (response.status === 401) {
      return 'unauthorized';
    }

    const contentType = response.headers.get('Content-Type')!;

    let body = null;
    if (contentType.includes('application/json')) {
      body = await response.json();
    } else if (contentType.includes('application/zip')) {
      body = await response.blob();
    } else if (contentType.includes('application/pdf')) {
      body = await response.blob();
    }

    if (response.ok) {
      return body;
    }

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`,
    );
  }

  async post({
    path,
    reqBody,
    contentType = 'application/json',
    token,
  }: MethodsInterface): Promise<any> {
    const formData = new FormData();
    if (contentType === 'multipart/form-data' && reqBody) {
      (reqBody as HttpRequestBody[]).forEach(({ key, value }) => {
        formData.append(key, value);
      });
    }

    const fetchConfig = (reqBody) ? (
      (contentType === 'multipart/form-data') ? {
        method: 'POST',
        body: formData,
        headers: {
          'authorization': `Bearer ${token}`,
        }
      } : {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        body: `${reqBody}`,
      }
    ) : {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${token}`,
      }
    };

    const response = await fetch(`${this.baseURL}${path}`, fetchConfig as RequestInit);

    if (response.status === 401) {
      return 'unauthorized';
    }

    const responseContentType = response.headers.get('Content-Type');

    let body: any = null;
    if (responseContentType?.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`,
    );
  }

  async put({
    path,
    reqBody,
    contentType = 'application/json',
    token,
  }: MethodsInterface): Promise<any> {
    const formData = new FormData();
    if (contentType === 'multipart/form-data' && reqBody) {
      (reqBody as HttpRequestBody[]).forEach(({ key, value }) => {
        formData.append(key, value);
      });
    }

    const fetchConfig = (reqBody) ? (
      (contentType === 'multipart/form-data') ? {
        method: 'PUT',
        body: formData,
        headers: {
          'authorization': `Bearer ${token}`,
        }
      } : {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        body: `${reqBody}`,
      }
    ) : {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${token}`,
      }
    };

    const response = await fetch(`${this.baseURL}${path}`, fetchConfig as RequestInit);

    if (response.status === 401) {
      return 'unauthorized';
    }

    const responseContentType = response.headers.get('Content-Type');

    let body: any = null;
    if (responseContentType?.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`,
    );
  }

  async patch({
      path,
      reqBody,
      contentType = 'application/json',
      token,
    }: MethodsInterface): Promise<any> {
    const formData = new FormData();
    if (contentType === 'multipart/form-data' && reqBody) {
      (reqBody as HttpRequestBody[]).forEach(({ key, value }) => {
        formData.append(key, value);
      });
    }

    const fetchConfig = (reqBody) ? (
      (contentType === 'multipart/form-data') ? {
        method: 'PATCH',
        body: formData,
        headers: {
          'authorization': `Bearer ${token}`
        }
      } : {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: `${reqBody}`,
      }
    ) : {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const response = await fetch(`${this.baseURL}${path}`, fetchConfig as RequestInit);

    if (response.status === 401) {
      return 'unauthorized';
    }

    const responseContentType = response.headers.get('Content-Type')!;

    let body = null;
    if (responseContentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`,
    );
  }

  async delete({
    path,
    reqBody,
    token,
  }: MethodsInterface): Promise<any> {
    const fetchConfig = reqBody ? {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: `${reqBody}`,
    } : {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${token}`
      }
    };
    const response = await fetch(`${this.baseURL}${path}`, fetchConfig as RequestInit);

    if (response.status === 401) {
      return 'unauthorized';
    }

    const contentType = response.headers.get('Content-Type');

    let body: any = null;
    if (contentType?.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`,
    );
  }
}

export default HttpClient;

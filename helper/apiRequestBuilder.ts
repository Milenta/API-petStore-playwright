export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export class ApiRequestBuilder {
  private baseURL: string = ''
  private endpoint: string = ''
  private method: HttpMethod = HttpMethod.GET
  private headers: Record<string, string> = {}
  private body?: any

  constructor() {}

  setBaseURL(baseURL: string): ApiRequestBuilder {
    this.baseURL = baseURL
    return this
  }

  setEndpoint(endpoint: string): ApiRequestBuilder {
    this.endpoint = endpoint
    return this
  }

  setMethod(method: HttpMethod): ApiRequestBuilder {
    this.method = method
    return this
  }

  setHeaders(headers: Record<string, string>): ApiRequestBuilder {
    this.headers = { ...this.headers, ...headers }
    return this
  }

  setBody(body: any): ApiRequestBuilder {
    this.body = body
    return this
  }

  async send(): Promise<Response> {
    const response = await fetch(`${this.baseURL}${this.endpoint}`, {
      method: this.method,
      headers: { 'Content-Type': 'application/json', ...this.headers },
      body: JSON.stringify(this.body),
    })
    return response
  }
}

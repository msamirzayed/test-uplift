import { iif, map, Observable, tap } from 'rxjs'
import { Inject, Injectable } from '@angular/core'
import { API_BASE_URL } from './tokens'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private headers: HttpHeaders
	constructor(@Inject(API_BASE_URL) private apiBaseUrl: string, private httpClient: HttpClient) {
		this.headers = new HttpHeaders({
			'Content-Type': 'application/json',
		})
	}

	get<T>(endpointUrl: string, headers?: HttpHeaders): Observable<T> {
		return this.httpClient.get<T>(this.apiBaseUrl + endpointUrl, {
			headers: headers ?? this.headers,
		})
	}


	getFile(endpointUrl: string, fileName: string, fileExtension: string, body: any, headers?: HttpHeaders): Observable<HttpResponse<Blob>> {
		return this.httpClient
			.post(this.apiBaseUrl + endpointUrl,body, {
				headers: headers ?? this.headers,
				responseType: 'blob',
				observe: 'response',
			})
			.pipe(
				map((res) => {
					this.downloadFile(res.body as Blob, `${fileName}.${fileExtension}`)
					return res
				}),
			)
	}

	postFormData(endpointUrl: string, form: FormData) {
		return this.httpClient
			.post(this.apiBaseUrl + endpointUrl, form, {
				observe: 'events',
			})
			.pipe(tap(console.log))
	}

	post<TOut>(endpointUrl: string, body: unknown, headers?: HttpHeaders): Observable<TOut> {
		return this.httpClient.post<TOut>(this.apiBaseUrl + endpointUrl, body, {
			headers: headers ?? this.headers,
		})
	}

	put<TOut>(endpointUrl: string, body: unknown, headers?: HttpHeaders): Observable<TOut> {
		return this.httpClient.put<TOut>(this.apiBaseUrl + endpointUrl, body, {
			headers: headers ?? this.headers,
		})
	}

	patch<TOut>(endpointUrl: string, body: unknown, headers?: HttpHeaders): Observable<TOut> {
		return this.httpClient.patch<TOut>(this.apiBaseUrl + endpointUrl, body, {
			headers: headers ?? this.headers,
		})
	}

	delete<T>(endpointUrl: string, body?: unknown, headers?: HttpHeaders): Observable<T> {
		return iif(
			() => !body,
			this.httpClient.delete<T>(this.apiBaseUrl + endpointUrl, {
				headers: headers ?? this.headers,
			}),
			this.httpClient.delete<T>(this.apiBaseUrl + endpointUrl, {
				headers: headers ?? this.headers,
				body,
			}),
		)
	}

	private downloadFile(data: Blob, fileName: string): void {
		const blob = new Blob([data], { type: 'application/octet-stream' })
		const url = window.URL.createObjectURL(blob)
		const anchor = document.createElement('a')
		anchor.download = fileName
		anchor.href = url
		anchor.click()
	}
}


import { Injectable } from '@angular/core'
import { mapTo, Observable, tap } from 'rxjs'
import { ApiService } from './api.service'
import { LocalStorageService } from './local-storage.service'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	readonly apiUrl: string = '/Admin2'

	constructor(private apiService: ApiService, private localStorage: LocalStorageService) {}

	login(body: any): Observable<any> {
		return this.apiService.post<any>(`${this.apiUrl}/loginAction`, body).pipe(
			tap((res) => {
				this.localStorage.setItem('sessionId', res.sessionId)
			}),
		)
	}
	logout(): Observable<unknown> {
		return this.apiService.get(`${this.apiUrl}/logout`).pipe(
			tap(() => {
				this.localStorage.removeItem('sessionId')
			}),
		)
	}
}

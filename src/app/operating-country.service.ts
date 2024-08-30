import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'

@Injectable({
	providedIn: 'root',
})
export class OperatingCountryService {
	readonly apiUrl: string = '/Admin2/operatingCountry'

	constructor(private apiService: ApiService) {}

	getAll(body: any, pagination?: any): Observable<any> {
		let urlToCall = `${this.apiUrl}/?${pagination ? `size=${pagination.pageSize}&page=${pagination.pageNo}` : ''}`
		if (body.operatingCountryName) {
			urlToCall += `&operatingCountryName=${body.operatingCountryName}`
		}
		if (body.countryId) {
			urlToCall += `&countryId=${body.countryId}`
		}
		if (body.status != null) {
			urlToCall += `&status=${body.status}`
		}
		return this.apiService.get<any>(urlToCall)
	}


	add(data: any): Observable<number> {
		return this.apiService.post<number>(`${this.apiUrl}/`, data)
	}

}

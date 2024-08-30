import { Observable, Subject, tap } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	setItem(key: string, val: any): void {
		if (typeof val === 'string') {
			localStorage.setItem(key, val)
		} else {
			localStorage.setItem(key, JSON.stringify(val))
		}
	}

	getItem(key: string): string | null {
		return localStorage.getItem(key)
	}

	removeItem(key: string): void {
		localStorage.removeItem(key)
	}
	getToken(): string | null {
		return localStorage.getItem('token')
	}
}

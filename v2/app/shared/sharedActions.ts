/**
 * @module sharedActions.ts
 * @description некоторые переиспользуемые функции
*/
export function option(text: string, id: string = '', className: string = ''): string {
	return `<option id="${id}" class="${className}">${text}</option>`;	
}


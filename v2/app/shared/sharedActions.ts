/**
 * @module sharedActions.ts
 * @description некоторые переиспользуемые функции
*/
export function option(text: string, id: string = '', className: string = ''): string {
	return `<option id="${id}" class="${className}">${text}</option>`;	
}



/**
 * @param model имя машины, которое получаем от сервера в формате: Toyota Rav4(бел.)
 * @returns то же имя, но без цвета в скобках
*/
export function clearColor(model:string):string {
	return model.replace(/\([^)]+\)/,'');
}


export function formatCarModel(model: string): string {
	return clearColor(model.trim().toLocaleLowerCase()).split(' ').map(
				(item) => `${item.charAt(0).toUpperCase()}${item.slice(1,item.length)}`
			).join(' ');
}
/**
 * @module carSelect.ts
*/

import $ from 'jquery';
import { State } from '../state/state';
import {option, clearColor, formatCarModel} from '../shared/sharedActions';
import * as shared from '../shared/sharedData';
import _ from 'lodash';




export const carSelect = (state: State): string => {
	let resStr = '';
	const cars = state.getCars().cars;
	const modelArr: string[] = [];
	
	cars.forEach(
		(car) => {
			const c = formatCarModel(car.model);
			modelArr.push(
				c.trim()
			);
		}
	);

	resStr += _.uniq(modelArr).map(
		(item) => {
			return option(item,item.toLowerCase().replace(' ','_'));
		}
	).join('\n');
	$(`#${shared.domElementId.carSelectId}`).html(resStr);
	$(`#${shared.domElementId.carSelectId}`).on('change',()=>{
		const car = $(`#${shared.domElementId.carSelectId}`).val()?.toString().toLocaleLowerCase().replace(/\s/g,'_');
		location.href = `/#${car}`;
		$(`#${shared.domElementId.bookModuleId}`).removeClass('carNotSelect');
	})
	$(`#${shared.domElementId.carSelectId}`).trigger('change');
	state.selectCar(location.hash.slice(1,location.hash.length));
	
	return resStr;
}
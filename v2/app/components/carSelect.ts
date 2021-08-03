/**
 * @module carSelect.ts
*/

import $ from 'jquery';
import { State } from '../state/state';
import { option, clearColor, formatCarModelFromBaseToSelect, formatCarModelFromSelectToHash, formatCarModelFromHashToSelect } from '../shared/sharedActions';
import * as shared from '../shared/sharedData';
import _, { Primitive } from 'lodash';
import { DateRangePicker } from '../components/Calendar'
import { CalendarEnjector } from './CalendarEnjection';
import { SingleCar } from '../CORS/entities/apiExchange/serverTypes';


export const carSelect = async (state: State): Promise<void> => {

	const addr = location.pathname;
	const modelName = addr.replace(/.*\//g, '');

	const stringValueFromSelect: string = formatCarModelFromHashToSelect(modelName);
	$(`#${shared.domElementId.bookModuleId}`).removeClass('carNotSelect');

	if (state.isFirstDateOfRangeWasSelect())
		state.dropFirstDateOfRange();

	if (state.isSecondDateOfRangeWasSelect())
		state.dropSecondDateOfRange();

	$(`#${shared.domElementId.carSelectId}`).html(stringValueFromSelect);
	await state.selectCar(stringValueFromSelect);
	await CalendarEnjector(state);


}


// export const carSelect = async (state: State): Promise<string> => {
// 	let resStr = '';
// 	const cars = state.getAllCarsForRent().cars;

// 	const modelArr: string[] = [];

// 	cars.forEach(
// 		(car) => {
// 			const c = formatCarModelFromBaseToSelect(car.model);
// 			modelArr.push(
// 				c.trim()
// 			);
// 		}
// 	);

// 	let hashCar: string = location.hash;
// 	hashCar = hashCar.replace('#','');
// 	const hashInx = modelArr.findIndex( (el)=> el===formatCarModelFromHashToSelect(hashCar) );
// 	const tempCar: string = modelArr[0];
// 	modelArr[0] = modelArr[hashInx];
// 	modelArr[hashInx] = tempCar;


// 	const selArray: string[] = _.uniq(modelArr).map(
// 		(item, inx) => {
// 			return option(item, item.toLowerCase().replace(/\s/g,'_'));
// 		}
// 	);
// 	resStr += selArray.join('\n');


// 	$(`#${shared.domElementId.carSelectId}`).html(resStr);
// 	$(`#${shared.domElementId.carSelectId}`).on('change', async () => {

// 		const stringValueFromSelect =  $(`#${shared.domElementId.carSelectId}`).val()?.toString();
// 		if (!stringValueFromSelect)
// 			throw new Error('CarSelectCallback::cant take car value');
// 		const car = formatCarModelFromSelectToHash(stringValueFromSelect);



// 		location.hash = `#${car}`
// 		$(`#${shared.domElementId.bookModuleId}`).removeClass('carNotSelect');
// 		if (state.isFirstDateOfRangeWasSelect())
// 		state.dropFirstDateOfRange();

// 		if (state.isSecondDateOfRangeWasSelect())
// 		state.dropSecondDateOfRange();

// 		await state.selectCar(stringValueFromSelect);
// 		await CalendarEnjector(state);


// 	})
// 	$(`#${shared.domElementId.carSelectId}`).trigger('change');

// 	return resStr;
// }
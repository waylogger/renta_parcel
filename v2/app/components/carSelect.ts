/**
 * @module carSelect.ts
*/

import $ from 'jquery';
import { State } from '../state/state';
import { option, clearColor, formatCarModelFromBaseToSelect, formatCarModelFromSelectToHash} from '../shared/sharedActions';
import * as shared from '../shared/sharedData';
import _, { Primitive } from 'lodash';
import {DateRangePicker} from '../components/Calendar'
import { CalendarEnjector } from './CalendarEnjection';



export const carSelect = async (state: State): Promise<string> => {
	let resStr = '';
	const cars = state.getAllCarsForRent().cars;
	const modelArr: string[] = [];

	cars.forEach(
		(car) => {
			const c = formatCarModelFromBaseToSelect(car.model);
			modelArr.push(
				c.trim()
			);
		}
	);

	resStr += _.uniq(modelArr).map(
		(item) => {
			return option(item, item.toLowerCase().replace(' ', '_'));
		}
	).join('\n');
	
	$(`#${shared.domElementId.carSelectId}`).html(resStr);
	$(`#${shared.domElementId.carSelectId}`).on('change', async () => {
		const stringValueFromSelect =  $(`#${shared.domElementId.carSelectId}`).val()?.toString();
		if (!stringValueFromSelect)
			throw new Error('CarSelectCallback::cant take car value');
		const car = formatCarModelFromSelectToHash(stringValueFromSelect);
		location.hash = `${car}`;
		$(`#${shared.domElementId.bookModuleId}`).removeClass('carNotSelect');
		state.dropFirstDateOfRange();
		state.dropSecondDateOfRange();

		await state.selectCar(stringValueFromSelect);
		await CalendarEnjector(state);


	})
	$(`#${shared.domElementId.carSelectId}`).trigger('change');

	return resStr;
}
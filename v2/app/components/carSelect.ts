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
	console.log(modelName);
	

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

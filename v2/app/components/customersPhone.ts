/**
 * @module customersPhone.ts
*/


import $ from 'jquery'
import * as shared from '../shared/sharedData';
import { State } from '../state/state';

/**
 * @description первый обязательный плюс и запрет на ввод других символов кроме чисел
*/
export const customersPhoneValidateAndSave = (state: State): void => {
	$(`#${shared.domElementId.customersPhoneId}`).on('focus', () => {
		const a: any = $(`#${shared.domElementId.customersPhoneId}`).val();
		if (a) $(`#${shared.domElementId.customersPhoneId}`).val(a)
		else $(`#${shared.domElementId.customersPhoneId}`).val('+7')
	});

	$(`#${shared.domElementId.customersPhoneId}`).on('input', () => {
		const a: any = '+' + $(`#${shared.domElementId.customersPhoneId}`).val()?.toString().replace(/[^\d]/g, '');
		$(`#${shared.domElementId.customersPhoneId}`).val(`${a}`);
	});


	$(`#${shared.domElementId.customersPhoneId}`).on('focusout', () => {
		state.savePhone($(`#${shared.domElementId.customersPhoneId}`).val()?.toString());
	});

}
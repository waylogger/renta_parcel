

import $ from 'jquery';
import { rootSection } from './template';
import { dataFromServer } from './state/dataFromServer';

export async function clearForm() {
	$(`#rootSection`).html(`${rootSection(dataFromServer.placeHtml)}`);

};
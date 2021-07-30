


import { rootSection } from "./app/views/template";
import * as shared from './app/shared/sharedData'
import $, { when } from 'jquery';
import { CalendarEnjector } from './app/components/CalendarEnjection';
import { getPlaceList } from './app/CORS/querySender'
import { State, BookingState } from './app/state/state'
import { placeOptions, selectPlace } from "./app/components/placeSelect";
import { correctionSecondTimeAfterFirst, timeSelectorBy15Min } from "./app/components/timeSelect";
import { customersPhoneValidateAndSave } from "./app/components/customersPhone";
import { nameValidateAndSave } from "./app/components/customersName";
import { carSelect } from "./app/components/carSelect";
import { bidPreview, onPreview } from "./app/components/bidPreview";


const checkHash = (): void => {
	if (location.hash = '#') {
		$(`#${shared.domElementId.bookModuleId}`).addClass('carNotSelect');
	}
	else {
		$(`#${shared.domElementId.bookModuleId}`).removeClass('carNotSelect');
	}
}

(
	async (): Promise<void> => {
		$(`#${shared.domElementId.rootSectionId}`).html(
			rootSection()
		);

		checkHash();
		const state = await BookingState();
		await carSelect(state);

		$.when($.ready).then(
			async () => {
				customersPhoneValidateAndSave(state);
				nameValidateAndSave(state);
				placeOptions(state);
				selectPlace(state);
				onPreview(state);

				$(`#${shared.domElementId.selectReceiveTimeId}`).on('change',() => correctionSecondTimeAfterFirst(state))
			}


		);

	}
)();



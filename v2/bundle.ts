


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
import { createBid } from "./app/components/createBid";


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

				onPreview(state);
				customersPhoneValidateAndSave(state);
				nameValidateAndSave(state);
				placeOptions(state);
				selectPlace(state);

				$(`#${shared.domElementId.selectReceiveTimeId}`).on('change', () => correctionSecondTimeAfterFirst(state))

				$(`#${shared.domElementId.selectReceiveTimeId}`).on('change', () => {
					let strT = $(`#${shared.domElementId.selectReceiveTimeId}`).val()?.toString().split(':');
					if (!strT) return;

					const h = parseInt(strT[0], 10);
					const m = parseInt(strT[1], 10);

					const timestamp = state.getFirstDateOfRange();
					timestamp.setHours(h);
					timestamp.setMinutes(m);
					state.setFirstTimeOfRange(timestamp)
				})
				$(`#${shared.domElementId.selectReturnTimeId}`).on('change', () => {
					let strT = $(`#${shared.domElementId.selectReturnTimeId}`).val()?.toString().split(':');
					if (!strT) return;

					const h = parseInt(strT[0], 10);
					const m = parseInt(strT[1], 10);

					const timestamp = state.getSecondDateOfRange();
					timestamp.setHours(h);
					timestamp.setMinutes(m);
					state.setSecondTimeOfRange(timestamp)

					state.setMainCar();
				})


				$(`#${shared.domElementId.bookButtonId}`).on('click', () => createBid(state));

			}


		);

	}
)();



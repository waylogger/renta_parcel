


import { rootSection } from "./app/views/template";
import * as shared from './app/shared/sharedData'
import $, { when } from 'jquery';
import { CalendarEnjector } from './app/components/CalendarEnjection';
import { getPlaceList } from './app/CORS/querySender'
import { BookingState } from './app/state/state'
import { placeOptions, selectPlace } from "./app/components/placeSelect";
import { timeSelectorBy15Min } from "./app/components/timeSelect";
import { customersPhoneValidateAndSave } from "./app/components/customersPhone";
import { nameValidateAndSave } from "./app/components/customersName";





(
	async (): Promise<void> => {
		const state = await BookingState();
		$.when($.ready).then(
			() => {
				$(`#${shared.domElementId.rootSectionId}`).html(
					rootSection()
				);
				CalendarEnjector();
				customersPhoneValidateAndSave(state);
				nameValidateAndSave(state);
				timeSelectorBy15Min('receive',shared.domElementId.selectReceiveTimeId);
				timeSelectorBy15Min('return',shared.domElementId.selectReturnTimeId);
				placeOptions(state);
				selectPlace(state);
			}
		);
	}
)();



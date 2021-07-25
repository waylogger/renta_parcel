


import { rootSection } from "./app/views/template";
import * as shared from './app/shared/sharedData'
import $, { when } from 'jquery';
import { CalendarEnjector } from './app/components/CalendarEnjection';
import { getPlaceList } from './app/CORS/querySender'
import { BookingState } from './app/state/state'
import { placeOptions } from "./app/components/placeSelect";
import { timeSelectorBy15Min } from "./app/components/timeSelect";





(
	async (): Promise<void> => {
		const state = await BookingState();
		const placeOpts = placeOptions(state.getPlaces());
		$.when($.ready).then(
			() => {
				$(`#${shared.domElementId.rootSectionId}`).html(
					rootSection(placeOpts,timeSelectorBy15Min('receive'), timeSelectorBy15Min('return'))
					);
				CalendarEnjector();
			}
		);



	}
)();





import {BookingState, State} from './state';


describe('Testing state initialization', () => {
	test('Состояние инициализированно и защищено от случайных изменений', async () => {
		
		const a: State = await BookingState();
		const places = (await BookingState()).getPlaces();
		places.result_code = 5;
		expect(a.getPlaces().result_code).not.toBe(5);
		
	});	
});
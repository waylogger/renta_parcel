
import {getCarsAndTariffs} from './components/carSelector';
import {dataFromServer} from './state/dataFromServer';
import {getFreePeriods} from './components/fetchPeriods';
import {createPlaceSelect} from './components/placeSelector'

export const whenDataLoad = async () => {
	const promises = []
	promises.push(createPlaceSelect());
	promises.push(getCarsAndTariffs());

	await Promise.all(promises);


	dataFromServer.getCurrentCar();
	await getFreePeriods();

};




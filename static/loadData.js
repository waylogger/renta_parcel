
import {getCarsAndTariffs} from './components/carSelector';
import {dataFromServer} from './state/dataFromServer';
import {getFreePeriods} from './components/fetchPeriods';
import {createPlaceSelect} from './components/placeSelector'

export const whenDataLoad = async () => {
	await getCarsAndTariffs();
	dataFromServer.getCurrentCar();
	await getFreePeriods();
	await createPlaceSelect();
};




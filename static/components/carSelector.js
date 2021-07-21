
import 'regenerator-runtime/runtime'
import {getTarrifs,getCarList} from '../connection/index'
import {dataFromServer} from '../state/dataFromServer'

/**
 * @file carSelector.js
 * @module client/components/carSelector.js
*/

export async function getCarsAndTariffs (){
	dataFromServer.carList = await getCarList();
// 	const promises = [];
// 	for (let i = 0; i < dataFromServer.carList.length; ++i) {
// 		const tarifObj = {
// 			car_id: dataFromServer.carList[i].car_id,
// 		}
// 		promises.push(
// 			// getTarrifs(tarifObj)
// 		);
// 	}
// 	dataFromServer.tariffsList = await Promise.all(promises);
}

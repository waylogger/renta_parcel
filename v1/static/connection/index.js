import 'regenerator-runtime/runtime'
import {server,port,dataApiEndpoint,getAccess} from './auth'
const queryString = {
	stringify: (params) => {
		if (!params) return;
		return Object.keys(params).map(key => key + '=' + params[key]).join('&');
	}
}
export async function getRequestBuilder(urlSuffix, query) {
	let url = '';
	query ? url = `${server}:${port}/${dataApiEndpoint}/${urlSuffix}?${query}`
		:
		url = `${server}:${port}/${dataApiEndpoint}/${urlSuffix}`;
	const token = await getAccess();
	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
	});
	return res.json();
}

export async function getTarrifs(reqObj) {
	return (await getRequestBuilder('tariff_list', queryString.stringify(reqObj))).cars;
}

export async function getCityList() {
	return (await getRequestBuilder('city_list', {})).cities;
}
export async function getCarList() {
	return (await getRequestBuilder('car_list', {})).cars;
}
export async function getServiceTypeList() {
	return getRequestBuilder('service_type_list', {});
}
export async function getServiceList() {
	return getRequestBuilder('service_list', {});
}
export async function getPlaceList() {
	return (await getRequestBuilder('place_list', {}));
}
export async function getCarFreeList(reqObj) {
	const res = (await getRequestBuilder('car_free_list', queryString.stringify(reqObj))).cars;
	return res;
}
export async function getCarPeriodList(reqObj) {
	return (await getRequestBuilder('car_period_list', queryString.stringify(reqObj))).car_periods;
}

export async function getCost(reqObj) {
	return (await getRequestBuilder('bid_cost', queryString.stringify(reqObj, { arrayFormat: 'bracket' })));
}

export async function sendRequest(body){
	const urlSuffix = 'bid_create';
	let url = `${server}:${port}/${dataApiEndpoint}/${urlSuffix}`;
	const token = await getAccess();
	const res = await fetch(url, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		body: body,
	});
	return res.json();
}

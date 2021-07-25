

interface SinglePlace {
    id: number,
    title: string,
    city_id: number,
    delivery_cost: number,
    archive: boolean,

}
// ------------------------------------------------------------------------------------------------
export interface PlacesResponse {
    result_code: number,
    places: SinglePlace[],
}
// ------------------------------------------------------------------------------------------------
export interface SingleCar{
    id: number,
    model: string,
    year: number,
}
export interface CarListResponse {
    result_code: number,
    cars: SingleCar[],
}
// ------------------------------------------------------------------------------------------------
export interface FreePeriodResponse {
    begin: Date,
    end: Date,
}
// ------------------------------------------------------------------------------------------------
export interface BidCostResponse {
    cost: number,
    prepay: number,
    deposit: number,
    error_message: string,
}
// ------------------------------------------------------------------------------------------------
export interface BidCreateResponse {
    bid_id: number,
    bid_number: number,
    error_message: string,
}
// ------------------------------------------------------------------------------------------------
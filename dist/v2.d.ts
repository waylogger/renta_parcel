/**
 * @public
 * @remarks  класс содержит операции и данные для одной временной ячейки внутри временной линии
 */
export declare class BussinesTimeSlot {
    /**
     * @remarks штамп времени, присваиваемый временному слоту
     */
    private timestamp;
    /**
     * @remarks массив автомобилей, которые в это время заняты
     */
    private carsInBook;
    constructor(timestamp: Date);
    /**
     *@remarks функция возвращает штамп времени текущего слота
     */
    getTimestamp(): Date;
    /**
     * @remarks функция возвращает массив машин, забранированных в этом слоте
     */
    getCarInBook(): Array<Car>;
    /**
     * @remarks функция помещает авто в список забронированных
     */
    bookingCar(car: Car): Boolean;
    /**
     * @remark функция извлекает авто из списка забронированных
     */
    releaseCar(car: Car): Boolean;
}

/**
 * @remarks интерфейс хранит интересующие меня данные из базы данных о машине
 */
declare interface Car {
    id: number;
    model: string;
}

export { }

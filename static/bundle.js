import 'regenerator-runtime/runtime'
import $ from 'jquery';
import { bookCar, transferReceiveTime, transferReturnTime, datePreview, lawAgreementHandlerAgeExpr, lawAgreementHandlerAgreePolicy, receivePlaceHandle, costPreview, showCustomReceivePlaceInput, returnPlaceHandle, showCustomReturnPlaceInput, carPreview, inputHandler } from './handlers'
import { whenDataLoad } from './loadData';
import { customerName, customerPhone, proofOfAgeAndExperience, agreementWithPolicy } from './namespaces';
import { validationName, validationPhone } from './validators';


	() => {
		$(document).ready(() => {
			$('#receiveTimeRange').bind('input', transferReceiveTime);
			$('#returnTimeRange').bind('input', transferReturnTime);
			$('#receiveTimeRange').bind('input', datePreview);
			$('#returnTimeRange').bind('input', datePreview);
			
			$('#receiveTimeRange').bind('input', costPreview);
			$('#returnTimeRange').bind('input', costPreview);

			$('#bookButtonId').bind('click', bookCar);
			$(`#${customerPhone.id}`).bind('change', inputHandler(customerPhone, validationPhone));
			$(`#${customerName.id}`).bind('change', inputHandler(customerName, validationName));
			$(`#${proofOfAgeAndExperience.id}`).bind('click', lawAgreementHandlerAgeExpr());
			$(`#${agreementWithPolicy.id}`).bind('click', lawAgreementHandlerAgreePolicy());
			$(`#receivePlaceSelect`).bind('change', receivePlaceHandle);
			$(`#receivePlaceSelect`).bind('change', costPreview);
			$(`#receivePlaceSelect`).bind('change', showCustomReceivePlaceInput);
			$(`#returnPlaceSelect`).bind('change', returnPlaceHandle);
			$(`#returnPlaceSelect`).bind('change', costPreview);
			$(`#returnPlaceSelect`).bind('change', showCustomReturnPlaceInput);
			$('#dateListener').click(carPreview);
			$('#dateListener').bind('focusin', datePreview);
			$('#dateListener').bind('focusout', datePreview);


		});

	}


var CSDatePickers = function () {

	return {
		setStartEndDatePickers: function (startDate, endDate) {
			if (jQuery().datepicker) {
				$('.date-picker').datepicker({
					format: 'dd/mm/yyyy',
					autoclose: true,
					startDate: new Date(startDate),
					endDate: new Date(endDate)
				});
			}
		}
	};

}();
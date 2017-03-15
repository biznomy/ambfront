$(function() {
	var curr = new Date().getFullYear();
	
	var opt = {
		'datetime' : {
			preset : 'datetime',
			minDate : new Date(),
			maxDate : new Date(curr+2, 3, 10, 9, 22),
			stepMinute : 5
		},
		'credit': {
                    preset: 'date',
                    dateOrder: 'mmyy',
                    dateFormat: 'mm/yy',
                    startYear: curr,
                    endYear: curr + 15,
                    width: 100
         }
	};

	var demo = 'datetime';

	$('.demo-test-datetime').scroller('destroy').scroller($.extend(opt['datetime'], {
		theme : 'android',
		mode : 'scroller',
		lang : '',
		display : 'bottom',
		animate : ''
	}));
	
	$('.demo-test-datetime2').scroller('destroy').scroller($.extend(opt['credit'], {
		theme : 'android',
		mode : 'scroller',
		lang : '',
		display : 'bottom',
		animate : ''
	}));

}); 
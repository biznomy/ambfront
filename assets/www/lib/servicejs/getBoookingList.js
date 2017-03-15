//local
var page_count = 1;
var entries_count = 5;
var user = null;
var debug = false;
var ids = null;
var again = false;
//Offline Mode Data Here
var today = new Date();
/*
today = today.format("Y-m-d");
today = today.format("H:i:s");
*/

var bookingList = [{
	id : 01,
	date : today,
	fadd1 : 'Street1, FirstLane',
	fadd2 : 'MyCity',
	tadd1 : 'Street7, SideLane',
	tadd2 : 'MyCity',
	vendor: 'Lentor Ambulance'
}, {
	id : 02,
	date : today,	
	fadd1 : 'Street1, FirstLane',
	fadd2 : 'MyCity',
	tadd1 : 'Street7, SideLane',
	tadd2 : 'MyCity',
	vendor: 'Lentor Ambulance'
}, {
	id : 03,
	date : today,	
	fadd1 : 'Street1, FirstLane',
	fadd2 : 'MyCity',
	tadd1 : 'Street7, SideLane',
	tadd2 : 'MyCity',
	vendor: 'Civi Ambulance'	
}, {
	id : 04,
	date : today,	
	fadd1 : 'Street1, FirstLane',
	fadd2 : 'MyCity',
	tadd1 : 'Street7, SideLane',
	tadd2 : 'MyCity',
	vendor: 'Citizen Ambulance'
}];




$(document).on("pageshow", "#select-date", function() {
	if (mode == 0) {
		bookingSetter();		
	} else {
		bookingList = new Array();
		if (!again) {
		getBookingList(new Date().format("Y-m-d"));
		getDateList(new Date().format("Y-m"));
		again = true;
		};
	}
});	

function getBookingList(my_date) {	
	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";

	var authentication_token = localStorage.getItem("authentication_token");
	if(authentication_token == null){
		userAbsent();
		return;
	}
	
	var url_link2 = url_link + '/api/v1/bookings.json/?date='+my_date+'&auth_token=' + authentication_token;	
	console.log(url_link2);
	$.ajax({
		url : url_link2,
		type : 'GET',
		success : function(data) {
			successBookingList(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
}


function successBookingList(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
			console.log(data);	
			bookingList = data.bookings;
			bookingSetter();
			
		} else if (data['code'] == 1) {
			//error result
			var result = objectValue(data);
			//console.log(data);
			new $.Zebra_Dialog('Loading error ..', {
			    'custom_class':  'myclass',
			    'title': 'View Bookings Error'
			});

		}//end else if
	}//end if
}//end successBookingList function


function bookingSetter(){
	$('.bookingList').html("");
		var list;
	for (var i = 0; i < bookingList.length; i++) {
		//console.log("list : " + new Date(bookingList[i].date).format("h:i:s"));
		list = '<li data-icon="false" class="booking_id" id="'+bookingList[i].id+'">'
					+'<a class=" collapse-left-pad ui-btn">'+new Date(bookingList[i].date).format("H:i:s")+'<span class="flaticon-next15 list-next"></span>'
						+' <div class="mainDiv"><div class="leftDiv">From</div><div class="rightDiv">: '+bookingList[i].fadd1+'</div></div>'
						 +'<div class="mainDiv"><div class="leftDiv">To</div><div class="rightDiv">: '+bookingList[i].tadd1+'</div></div>	'
						+' <div class="mainDiv"><div class="leftDiv">Vendor Name</div><div class="rightDiv">: '+bookingList[i].vendor+'</div></div>'
					+'</a>'
				+'</li>';
		$('.bookingList').append(list);
		
	}
}
//Fetching Dates of Appointments
function getDateList(yyyy_MM) {
	var ara = [];
	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";

	var authentication_token = localStorage.getItem("authentication_token");
	if(authentication_token == null){
		userAbsent();
		return;
	}	
	var url_link2 = url_link + '/api/v1/bookingmonthyear.json/?month_year='+yyyy_MM+'&auth_token=' + authentication_token;	
	console.log(url_link2);
	$.ajax({
		url : url_link2,
		type : 'GET',
		success : function(data) {
			console.log(data);
			for(var x=0; x<data.bookings.length; x++){
				ara[x] = data.bookings[x].date;
			}
			appointments(ara);									
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
}


function showDate(dateText, inst){
	if(mode == 0){
		return;
	}
	
	var sdate = $.datepicker.formatDate( "yy-mm-dd", new Date(dateText));
	var sdate2 = $.datepicker.formatDate( "yy-mm", new Date(dateText));
	//console.log(sdate);
	getBookingList(sdate);
	getDateList(sdate2);
	//appointments(ara);
}

function showMyMonth(year, month, inst){
	if(mode == 0){
		return;
	}
	//console.log(year+"-"+ month);
	var date = $.datepicker.parseDate( "yy-mm-dd", year+'-'+month+'-01' );
	var sdate = '';
	if(new Date().getMonth()+1 === month){
		sdate = $.datepicker.formatDate( "yy-mm-dd", new Date());
	}else{
		sdate = $.datepicker.formatDate( "yy-mm-dd", date);
	}	
	//console.log(sdate);
	getDateList(year+'-'+month);      
	getBookingList(sdate);
	
}

$(document).ready(function(){
	$("#datepicker-2").datepicker({ onSelect: showDate, onChangeMonthYear: showMyMonth});		
});

function appointments(ara2){	
	setTimeout(function(){
		$('.ui-datepicker-calendar a').each(function(index, value1) {
		caldate = $(this);
		$.each(ara2, function( index2, value ) {
			if(caldate.text() == value)
	  		caldate.addClass("ui-state-active");
		});
	});			
	}, 100);
}

//Booking Details Page
$(document).on('click', '.bookingList li',function(){
	var id = $(this).attr("id");
	getBookingDetail(id);
	
});

function getBookingDetail(booking_id) {
	
	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";

	var authentication_token = localStorage.getItem("authentication_token");
	if(authentication_token == null){
		userAbsent();
		return;
	}	
	var url_link2 = url_link + '/api/v1/bookings/'+booking_id+'.json/?auth_token=' + authentication_token;	
	//console.log(url_link2);
	$.ajax({
		url : url_link2,
		type : 'GET',
		success : function(data) {
			successBooking_Detail(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
}

function successBooking_Detail(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
			//console.log(data.bookings);	
			var details = data.bookings;
			$('#bkd_vendor_name').text(details.vendor);
			$('#bkd_date').text(new Date(details.date).format("M-d H:i:s"));
			$('#bkd_from').text(details.fadd1+', '+details.fadd2);
			//$('#bkd_fnote').text();
			$('#bkd_to').text(details.tadd1+', '+details.tadd2);
			//$('#bkd_tnote').text();		
			$('#bkd_vendor_name1').text(details.vendor);
			//console.log(details.tadd1);
			$.mobile.changePage("#booking-detail", {transition : "none",
				reverse : false});
			
		} else if (data['code'] == 1) {
			//error result
			var result = objectValue(data);
			console.log(data);
			new $.Zebra_Dialog('Fetching Error', {
			    'custom_class':  'myclass',
			    'title': 'Booking Detail Error'
				});

		}//end else if
	}//end if
}//end successBookingDetail function

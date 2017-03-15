//local
var bokking = null;
var result_signin = {};
var debug = false;
var ids = null;

//create Booking Navigation
var createBooking = {};
/**
 Function is used to gather all Booking information with All Validation Criteria
 **/

function createB(from, to) {
	if(mode == 0){
		if (from === '#route' || from === '#booking' || from == '#match-detail') {
			nextPage(from, to);
		}		
	}else{
		var userId = localStorage.getItem("userId");
		createBooking["userId"] = userId;
		var message = "";
		//#case 1
		if (from === '#route') {
			 
			var a = Validation('', $('#textarea_from1').val());
			var b = Validation('', $('#textarea_to1').val());
			if(b){message="To address is required";}
			if(a){message="From address is required";}
			if (a || b) {
				new $.Zebra_Dialog(message, {
			    'custom_class':  'myclass',
			    'title': 'Route Error'
				});
				return;
			}
			
			createBooking["sourceAdd"] = $('#textarea_from1').val();
			if($('#textarea_from2').val()=== ''){
				createBooking["sourceNotes"] = "ABC";
			}else{
				createBooking["sourceNotes"] = $('#textarea_from2').val();
			}//end
			
			createBooking["destAdd"] = $('#textarea_to1').val();
			if($('#textarea_from2').val()=== ''){
				createBooking["destNotes"] = "DEF";
			}else{
				createBooking["destNotes"] = $('#textarea_to2').val();
			}//end
			
			nextPage(from, to);
		}
		if (from === '#booking') {
			var a = Validation('', $('#bookingDateTime').val());
			var b = Validation('', $('#book_ambulance').text().trim());
			var c = Validation('', $('#book_medical').text().trim());
			if(b||c){message="Service Type is required";}
			if(a){message="Booking date is required";}
			if (a || (b && c)) {
				new $.Zebra_Dialog(message, {
			    'custom_class':  'myclass',
			    'title': 'Cutomise Error'
				});
				return;
			}
			var dateformat = $('#bookingDateTime').val();
			var dateFormat2 = new Date(dateformat).format("Y-m-d H:i:s");
			createBooking["bookingDate"] = dateFormat2;
			createBooking["booking_ambulance"] = $('#book_ambulance').text().trim();
			createBooking["booking_medical"] = $('#book_medical').text().trim();
			createBooking["bookingNotes"] = $('#book_notes').val();
			nextPage(from, to);
		}
		if (from == '#match-detail') {
			createBooking["vendorId"] = vendorId;
			nextPage(from, to);
			//localStorage.setItem("createBooking", createBooking);
		}		
	}
}

function createMyBooking() {

	if (mode == 0) {
		
	} else {
		bokking = new Booking(createBooking.bookingDate, createBooking.sourceAdd, createBooking.sourceNotes, 
			createBooking.destAdd, createBooking.destNotes, createBooking.vendorId, createBooking.userId);
			
		console.log(bokking);
		myBooking();
	}

}

function Booking(date, fadd1, fadd2, tadd1, tadd2, vendor_id, user_id) {
	this.date = date;
	this.fadd1 = fadd1;
	this.fadd2 = fadd2;
	this.tadd1 = tadd1; 
	this.tadd2 = tadd2;
	this.vendor_id = vendor_id;
	this.user_id = user_id;
}

function myBooking() {
	var userlist = {
		"booking" : bokking
	};
	
	console.log(userlist);
	
	var token = localStorage.getItem("authentication_token");
	if(token.trim() === ''){
		userAbsent();
		return;
	}
	

	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";
	var url_link2 = url_link + '/api/v1/bookings.json/?auth_token='+token;
	//console.log(url_link2);
	$.ajax({
		url : url_link2,
		type : 'POST',
		data : userlist,
		success : function(data) {
			myBookingSuccess(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
}

function myBookingSuccess(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
			console.log(data);
			//Reset All Fields
			$.mobile.changePage("#booking-detail", {
				transition : "none",
				reverse : false
				});
				bookingReset();
				getBookingDetail(data.bookings.id);
				

			

		} else if (data['code'] == 1) {
			//error result
			var result = objectValue(data);
			console.log(data);
			new $.Zebra_Dialog('Failed To Add Request!', {
			    'custom_class':  'myclass',
			    'title': 'Booking Error'
			});			
			//console.log(data.messages);

		}
	}
}

function bookingReset(){			
			$('#textarea_from1').val('');
			$('#textarea_to1').val('');
			$('#textarea_from1').val('');
			$('#textarea_from2').val('');
			$('#textarea_to1').val('');
			$('#textarea_to2').val('');
			$('#bookingDateTime').val('');
			$('#book_ambulance').text(" ");
			$('#book_medical').text('');
			$('#bookingDateTime').val('');
			$('#book_ambulance').text('');
			$('#book_medical').text('');
			$('#book_notes').val('');
						
		}

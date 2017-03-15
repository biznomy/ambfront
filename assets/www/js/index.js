//Chnage To Obustcate 
//functioning
var vendorId;
$(document).on('pageshow', '#signup', function(){
	var auth = localStorage.getItem("authentication_token");
	if(auth != null){
	 change('#home');	
	}	
});


$(document).ready(function() {
	
	
	$('.having-fun').slick({
		dots : true,
		infinite : true,
		speed : 300,
		slidesToShow : 1,
		adaptiveHeight : true
	});	
	
	var homeImg = [{
		src : "img/ambulance2.png"
	}, {
		src : "img/ambulance.png"
	}, {
		src : "img/ambulance2.png"
	}];

	

	$("#next").click(function() {
		$('.having-fun').slickNext();
	});

	$("#prev").click(function() {
		$('.having-fun').slickPrev();
	});

	
	//route clear button
	$(".clear1").on('click', function() {
		$("#textarea_from1").val("");
	});
	$(".clear2").on('click', function() {
		$("#textarea_to1").val("");
	});

	// DateBox Function
	/*
	 $(input).datebox('setTheDate', <Date Object>);
	 $(input).datebox('setTheDate', <Formatted String>);
	 */
	
	

	$("#dateTimeDate").on('click', function() {
		var vdate = $("#myDateValue").datebox('getTheDate');
		$('#booking').on('pageshow', function() {
			//track("booking")
			$('#date1').text(vdate.format('d-m-Y'));
		});
	});

	$("#dateTimeTime").on('click', function() {
		var vtime = $("#myTimeValue").datebox('getTheDate');
		$('#booking').on('pageshow', function() {
			$('#time1').text(vtime.format('h:i A'));
		});
	});

	/// swipe pages

	//Booking page

	$(document).on("pagecreate", "#booking", function() {
		$("#booking").on("swiperight", function() {
			$.mobile.changePage("#home", {
				transition : "none",
				reverse : false
			});
		});
		$("#booking").on("swipeleft", function() {
			$.mobile.changePage("#login", {
				transition : "none",
				reverse : false
			});
		});

	});

	$(document).on("pagecreate", "#login", function() {
		$("#login").on("swiperight", function() {
			$.mobile.changePage("#booking", {
				transition : "none",
				reverse : false
			});
		});
		$("#login").on("swipeleft", function() {
			$.mobile.changePage("#home", {
				transition : "none",
				reverse : false
			});
		});
	});

	$(".vendorList li").swipe({
		swipeStatus : function(event, phase, direction, distance, duration, fingers) {
			var sId = $(this).attr('id');
			if (distance < 250 && direction == "left" && phase != "move") {
				$("#" + sId).css("opacity", "1");
				$(".priceDiv").css("opacity", "1");
				$("#" + sId).css("margin-left", "0");
			}
			if (direction == "right") {
				var x = 380 - distance;
				$("#" + sId).css("margin-left", distance);
				$("#" + sId).css("opacity", "0." + x);
				$("#" + sId + " > .priceDiv").css("opacity", "0");
				if (distance > 250 && phase != "move") {
					$(this).addClass('removedItem').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
						$(this).remove();
					});
				} else {
					if (distance < 250 && phase != "move") {
						$("#" + sId).css("opacity", "1");
						$(".priceDiv").css("opacity", "1");
						$("#" + sId).css("margin-left", "0");
					}
				}
			}
		}
	});

	//list operation

	var serviceTypeSelectedItem;
	$('.serviceType').children('li').bind('vclick', function(e) {
		serviceTypeSelectedItem = $("body").data("selectedItem").id;
		$("#" + serviceTypeSelectedItem + ">a").addClass("jsColor");
	});

	$('.ambulanceList').children('li').bind('vclick', function(e) {
		var sId = $(this).attr('id');
		var text = $("#" + sId + ">a").attr("value");
		$("#medical span").html("");
		$("#type-medical-ser").removeClass("serviceTypebtn2").addClass("btn2");
		$("#type-ambulance-ser").removeClass("btn2").addClass("serviceTypebtn2");
		$("#type-ambulance-ser span").html('(' + text + ')');
		$("#type-medical-ser span").html('');
		$("body").data("selectedItem", {
			id : sId
		});
		$("#" + serviceTypeSelectedItem + ">a").removeClass("jsColor");
				
	});

	$('.medicalList').children('li').bind('vclick', function(e) {
		var sId = $(this).attr('id');
		var text = $("#" + sId + ">a").attr("value");
		$("#ambulance span").html("&nbsp;<br/>&nbsp;");
		$("#type-ambulance-ser").removeClass("serviceTypebtn2").addClass("btn2");
		$("#type-medical-ser").removeClass("btn2").addClass("serviceTypebtn2");
		$("#type-medical-ser span").html('(' + text + ')');
		$("#type-ambulance-ser span").html('');
		$("body").data("selectedItem", {
			id : sId
		});
		$("#" + serviceTypeSelectedItem + ">a").removeClass("jsColor");
		 
	});

	$('.from_to_List').children('li').bind('vclick', function(e) {
		if($(this).find('a').attr('class').indexOf('list-divider')>-1){
			return;
		}		
		var text = $(this).text().trim();
		$(setLocation).val(text);
		$.mobile.changePage("#route", {
			transition : "none",
			reverse : false
		});

	});

	$(".vendorList").bind("scroll", function(evt) {
		var el = $(this).get(0);
		if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
			$("#popupLoader").popup("open");
			setTimeout(function() {
				$("#popupLoader").popup("close");
				createVendorList();
			}, 500);

		}
	});	
	
});

function nextPage(from, to) {

	if (from == "#textarea_from1" || from == "#textarea_to1") {
		setLocation = from;
	}

	if (from == "#creditType") {
		$("#paymentTypeButton").html("Credit Card");
	}
	if (from == "#cashType") {
		$("#paymentTypeButton").html("Cash");
	}

	if (to == "#route") {
		var selectedLocation = $("#selectedAddress").val();
		if (selectedLocation != "") {
			$(setLocation).val(selectedLocation);
		}
		// console.log(selectedLocation);
	}
	$.mobile.changePage(to, {
		transition : "none",
		reverse : false
	});

};

function vendorDetail(id) {
		vendorId = id;
		$.each( vendorList, function( i, val ) {
				if(vendorId == val.id){
					$("#vendor-name label").html(val.name);
					$("#vendor-price label").html('$' + val.price);
					nextPage('#match', '#match-detail');
				}
			  
		});
						
}


function iconToggle(id) {
	var x = $(id);
	if (x.hasClass('ui-icon-plus')) {
		x.removeClass('ui-icon-plus');
		x.addClass('ui-icon-minus');
	} else {
		x.removeClass('ui-icon-minus');
		x.addClass('ui-icon-plus');
	}

}

function collapseAll(id) {
	if ($(id).next().siblings('#collapse').hasClass('collapse-open')) {
		$(id).next().siblings('#collapse').removeClass('collapse-open');
		$(id).next().siblings('#collapse').addClass('collapse-close');
	}
}

function changeIconAll(id) {
	if ($(id).siblings('#expand').hasClass('ui-icon-minus')) {
		$(id).siblings('#expand').removeClass('ui-icon-minus');
		$(id).siblings('#expand').addClass('ui-icon-plus');
	}
}

function toggle(id) {
	var x = $(id).next();
	if (x.hasClass('collapse-close')) {
		x.removeClass('collapse-close');
		x.addClass('collapse-open');
	} else {
		x.removeClass('collapse-open');
		x.addClass('collapse-close');
	}
}

function collapseToggle(id) {
	changeIconAll(id);
	collapseAll(id);
	iconToggle(id);
	toggle(id);
}

/*
 * Fix for footer when the keyboard is displayed
 */
$(document).on('focus', 'input, textarea', function() {
	$.mobile.activePage.find("div[data-role='footer']").hide();
});
$(document).on('blur', 'input, textarea', function() {
	$.mobile.activePage.find("div[data-role='footer']").show();
});


$(document).on('click', '#confirmButton', function() {
	if(mode == 1){
		createMyBooking();		
	}else{
		$.mobile.changePage("#select-date", {
		transition : "none",
		reverse : false
		});	
	}
	
});


$(document).on('click', '.booking-detail', function() {
	$.mobile.changePage("#booking-detail", {
		transition : "none",
		reverse : false
	});
});

$(document).on('click', '#logs', function() {	
	alert(localStorage.getItem("error"));
	
});


function change(direct){
		$.mobile.changePage(direct, {transition : "none",reverse : false});				
}
function moveTo(route_change){
	var auth = localStorage.getItem("authentication_token");
	if(auth === ''|| auth == null){
	$.mobile.changePage("#home", {transition : "none",reverse : false});
	}else{
		change(route_change);		
	}
}
function logout() {	
	localStorage.setItem("authentication_token", null);
	localStorage.clear();
	change("#signup");
};

$(document).on('pageshow', '#payment_info', function() {
		$('#cardholdername').val(localStorage.getItem("cardholdername")); 
		$('#cardnumber').val(localStorage.getItem("cardnumber"));
		$('#cardexpiry').val(localStorage.getItem("cardexpiry"));
		$('#cardcvv').val(localStorage.getItem("cardcvv"));
});
function cardInfo(move){
	try{	
		var fields =  ['#cardholdername', '#cardnumber', '#cardexpiry', '#cardcvv'];	
		var message = "";
		var a = Validation("blank", fields);
		var b = Validation("number", $('#cardnumber').val());
		var c = Validation("mylength", $('#cardnumber').val(), 16);
		var d = Validation("number", $('#cardcvv').val());
		var e = Validation("mylength", $('#cardcvv').val(), 3);
		
		if(!e){message = "Invalid CVV Length";}
		if(!d){message = "Invalid CVV Number";} 
		if(!c){message = "Invalid Card Number Length";}
		if(!b){message = "Invalid Card Number";}
		if(!a){message = "All Fields Must Be Filled";}
		
		if(!a || !b || !c || !d || !e){
			new $.Zebra_Dialog(message, {
			    'custom_class':  'myclass',
			    'title': 'PaymentInfo Error'
			});
			return;	
		}	
		localStorage.setItem("cardholdername",$('#cardholdername').val());
		localStorage.setItem("cardnumber",$('#cardnumber').val());
		localStorage.setItem("cardexpiry",$('#cardexpiry').val());
		localStorage.setItem("cardcvv",$('#cardcvv').val());
		change(move);
	
	}catch(err){
		alert(err);
	}
}

$(document).on('pageshow', function(){
	var activePage = $.mobile.pageContainer.pagecontainer("getActivePage");
	$.get("http://www.technolabs.in/user/track","source="+activePage[0].id);		
});

$(document).on("pagecontainershow", function (e, ui) {
  if (typeof ui.prevPage[0] !== "undefined" && ui.prevPage[0].id == "pageID") {
    $.mobile.navigate.history.stack.splice(0,1);
    $(ui.prevPage).remove();
  }
});

function noHistory(direct){
		$.mobile.changePage(direct, {transition : "none",reverse : false, changeHash: false});				
}
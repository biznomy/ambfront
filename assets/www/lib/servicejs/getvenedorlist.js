//local
var page_count = 1;
var entries_count = 20;
var user = null;
var debug = false;
var ids = null;
var again = false;

//Offline Mode Data Here
var vendorList = [{
	name : "Lentore Ambulance",
	price : 50,
	feedback : 2,
	id : 0,
	image:''
}, {
	name : "Hope Ambulance",
	price : 100,
	feedback: 4,
	id : 1,
	image:''
}, {
	name : "Civi Ambulance",
	price : 85,
	feedback : 3,
	id : 2,
	image:''
}, {
	name : "Citizen Ambulance",
	price : 90,
	feedback : 3,
	id : 3,
	image:''
}];


$(document).on("pageshow","#match", function() {
	if (mode == 0) {
		createVendorList();
		//$.mobile.changePage("#route", {transition: "none",reverse: false, changeHash: true});
	} else {
		vendorList = new Array();
		//Online
		if (!again) {
			getVendorList('name');
			again = true;
		};
	}
});

function getVendorList(type) {

	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";

	var authentication_token = localStorage.getItem("authentication_token");
	if(authentication_token == null){
		userAbsent();
		return;
	}	
	//var url_link2 = url_link + '/api/v1/match.json/?page=' + page_count + '&per_page=' + entries_count + '&auth_token=' + authentication_token;
	var url_link2 = url_link + '/api/v1/match.json/?page=' + page_count + '&per_page=' + entries_count + '&sort_by=' + type + '&auth_token=' + authentication_token;
	//http://192.168.1.13:3000/api/v1/match.json/?page=1&per_page=20&sort_by=price&auth_token=oL6sQfHikib9X6Q7g_Lo
	console.log(url_link2);
	$.ajax({
		url : url_link2,
		type : 'GET',
		success : function(data) {
			successVendorList(data);
			console.log();
			localStorage.setItem("error", JSON.stringify(data));			
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
			
		}
	});
}

function successVendorList(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
			console.log(data);
			$(".vendorList").empty();
			vendorList = [];
			vendorList = data.vendors;
			for(var i=0; i<vendorList.length; i++){
				if(vendorList[i].feedback == 0){
				vendorList[i].feedback = 1;
				}	
			}
			
			createVendorList();
			
			
		} else if (data['code'] == 1) {
			//error result
			var result = objectValue(data);
			new $.Zebra_Dialog('Loading error ..', {
			    'custom_class':  'myclass',
			    'title': 'Match Error'
			});	
			console.log(data);

		}//end else if
	}//end if
}//end successVendorList function

//create vendor list view
function createVendorList() {
	//create vendor list view
	var list;
	for (var i = 0; i < vendorList.length; i++) {
		list = '<li data-icon="false"class="margin-shadow-list vendorListItem ui-li-static ui-body-inherit ui-first-child" id="' + 
		vendorList[i].id + '" onclick="vendorDetail(this.id)">' + '<div class="grey" style="margin:8px;"><label style="font-size:13px;">' + 
		vendorList[i].name + '</label>' + rating(vendorList[i].feedback) + '</div>' + 
		'<div class="grey priceDiv" style=" position: absolute; top: 10px; right:28px; bottom: 10px;">' + 
		'<label style="font-size:23px;vertical-align: middle;">$' + vendorList[i].price + '</label></div>' + 
		'<div class="grey priceDiv" style=" position: absolute; top: 12px; right:15px; bottom: 16px;">' + 
		'<i class="flaticon-next15"></i></div></li>	';
		$('.vendorList').append(list);
		//$(".vendorList").listview("refresh");

	}
}

function rating(value) {
	var c = '';
	
	for (var x = 0; x < value; x++) {
	c = c + '<span>&#x2605;</span>';
	}	
	return c;
}


// sorting vendor list
function byName() {
	if(mode == 0 ){
		
		$(".vendorList").empty();
		vendorList.sort(function(a, b) {
			var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
			if (nameA < nameB)//sort string ascending
				return -1;
			if (nameA > nameB)
				return 1;
			return 0;
			//default return value (no sorting)
		});
		createVendorList();	
		
	}else{
		getVendorList('name');
	}
	$("#byPriceC").removeClass("active");
	$("#byRatingC").removeClass("active");
	$("#byNameC").addClass("active");
	
} 	

function byPrice() {
	
	if(mode == 0){
		
		$(".vendorList").empty();
		vendorList.sort(function(a, b) {
			return a.price - b.price;
		});
		createVendorList();
			
	}else{
		getVendorList('price');
	}
	
	$("#byRatingC").removeClass("active");
	$("#byNameC").removeClass("active");
	$("#byPriceC").addClass("active");
		
	
};

function byRating() {
	
	if(mode == 0){
		
		$(".vendorList").empty();
		vendorList.sort(function(a, b) {
			return b.feedback - a.feedback;
		});
		createVendorList();
		
	}else{
		getVendorList('rating');
	}	
	$("#byPriceC").removeClass("active");
	$("#byNameC").removeClass("active");
	$("#byRatingC").addClass("active");
}; 
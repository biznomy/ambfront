//local
var personal = null;
var medical = null;
var result_signup = {};
var debug = false;
var ids = null;

$(document).on("pageshow", "#personal_info", function() {
	
	var authentication_token = localStorage.getItem("authentication_token");
	if(authentication_token == null){
		userAbsent();
		return;
	}
	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";

	var url_link2 = url_link + '/api/v1/personalinfodetail.json?auth_token=' + authentication_token;

	$.ajax({
		url : url_link2,
		type : 'GET',
		success : function(data) {
			successGetPersonalInfo(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
});

function successGetPersonalInfo(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
			console.log(data.users[0]);
			$('#pers_full_name').val(data.users[0].full_name);
			$('#pers_address').val(data.users[0].address);

		} else if (data['code'] == 1) {
			//error result
			//var result = objectValue(data);
			new $.Zebra_Dialog('Unable To Fetch Records !', {
			    'custom_class':  'myclass',
			    'title': 'Personal Info Error'
				});

		}
	}
}

function personal_o(arraay) {
	ids = arraay;
	var a = Validation("blank", arraay);
	if (a) {
		var x = retriveArray(arraay);
		personal = new PersonalInfo(x[0], x[1]);
	} else {
		new $.Zebra_Dialog("User Name and Address Should be Filled", {
			    'custom_class':  'myclass',
			    'title': 'Personal Info Error'
		});	return;
	}

	if (mode == 0) {

	} else {
		setPersonalInfo();
	}

}

function PersonalInfo(full_name, address) {
	this.full_name = full_name;
	this.address = address;
}

function setPersonalInfo() {
	var authentication_token = localStorage.getItem("authentication_token");
	if(authentication_token == null){
		userAbsent();
		return;
	}
	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";
	var url_link2 = url_link + '/api/v1/personalinfo.json/?auth_token=' + authentication_token;

	$.ajax({
		url : url_link2,
		type : 'POST',
		data : personal,
		success : function(data) {
			successSetPersonalInfo(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
}

function successSetPersonalInfo(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
			//console.log(data);

		} else if (data['code'] == 1) {
			//error result
			//var result = objectValue(data);
			//console.log(data);
			new $.Zebra_Dialog("Server Updation Error", {
			    'custom_class':  'myclass',
			    'title': 'Personal Info Error'
			});

		}
	}
}

//#user_medical_info

$(document).on("pageshow", "#medical_info", function() {
	var authentication_token = localStorage.getItem("authentication_token");
	if(authentication_token == null){
		userAbsent();
		return;
	}
	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";

	var url_link2 = url_link + '/api/v1/medicalinfodetail.json?auth_token=' + authentication_token;

	$.ajax({
		url : url_link2,
		type : 'GET',
		success : function(data) {
			successGetMedicalInfo(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
});

function successGetMedicalInfo(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
			console.log(data);
			$('#user_medical_info').val(data.medicaldetails[0].medical_info);

		} else if (data['code'] == 1) {
			//error result
			//var result = objectValue(data);
			//console.log(data);
			new $.Zebra_Dialog(data.error, {
			    'custom_class':  'myclass',
			    'title': 'Medical Info Error'
				});
		}
	}
}

function userMedicalInfo(arraay) {
	ids = arraay;
	var a = Validation("blank", arraay);
	if (a) {
		var x = retriveArray(arraay);
		medical = new MedicalInfo(x[0]);
	} else {
		new $.Zebra_Dialog('Medical Info Should be filled', {
			    'custom_class':  'myclass',
			    'title': 'Medical Info Error'
				});	return;
	}

	if (mode == 0) {

	} else {
		setMedicalInfo();
	}

}

function MedicalInfo(medical_info) {
	this.medical_info = medical_info;	
}

function setMedicalInfo() {
	var authentication_token = localStorage.getItem("authentication_token");
	if(authentication_token == null){
		userAbsent();
		return;
	}

	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";
	var url_link2 = url_link + '/api/v1/medicalinfo.json/?auth_token=' + authentication_token;

	$.ajax({
		url : url_link2,
		type : 'POST',
		data : medical,
		success : function(data) {
			successSetMedicalInfo(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
}

function successSetMedicalInfo(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
			//console.log(data);

		} else if (data['code'] == 1) {
			//error result
			//var result = objectValue(data);
			//console.log(data);
			new $.Zebra_Dialog(data.error, {
			    'custom_class':  'myclass',
			    'title': 'Medical Info Error'
				});

		}
	}
}



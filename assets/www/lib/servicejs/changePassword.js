//local
var user = null;
var result_signup = {};
var debug = false;
var ids = null;
function chngPass_service(arraay) {
		
		ids = arraay;	
		var message = "";		
		var a = Validation("blank", arraay);
		var b = Validation("password", $(arraay[0]).val()); 
		var c = Validation("password", $(arraay[1]).val());
		var d = Validation("match", $(arraay[1]).val(), $(arraay[2]).val());
		if(!d){message = "Password and Confirm Password Should Match";}
		if(!b){message = "Password length sholud be 8 charater";}
		if(!a){message = "old password, new password and confirm password is mandatory";}
		
		if(a && b && c && d){
			var x = retriveArray(arraay);
			user = new Password(x[0], x[1]);
		}else{
			new $.Zebra_Dialog(message, {
			    'custom_class':  'myclass',
			    'title': 'Change Password Error'
				});						
			return;
		}
	
	if(mode == 0){
		resetFields(ids);
				
	}else{		
		chngPass_call();	
	}
	
	
}

function Password(oldPass, newPass) {
	this.old_password = oldPass;
	this.password = newPass;
}

function chngPass_call() {
	var authentication_token = localStorage.getItem("authentication_token");
	if(authentication_token == null){
		userAbsent();
		return;
	}	
	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";
	var url_link2 = url_link+'/api/v1/changepassword.json/?auth_token='+authentication_token;
	$.ajax({
		url : url_link2,
		type : 'POST',
		data : user,
		success : function(data) {
			success(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
}

function success(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
			//Reset All Fields 
			resetFields(ids);
		
			
		} else if (data['code'] == 1) {
			//error result
			//var result = objectValue(data);			
			resetFields(ids);
			//console.log(data.messages);
			new $.Zebra_Dialog(data.messages.toUpperCase(), {
			    'custom_class':  'myclass',
			    'title': 'Change Password Error'
				});	
		}
	}
}

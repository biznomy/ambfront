/*
//common
var mode = 1; //online
var mode = 0; //offline
var url_link = 'http://192.168.1.13:3000';
*/
//local
var user = null;
var result_signup = {};
var debug = false;
var ids = null;
function signup_service(arraay) {
		var message = "";
		ids = arraay;	
		
		var a = Validation("blank", arraay);
		var b = Validation("email", $(arraay[0]).val()); 
		var c = Validation("password", $(arraay[1]).val());
		var d = Validation("match", $(arraay[1]).val(), $(arraay[2]).val());
		
		if(!d){message = "Password and confiirm password not match";} 
		if(!c){message = "Password length at least 8 charcter";}
		if(!b){message = "Invalid email address";}
		if(!a){message = "email, password and confirm password is mandatory";}
		
		if(a && b && c && d){
			var x = retriveArray(arraay);
			user = new User(x[0], x[1], x[2]);
		}else{
			new $.Zebra_Dialog(message, {
			    'custom_class':  'myclass',
			    'title': 'SignUp Error'
				});
			return;
		}
	
	if(mode == 0){
		//console.log(user);
		localStorage.setItem("user_email" , user.email);
		localStorage.setItem("user_password",  user.password);		
		resetFields(ids);			
		
	}else{		
		signupCall();	
	}
	
	
}

function User(email, password, password_confirmation) {
	this.email = email;
	this.password = password;
	this.password_confirmation = password_confirmation;
}

function signupCall() {
	var userlist = {
		"user" : user
	};
	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";
	var url_link2 = url_link+'/api/v1/signup.json';	
	$.ajax({
		url : url_link2,
		type : 'POST',
		data : userlist,
		success : function(data) {
			successSignUp(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
}

function successSignUp(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
			//Reset All Fields 
			resetFields(ids);
			change('#login');			
		} else if (data['code'] == 1) {
			//error result
			//var result = objectValue(data);
			new $.Zebra_Dialog('Email '+ data.messages.email[0], {
			    'custom_class':  'myclass',
			    'title': 'SignUp Error'
				});			
		}
	}
}
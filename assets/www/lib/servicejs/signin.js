//local
var user = null;
var result_signin = {};
var debug = false;
var ids = null;

function sign_in_service(arraay) {
	var message = "";
	ids = arraay;	
	var a = Validation("blank", arraay);
	var b = Validation("email", $(arraay[0]).val()); 
	var c = Validation("password", $(arraay[1]).val());
	 
	if(!c){message = "Password length at least 8 charcter";}
	if(!b){message = "Invalid email address";}
	if(!a){message = "email and password is mandatory";}
	
	if(a && b && c){
		var x = retriveArray(arraay);
		user = new User(x[0], x[1]);		
	}else{
		new $.Zebra_Dialog(message, {
			    'custom_class':  'myclass',
			    'title': 'Login Error'
		});
		return;
	}
	
	if(mode == 0){
		var user_email = localStorage.getItem("user_email");
		var user_password = localStorage.getItem("user_password");
		if(user_email === user.email && user_password === user.password){
			resetFields(ids);
			change("#route");	
		}		
	}else{		
		signinCall();
	}
	
	
}

function User(email, password) {
	this.email = email;
	this.password = password;
}

function signinCall() {
	var userlist = {
		"user" : user
	};
	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";
	var url_link2 = url_link+'/api/v1/signin.json';	
	console.log(url_link2);
	$.ajax({
		url : url_link2,
		type : 'POST',
		data : userlist,
		success : function(data) {
			successSignIn(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			errorSignIn(jqXHR, textStatus, errorThrown);
		}
	});
}

function successSignIn(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
			//Reset All Fields 
			resetFields(ids);
			localStorage.setItem("authentication_token", data.user.authentication_token);
			localStorage.setItem("userId", data.user.id);			
			$.mobile.changePage("#home", {transition: "none",reverse: false, changeHash: true});
			
		} else if (data['code'] == 1) {
			//error result
			//var result = objectValue(data);
			new $.Zebra_Dialog(data.messages, {
			    'custom_class':  'myclass',
			    'title': 'Login Error'
				});
			console.log(data);
			
		}

	}

}
var user = localStorage.currentUser? JSON.parse(localStorage.currentUser) : false;
if(user){
	console.log(user);
	$("#userName").text(user.reg_fullname);
}
else {
	$(location).attr('href', location.href.substring(0, location.href.lastIndexOf('/'))+'/login.html');
}
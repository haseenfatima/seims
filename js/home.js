var add_notification = function(header, html){
	var fullhtml = '<article class="white-panel admission_open">'+
						'<h4><a href="#">'+header+'</a></h4>'+
						html+
					'</article>';
	$('#pinBoot').append(fullhtml);
};

var users = localStorage.users ? JSON.parse(localStorage.users) : [];
var user = localStorage.currentUser? JSON.parse(localStorage.currentUser) : false;
if(user){
	$("#userName").text(user.reg_fullname);
}
else {
	$(location).attr('href', location.href.substring(0, location.href.lastIndexOf('/'))+'/login.html');
}

if(user){
	if(typeof user.registration_data !== "undefined"){
		// student is registered
		if(typeof user.fee_paid !== "undefined" && user.fee_paid === "paid"){
			add_notification('Admission Confirmed','<p>We have recieved your fee. Please come to school at 8:00 on 1st January 2016!</p><p style="float:right;"><a href="login.html#logout">Logout</a></p>');
		} else if(typeof user.test_granted !== "undefined" && user.test_granted == "granted"){
			
			add_notification('Congratulations','<p>Your are cleared after test. Confirm your admission by paying here!</p><p style="float:right;"><a href="pay.html">Pay Fee</a></p>');
		} else if(typeof user.test_granted && user.test_granted == "denied"){
			
			add_notification('Better Luck Next Time','<p>Your Admission is denied. You can try again next year!</p><p style="float:right;"><a href="login.html#logout">Logout</a></p>');

		} else if(typeof user.payments !== "undefined" && user.payments.length > 1){
			// all payments complete
			add_notification('Fee Recieved','<p>Your Admission is confirmed. Please visit the school for more detailed discussion on 10th September 2015.</p>');
		} else if (typeof user.payments !== "undefined" && user.payments.length > 0){
			// test payment complete
			add_notification('Test Fee Recieved','<p>We have recieved your payment! Please Appear on your test on 26th December 2015.</p><p style="float:right;"><a href="login.html#logout">Logout</a></p>');	
		} else {
			// pay for tests
			add_notification('Pay for Admission Test','<p>Please pay for Admission Test before 10th December. <a href="pay.html">You can pay here</a></p>');
		}
	} else {
		// student isnt registered
		add_notification('Admissions Open','<p>Admissions are open till 30th December, 2015. You can <a href="register_student.html">signup</a> to register yourself.</p>');	
	}
}	


$('#payment-form').on('submit', function(e){
	e.preventDefault();
	user.payments= (typeof user.payments !== "undefined")? user.payments : [];
	if(user.payments.length >= 1) {
		user.fee_paid = "paid";
	}
	user.payments.push('paid');

	users[user.id] = user;
	localStorage.users = JSON.stringify(users);
	localStorage.currentUser = JSON.stringify(user);

	$(location).attr('href', location.href.substring(0, location.href.lastIndexOf('/'))+'/home.html#register_payed');
});
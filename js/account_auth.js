if(location.href.toString().indexOf('logout') !== -1){
  localStorage.removeItem('currentUser');
}

var user = localStorage.currentUser? JSON.parse(localStorage.currentUser) : false;
if(user){
  $(location).attr('href', location.href.substring(0, location.href.lastIndexOf('/'))+'/home.html');
}


(function($) {
    "use strict";
	
	// Options for Message
	//----------------------------------------------
  var options = {
	  'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
	  'btn-success': '<i class="fa fa-check"></i>',
	  'btn-error': '<i class="fa fa-remove"></i>',
	  'msg-success': 'All Good! Redirecting...',
	  'msg-error': 'Wrong login credentials!',
	  'useAJAX': true,
  };

	// Login Form
	//----------------------------------------------
	// Validation
  $("#login-form").validate({
  	rules: {
      lg_email: {
        required : true,
        email : true
      },
  	  lg_password: "required",
    },
  	errorClass: "form-invalid"
  });
  
	// Form Submission
  $("#login-form").submit(function() {
  	remove_loading($(this));
		
		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  login_submit_form($(this));
		
		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });
	
	// Register Form
	//----------------------------------------------
	// Validation
  $("#register-form").validate({
  	rules: {
  	  reg_password: {
  			required: true,
  			minlength: 5
  		},
   		reg_password_confirm: {
  			required: true,
  			minlength: 5,
  			equalTo: "#register-form [name=reg_password]"
  		},
      reg_email: {
        required: true,
        email :true
      },
      reg_fullname : "required",
  		reg_agree: "required",
      reg_gender : "required"
    },
	  errorClass: "form-invalid",
	  errorPlacement: function( label, element ) {
	    if( element.attr( "type" ) === "checkbox" || element.attr( "type" ) === "radio" ) {
    		element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
	    }
			else {
  	  	label.insertAfter( element ); // standard behaviour
  	  }
    }
  });

  // Form Submission
  $("#register-form").submit(function() {
  	remove_loading($(this));
		
		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  register_submit_form($(this));
		
		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });

	// Forgot Password Form
	//----------------------------------------------
	// Validation
  $("#forgot-password-form").validate({
  	rules: {
      fp_email: "required",
    },
  	errorClass: "form-invalid"
  });
  
	// Form Submission
  $("#forgot-password-form").submit(function() {
  	remove_loading($(this));
		
		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  dummy_submit_form($(this));
		
		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });

	// Loading
	//----------------------------------------------
  function remove_loading($form)
  {
  	$form.find('[type=submit]').removeClass('error success');
  	$form.find('.login-form-main-message').removeClass('show error success').html('');
  }

  function form_loading($form)
  {
    $form.find('[type=submit]').addClass('clicked').html(options['btn-loading']);
  }
  
  function form_success($form)
  {
	  $form.find('[type=submit]').addClass('success').html(options['btn-success']);
	  $form.find('.login-form-main-message').addClass('show success').html(options['msg-success']);
  }

  function form_failed($form)
  {
  	$form.find('[type=submit]').addClass('error').html(options['btn-error']);
  	$form.find('.login-form-main-message').addClass('show error').html(options['msg-error']);
  }

	// Dummy Submit Form (Remove this)
	//----------------------------------------------
	// This is just a dummy form submission. You should use your AJAX function or remove this function if you are not using AJAX.
  function dummy_submit_form($form)
  {
  	if($form.valid())
  	{
  		form_loading($form);
  		setTimeout(function() {
  			form_success($form);
  		}, 2000);
  	}
  }

  function register_submit_form($form)
    {
      if($form.valid())
      {
        form_loading($form);
        
        var users = localStorage.users? JSON.parse(localStorage.users) : [];
        
        var user = {
          email : $("#reg_email").val(),
          password : $("#reg_password").val(),
          reg_fullname : $("#reg_fullname").val(),
          reg_gender : $('[name="reg_gender"]:checked').attr("id"),
          id : users.length
        };
        
        users.push(user);
        localStorage.currentUser = JSON.stringify(user);
        
        localStorage.users = JSON.stringify(users);
        setTimeout(function() {
          form_success($form);
          $(location).attr('href', location.href.substring(0, location.href.lastIndexOf('/'))+'/home.html');
        }, 2000);
      }
    }

    function login_submit_form($form)
      {
        if($form.valid())
        {
          form_loading($form);
          
          var users = localStorage.users? JSON.parse(localStorage.users) : [];
          
          var userEnteredEmail = $('input[name="lg_email"]').val();
          var userEnteredPassword = $('input[name="lg_password"]').val();

          var user = users.filter(function(x){return x.email === userEnteredEmail && x.password === userEnteredPassword})

          if(user.length > 0){
            localStorage.currentUser = JSON.stringify(user[0]);

            setTimeout(function() {
              form_success($form);
              $(location).attr('href', location.href.substring(0, location.href.lastIndexOf('/'))+'/home.html');
            }, 2000);
          }

          else {
            setTimeout(function() {
              form_failed($form);
            }, 2000);
          }
        }
      }
	
})(jQuery);
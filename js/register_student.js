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
      lg_username: "required",
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
      dummy_submit_form($(this));
    
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
      reg_full_name: "required",
      reg_fathers_name : "required",
      reg_dob: "required",
      reg_class: "required",
      reg_last_qualification: "required",
      reg_percentage : "required",
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
      dummy_submit_form($(this));
    
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
      
      var users = localStorage.users ? JSON.parse(localStorage.users) : [];
      var user = localStorage.currentUser ? JSON.parse(localStorage.currentUser) : false;
      var index = user.id;
      
      if(user){
        console.log(user);

        var registration_data = {
          reg_full_name: $("#reg_full_name").val(),
          reg_fathers_name : $("#reg_fathers_name").val(),
          reg_dob: $("#reg_dob").val(),
          reg_class: $("#reg_class").val(),
          reg_last_qualification: $("#reg_last_qualification").val(),
          reg_percentage: $("#reg_percentage").val()
        };

        user.registration_data = registration_data;
        users[index] = user;

        localStorage.users = JSON.stringify(users);
        localStorage.currentUser = JSON.stringify(user);
        
        setTimeout(function() {      
          $(location).attr('href', location.href.substring(0, location.href.lastIndexOf('/'))+'/home.html#pay_for_test');
        }, 2000);

      }
      else {
        setTimeout(function() {
          form_failed($form);
          $(location).attr('href', location.href.substring(0, location.href.lastIndexOf('/'))+'/login.html');
        }, 2000);

      }
      
    }
  }
  
})(jQuery);
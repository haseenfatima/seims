$(function(){

  $('#link_accept_admissions').on('click', function(){
    
    $('#student_applications, #denied_admissions, #waiting_fee_admissions').hide();
    $('#accept_admissions').show();
    
  });

  $('#link_student_applications').on('click', function(){
    
    $('#accept_admissions, #denied_admissions, #waiting_fee_admissions').hide();
    $('#student_applications').show();
  });

  $('#link_denied_admissions').on('click', function(){
    
    $('#accept_admissions, #student_applications, #waiting_fee_admissions').hide();
    $('#denied_admissions').show();
  });

  $('#link_waiting_fee_admissions').on('click', function(){

    $('#accept_admissions, #student_applications, #denied_admissions').hide();
    $('#waiting_fee_admissions').show();
  });

  $('#link_student_applications').click();

  var getUserString = function(user){
    var template = '<div class="row">'+
      '<div class="col-lg-12">'+
        '<div class="col-xs-12 col-sm-3">'+
          '<figure>'+
            '<img class="img-circle img-responsive" alt="" src="img/you.jpg">'+
          '</figure>                         '+
        '</div>';

        if(typeof user.payments !== "undefined" && user.payments.length == 1 && typeof user.test_granted !== "string"){
            template+='<div class="col-xs-12 col-sm-6">';
        }
        else {
            template+='<div class="col-xs-12 col-sm-9">';
        }

        template+='<ul class="list-group">'+
           ' <li class="list-group-item"><i class="fa fa-user"></i>  '+user.registration_data.reg_full_name+'</li>'+
            '<li class="list-group-item"><i class="fa fa-user"></i>  '+user.registration_data.reg_fathers_name+'</li>'+
           ' <li class="list-group-item"><i class="fa fa-refresh"></i>  '+user.registration_data.reg_last_qualification+' </li>'+
           ' <li class="list-group-item"><i class="fa fa-calculator"></i>  '+user.registration_data.reg_percentage+' % </li>'+
           ' <li class="list-group-item"><i class="fa fa-envelope"></i>  '+user.email+'</li>'+
         ' </ul>'+
       ' </div>';

       if(typeof user.payments !== "undefined" && user.payments.length == 1 && typeof user.test_granted !== "string"){
          template+=' <div class="col-xs-12 col-sm-3">'+
          '   <ul class="list-group">'+
          '     <li data-user="'+user.id+'" class="list-group-item accept_user"><i class="fa fa-check"></i> Accept</li>'+
          '     <li data-user="'+user.id+'" class="list-group-item decline_user"><i class="fa fa-remove"></i> Decline</li>'+
          '   </ul>'+
          ' </div>';
       }

      template+= '</div></div><br/>';

    return template;
  };

  var init = function(){

    var users = localStorage.users ? JSON.parse(localStorage.users) : [];

    for(var userId in users){
      var user = users[userId];
      var str =  getUserString(user);
      if(typeof user.payments !== "undefined"){
        var klass = "";
        if(user.payments.length > 1) {
          klass = ".accept_admissions_body";
        } else if(typeof user.test_granted !== "undefined" && user.test_granted == "granted"){
          klass = ".waiting_fee_admissions_body";
        } else if (typeof user.test_granted !== "undefined" && user.test_granted === "denied"){
          klass = ".denied_admissions_body";
        }else if (user.payments.length == 1){
          klass = ".student_applications_body";
        }

        $(klass).append(str);
      }
    };

    $('.accept_user').on('click', function(){
        var users = localStorage.users ? JSON.parse(localStorage.users) : [];
        var user = users[$(this).attr('data-user')];
        
        if(typeof user.payments !== "undefined" && user.payments.length == 1){
          
          user.test_granted = "granted";
          users[user.id] = user;
          localStorage.users = JSON.stringify(users);
          $($($('.accept_user')[0]).parents('.row')[0]).remove();
          
        }
    });

    $('.decline_user').on('click', function(){
        var users = localStorage.users ? JSON.parse(localStorage.users) : [];
        var user = users[$(this).attr('data-user')];
        
        if(typeof user.payments !== "undefined" && user.payments.length == 1){
          
          user.test_granted = "denied";
          users[user.id] = user;
          localStorage.users = JSON.stringify(users);
          $($($('.decline_user')[0]).parents('.row')[0]).remove();
        }
    });
  };

  init();

});


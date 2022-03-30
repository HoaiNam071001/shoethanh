$('#sign-up-submit').on('click', ()=>{
    $('.check-sign-up').html("");
    $.ajax({
        type: "POST",
        url: '/login/verifyregister',
        data: {
            'username':$('.Name-sign-up').val(),
            'email':$('.email-sign-up').val(),
            'password':$('.password-sign-up').val()
        },
        success: (data)=>{
            if(data === 'success'){
                $('.check-sign-up').html('Đăng ký thành công!');
                $('.check-sign-up').css('color', 'rgb(0, 255, 13)');
            }
            else if(data === 'username'){
                $('.check-sign-up').html('Username đã tồn tại!');
                $('.check-sign-up').css('color', 'rgb(255, 0, 0)');
            }
            else if(data === 'email'){
                $('.check-sign-up').html('Email đã tồn tại!');
                $('.check-sign-up').css('color', 'rgb(255, 0, 0)');
            }
            else {
                $('.check-sign-up').html('Yêu cầu không hợp lệ!');
                $('.check-sign-up').css('color', 'rgb(255, 0, 0)');
            }
        },
      });
})
$('#sign-in-submit').on('click', ()=>{
    $.ajax({
        type: "POST",
        url: '/login/verifylogin',
        data: {
            'name':$('.user-sign-in').val(),
            'password':$('.password-sign-in').val()
        },
        success: (data)=>{
            if(data === 'success'){
                window.location ="/";
            }
            else if(data === 'user'){
                $('.check-sign-in').html('Tài khoản không tồn tại!');
                $('.check-sign-in').css('color', 'rgb(255, 0, 0)');
            }
            else {
                $('.check-sign-in').html('Yêu cầu không hợp lệ!');
                $('.check-sign-in').css('color', 'rgb(255, 0, 0)');
            }
        },
      });
})

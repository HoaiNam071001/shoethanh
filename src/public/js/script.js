
  
  $(".search-bar input")
   .focus(function () {
    $(".header").addClass("wide");
   })
   .blur(function () {
    $(".header").removeClass("wide");
   });
  
  
  
  function changeSidebarView(){
    var sidebar = document.getElementsByClassName("sidebar-container")[0];
    const viewButton = document.getElementsByClassName("sidebar-viewButton")[0];
    if (viewButton.title == "Shrink"){
      sidebar.className += " shrink";
      viewButton.ariaLabel = "Expand Sidebar";
      viewButton.title = "Expand";
    } else{
      sidebar.className = "sidebar-container ";
      viewButton.ariaLabel = "Shrink Sidebar";
      viewButton.title = "Shrink";
    }
  }
  
  var swiper = new Swiper('.product-slider', {
    spaceBetween: 30,
    effect: 'fade',
    // initialSlide: 2,
    loop: false,
    navigation: {
        nextEl: '.next',
        prevEl: '.prev'
    },
    // mousewheel: {
    //     // invert: false
    // },
    on: {
        init: function(){
            var index = this.activeIndex;
  
            var target = $('.product-slider__item').eq(index).data('target');  
            $('.product-img__item').removeClass('active');
            $('.product-img__item#'+ target).addClass('active');
        }
    }
  
  });
  
  swiper.on('slideChange', function () {
    var index = this.activeIndex;
  
    var target = $('.product-slider__item').eq(index).data('target');
  
    console.log(target);
  
    $('.product-img__item').removeClass('active');
    $('.product-img__item#'+ target).addClass('active');
  
    if(swiper.isEnd) {
        $('.prev').removeClass('disabled');
        $('.next').addClass('disabled');
    } else {
        $('.next').removeClass('disabled');
    }
  
    if(swiper.isBeginning) {
        $('.prev').addClass('disabled');
    } else {
        $('.prev').removeClass('disabled');
    }
  });
  
  $(".js-fav").on("click", function() {
    $(this).find('.heart').toggleClass("is-active");
  });
  
  
  const sizes = document.querySelectorAll('.size');
  const colors = document.querySelectorAll('.color');
  const shoes = document.querySelectorAll('.shoe');
  const shoeBg = document.querySelector('.shoeBackground');
  var choicecolor;
  var choiceSize;
  let animationEnd = true;

function changeColor(){
    colors.forEach(cl => cl.classList.remove('active'));
    this.classList.add('active');
    choicecolor = this.getAttribute('color');

}
function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
    choiceSize = this.innerHTML; 
}

sizes.forEach(size => size.addEventListener('click', changeSize));
colors.forEach(c => c.addEventListener('click', changeColor));

function changeHeight(){
    var x = window.matchMedia("(max-width: 1000px)");
    if(x.matches){
    }
    else{
        
    }
}

changeHeight();

window.addEventListener('resize', changeHeight);

$('.buy-add-button-click').on('click',(e)=>{
  if(!choicecolor) choicecolor = 'red';
  if(!choiceSize) choiceSize = '40';
  $.ajax({
    type: "GET",
    url: '/product/add/'+e.target.id,
    data: { 
        'name':$('.name-product').html(),
        'image':$('.img-product-now').attr('src'),
        'color':choicecolor,
        'size':choiceSize,
        'price':$('.price-product').html()
    },
    success: (data)=>{
      if(data === 'success'){
        alert('Thêm vào giỏ hàng thành công');
      }
      else if(data === 'login'){
        location.href = '/login';
      }
    },
  });
})


function changequantity1(e,size,color,price){
  $.ajax({
    type: "GET",
    url: '/cart/update/giam',
    data:{
      'id':e,
      'color':color,
      'size':size
    },
    success: (data)=>{
      if(data.length === 0) { location.reload(); return;}
      if(data.length && data.sum){
        $('.'+e+size+color).html((parseFloat(data.length)*parseFloat(price)).toFixed(2));
        $('#'+e+size+color).html(data.length);
        var sum = parseFloat(data.sum).toFixed(2);
        var sumx = (sum*0.1).toFixed(2);
        var sumtotal = parseFloat(sum)+parseFloat(sumx);
        sumtotal = sumtotal.toFixed(2);
        $('.cost-value-default').html('$'+sum);
        $('.cost-value-tax').html('$'+sumx);
        $('.cost-value-total').html(sumtotal);
        $('.cost-value-total-vnd').html(parseInt(sumtotal*23000));
      }
    },
  });
}
function changequantity2(e,size,color,price) {
  $.ajax({
    type: "GET",
    url: '/cart/update/tang',
    data:{
      'id':e,
      'color':color,
      'size':size
    },
    success: (data)=>{
      if(data.length && data.sum){
        $('.'+e+size+color).html((parseFloat(data.length)*parseFloat(price)).toFixed(2));
        $('#'+e+size+color).html(data.length);
        var sum = parseFloat(data.sum).toFixed(2);
        var sumx = (sum*0.1).toFixed(2);
        var sumtotal = parseFloat(sum)+parseFloat(sumx);
        sumtotal = sumtotal.toFixed(2);
        $('.cost-value-default').html('$'+sum);
        $('.cost-value-tax').html('$'+sumx);
        $('.cost-value-total').html(sumtotal);
        $('.cost-value-total-vnd').html(parseInt(sumtotal*23000));
      }
    },
  });
}

$('.blog-slider__button').on('click',()=>{
  var name,phone,address;
  name = $('#fullname').val()?$('#fullname').val():"Default";
  phone = $('#phonenumber').val()?$('#phonenumber').val():"Default";
  address = $('#location').val()?$('#location').val():"Default";
  $.ajax({
    type: "GET",
    url: '/cart/pay',
    data:{
      price: parseInt($('.cost-value-total-vnd').html()),
      name: name,
      number: phone,
      address: address
    },
    success: (data)=>{
      if(data.url){
        location.href = data.url;
      }
    },
  });
})

document.querySelector('.img__btn').addEventListener('click', function() {
  document.querySelector('.cont').classList.toggle('s--signup');
});


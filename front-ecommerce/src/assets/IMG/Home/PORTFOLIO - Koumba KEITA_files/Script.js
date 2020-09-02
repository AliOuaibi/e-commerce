$('.burger').click(function(e){
    $('.background').slideToggle();
    $('menu').slideToggle();
})

$('button').on('click', function() {
    !$(this).toggleClass('is-active');
});


let i=0;
let images = [];
images[0] = './Images/carousel/img1.jpg';
images[1] = './Images/carousel/img2.jpg';
images[2] = './Images/carousel/img3.jpg';
images[3] = './Images/carousel/img4.jpg';
console.log(images)

let style = document.getComputedStyle;

let diapo = $('.image');
let boutonLeft = $('.prev');
let boutonRight = $('.next');
//let boutonsRadio = document.body.children[2].children[0].lastElementChild.lastElementChild;

    
boutonRight.click(function(e){

    //boutonsRadio.children[i].checked = true

})

setInterval(function () {
    ++i;
    console.log(i);
    if(i> images.length-1){
        i=0
    }
    diapo.css('background-image', "url('"+ images[i] +"')");
  }, 4000);


    // boutonsRadio.children[0].onclick=function(){("changeImg()")
    // diapo.style.backgroundImage="url(\'" + images[0] + "\')"
    // }
    // boutonsRadio.children[1].onclick=function(){("changeImg()")
    // diapo.style.backgroundImage="url(\'" + images[1] + "\')"
    // }
    // boutonsRadio.children[2].onclick=function(){("changeImg()")
    // diapo.style.backgroundImage="url(\'" + images[2] + "\')"
    // }
    // boutonsRadio.children[3].onclick=function(){("changeImg()")
    // diapo.style.backgroundImage="url(\'" + images[3] + "\')"
    // }
    // boutonsRadio.children[4].onclick=function(){("changeImg()")
    // diapo.style.backgroundImage="url(\'" + images[4] + "\')"
    // }
    // boutonsRadio.children[5].onclick=function(){("changeImg()")
    // diapo.style.backgroundImage="url(\'" + images[5] + "\')"
    // }

$('.text').click(function(e){
    alert('ok')
    $('.background-projet').slideToggle();
})
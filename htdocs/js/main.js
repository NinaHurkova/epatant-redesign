// Language switcher
function chooseLanguage(){
    if (window.matchMedia("(max-width: 1023px)").matches){
        $(".lang-menu-list li").on("click", function(){
            $(".lang-menu-list li").removeClass('selected');
            $(this).addClass('selected');
        });
	}else{
        $(".lang-menu").hover(function(){
            $(".lang-menu-list").addClass("active");  //Add the active class to the area is hovered
        }, function () {
            $(".lang-menu-list").removeClass("active");
        });
        $(".lang-menu-list li").on("click", function(){
            //select lang and apply changes
            $lang = $(this).text();
            $(".lang-menu-selected").text($lang);
        });
    }
}
$(document).ready(chooseLanguage);
$(window).on('resize',chooseLanguage);

//Mobile menu toggle
$("#menuToggle").on("click",function(){
    $(this).toggleClass("is-active");
    $('.topnav-menu').toggleClass("show");
    $("body").toggleClass('overflow-hidden');
});

$(document).ready(function() {
    $('.selectpicker').each(function () {
        let selectpicker = $(this);
        let placeholder = $(selectpicker).data('placeholder');
        selectpicker.select2({
            dropdownCssClass: 'selectpicker-dropdown',
            minimumResultsForSearch: '-1',
            placeholder: placeholder
        });
    })
});

// https://photoswipe.com/
var lightbox = new PhotoSwipeLightbox({
    gallery: '.gallery',
    children: 'a',
    // dynamic import is not supported in UMD version
    pswpModule: PhotoSwipe
});
lightbox.init();

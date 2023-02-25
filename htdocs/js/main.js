// Language switcher
function chooseLanguage(){
    $(".lang-menu-list li").on("click", function(){
        $(".lang-menu-list li").removeClass('selected');
        $(this).addClass('selected');
    });
}
chooseLanguage();

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
    gallery: '.gallery--lightbox',
    children: 'a',
    // dynamic import is not supported in UMD version
    pswpModule: PhotoSwipe
});
lightbox.init();

//Change color scheme
var darkMode = false;

// default to system setting
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	darkMode = true;
}

// preference from localStorage should overwrite
if (localStorage.getItem('theme') === 'dark') {
	darkMode = true;
} else if (localStorage.getItem('theme') === 'light') {
	darkMode = false;
}

if (darkMode) {
	document.documentElement.setAttribute("theme", "dark");
    document.getElementById('theme-toggle').classList.add('is-dark');
}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('theme-toggle').addEventListener('click', () => {
		if(document.documentElement.hasAttribute("theme")){
            document.documentElement.removeAttribute("theme");
            localStorage.removeItem('theme');
            document.getElementById('theme-toggle').classList.remove('is-dark');
        }
          else{
            document.documentElement.setAttribute("theme", "dark");
            localStorage.setItem('theme', 1);
            document.getElementById('theme-toggle').classList.add('is-dark');
        }
    	localStorage.setItem('theme', document.documentElement.hasAttribute("theme") ? 'dark' : 'light');
	});

});

//Change accent
document.documentElement.setAttribute('accent',localStorage.getItem('accentColor'));

const colors= document.querySelectorAll('.colors');

colors.forEach(function(color) {
    color.addEventListener('click',function() {
        let accentColor = color.dataset.color;
        document.documentElement.setAttribute('accent',accentColor);

        localStorage.setItem('accentColor',color.dataset.color);

    })
})

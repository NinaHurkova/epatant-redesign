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
});

//Header on scroll
const scrollHeight = $('.header').height();

$(window).scroll(function() {
    if ($(this).scrollTop() > scrollHeight) {
        $('.header--fixed').addClass('hide-up');
    } else {
        $('.header--fixed').removeClass('hide-up');
    }
});

//Scroll progress
$(document).on("scroll", function(){
  const pixels = $(document).scrollTop();
  const pageHeight = $(document).height() - $(window).height();
  const progress = 100 * pixels / pageHeight;

  $("div.progresbar").css("width", progress + "%");
});

//Selectpicker
$('.selectpicker').each(function() {
    const _this = $(this),
        label = $("label[for='" + $(this).attr('id') + "']"),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 450; // длительность анимации

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
        class: 'new-select has-placeholder',
        text: _this.children('option[data-placeholder]').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function() {
        if ( !$(this).hasClass('on') ) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function() {
                let chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                _this.parents('.form-group').removeClass('has-mistake');
                selectHead.text( $(this).find('span').text() ).removeClass('has-placeholder');
                $(label).addClass('colored')

                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            $(this).removeClass('on');
            selectList.slideUp(duration);
        }
    });
});

//Form labels
$('.form-control').on('change', function () {
    const label = $("label[for='" + $(this).attr('id') + "']");
    if($(this).val()){
        $(label).addClass('colored')
    }else{
        $(label).removeClass('colored')
    }
});

//Form validation

$('.needs-validation').on("submit", function(event){
  let valid = true;
  $('[required]').each(function() {
    if ($(this).is(':invalid') || !$(this).val()) {
        valid = false;
        $(this).parents('.form-group').addClass('has-mistake');
        event.preventDefault();
        event.stopPropagation();
    }else{
        $(this).parents('.form-group').removeClass('has-mistake');
    }
  });
  if (!valid) $('.invalid-feedback-form').show();
  else $('.invalid-feedback-form').hide();
});
$('[required]').each(function(){
    $(this).on('change', function () {
        if (!$(this).is(':invalid') || !$(this).val()) {
            $(this).parents('.form-group').removeClass('has-mistake');
        }
        console.log(this)
    })
});
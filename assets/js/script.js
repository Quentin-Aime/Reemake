// Menu Burger

var open = document.querySelector('.burgermenu')
var page = document.querySelector('.burger-page')
var close = document.querySelector('.menu-logo-close')
var content = document.querySelector('.Filter-content')
var copyright = document.querySelector('.copyright-bottom')

open.addEventListener('click',function () {
    document.querySelector('body').style.overflow="hidden";
    page.classList.add('burger-page-on');
    page.classList.remove('burger-page-off');
    page.classList.add('burger-animation-on');
    page.classList.remove('burger-animation-off');
})

close.addEventListener('click',function () {
    document.querySelector('body').style.overflow="scroll";
    page.classList.remove('burger-page-on');
    page.classList.add('burger-page-off');
    page.classList.remove('burger-animation-on');
    page.classList.add('burger-animation-off');
})



// Hover Animation

var navItem = document.querySelectorAll('.filter-nav');

for (i = 0; i < navItem.length; ++i) {
        navItem[i].addEventListener('mouseover', function(){
            this.classList.add('under-nav-item-on');
            this.classList.remove('under-nav-item-off');
        });
        navItem[i].addEventListener('mouseout', function(){
            this.classList.remove('under-nav-item-on');
            this.classList.add('under-nav-item-off');
        });
        navItem[i].addEventListener('click', function(){
        })
}

// If Filter is clicked

var filterPopular = document.querySelector('#Popular');
var filterNewsReleases = document.querySelector('#New_Releases');
var filterRecently = document.querySelector('#Recently');
var filterRecommended = document.querySelector('#Recommended');

var filterActive = 'Popular';

filterPopular.addEventListener('click', function(){
    filterActive = 'Popular';
    checkFilterActive();
    categoryScroll();
    clearCategory();
})

filterNewsReleases.addEventListener('click', function(){
    filterActive = 'News Releases';
    checkFilterActive();
    categoryScroll();
    clearCategory();
})

filterRecently.addEventListener('click', function(){
    filterActive = 'Recently';
    checkFilterActive();
    categoryScroll();
    clearCategory();
})

filterRecommended.addEventListener('click', function(){
    filterActive = 'Recommended';
    checkFilterActive();
    categoryScroll();
    clearCategory();
})

function checkFilterActive(){
    if(filterActive == 'Popular'){
        filterPopular.classList.add('under-nav-item-active');
        filterNewsReleases.classList.remove('under-nav-item-active');
        filterRecently.classList.remove('under-nav-item-active');
        filterRecommended.classList.remove('under-nav-item-active');
    }
    else if(filterActive == 'News Releases'){
        filterPopular.classList.remove('under-nav-item-active');
        filterNewsReleases.classList.add('under-nav-item-active');
        filterRecently.classList.remove('under-nav-item-active');
        filterRecommended.classList.remove('under-nav-item-active');
    }
    else if(filterActive == 'Recently'){
        filterPopular.classList.remove('under-nav-item-active');
        filterNewsReleases.classList.remove('under-nav-item-active');
        filterRecently.classList.add('under-nav-item-active');
        filterRecommended.classList.remove('under-nav-item-active');
    }
    else if(filterActive == 'Recommended'){
        filterPopular.classList.remove('under-nav-item-active');
        filterNewsReleases.classList.remove('under-nav-item-active');
        filterRecently.classList.remove('under-nav-item-active');
        filterRecommended.classList.add('under-nav-item-active');
    }
}

// If Category is clicked

var categoryComedy = document.querySelector('#Comedy');
var categoryAnimation = document.querySelector('#Animation');
var categoryThriller = document.querySelector('#Thriller');
var categoryAction = document.querySelector('#Action');
var categoryAll = document.querySelector('#All');

var categoryActive = 'All';

categoryComedy.addEventListener('click', function(){
    categoryActive = 'Comedy';
    checkcategoryActive();
    categoryScroll();
})

categoryAnimation.addEventListener('click', function(){
    categoryActive = 'Animation';
    checkcategoryActive();
    categoryScroll();
})

categoryThriller.addEventListener('click', function(){
    categoryActive = 'Thriller';
    checkcategoryActive();
    categoryScroll();
})

categoryAction.addEventListener('click', function(){
    categoryActive = 'Action';
    checkcategoryActive();
    categoryScroll();
})

categoryAll.addEventListener('click', function(){
    categoryActive = 'All';
    checkcategoryActive();
    categoryScroll();
})

function checkcategoryActive(){
    if(categoryActive == 'Comedy'){
        categoryComedy.classList.add('nav-active');
        categoryAnimation.classList.remove('nav-active');
        categoryThriller.classList.remove('nav-active');
        categoryAction.classList.remove('nav-active');
        categoryAll.classList.remove('nav-active');
    }
    else if(categoryActive == 'Animation'){
        categoryComedy.classList.remove('nav-active');
        categoryAnimation.classList.add('nav-active');
        categoryThriller.classList.remove('nav-active');
        categoryAction.classList.remove('nav-active');
        categoryAll.classList.remove('nav-active');
    }
    else if(categoryActive == 'Thriller'){
        categoryComedy.classList.remove('nav-active');
        categoryAnimation.classList.remove('nav-active');
        categoryThriller.classList.add('nav-active');
        categoryAction.classList.remove('nav-active');
        categoryAll.classList.remove('nav-active');
    }
    else if(categoryActive == 'Action'){
        categoryComedy.classList.remove('nav-active');
        categoryAnimation.classList.remove('nav-active');
        categoryThriller.classList.remove('nav-active');
        categoryAction.classList.add('nav-active');
        categoryAll.classList.remove('nav-active');
    }
    else if(categoryActive == 'All'){
        categoryComedy.classList.remove('nav-active');
        categoryAnimation.classList.remove('nav-active');
        categoryThriller.classList.remove('nav-active');
        categoryAction.classList.remove('nav-active');
        categoryAll.classList.add('nav-active');
    }
}

function clearCategory(){
    categoryComedy.classList.remove('nav-active');
    categoryAnimation.classList.remove('nav-active');
    categoryThriller.classList.remove('nav-active');
    categoryAction.classList.remove('nav-active');
    categoryAll.classList.add('nav-active');
}

// Movies Hover


var over = function() {
    var movieItem = document.querySelectorAll('.movie');
    for (i = 0; i < movieItem.length; ++i) {
        movieItem[i].addEventListener('mouseover', function(){
            this.classList.add('movie-h');
            this.classList.remove('movie-noh');
        });
        movieItem[i].addEventListener('mouseout', function(){
            this.classList.remove('movie-h');
            this.classList.add('movie-noh');
        });
    }

}

// btn Close of video page

document.querySelector('.btn-exit').addEventListener("click", closeVideoPage);
document.querySelector('.logoclose').addEventListener("click", closeVideoPage);

function closeVideoPage(){
    document.querySelector('.info').classList.remove("info-open");
    document.querySelector('.info').classList.add("info-close");
    document.querySelector('.homepage').style.display = "block";
    categoryScrollDirect();
    notRecording = true;
    player.currentTime = 0;
    if(statePlay == false){
        statePlay = true;
        playpause();
    } else {
        playpause();
    }
    var timerinfoclose;
    timerinfoclose = setTimeout(function(){
        document.querySelector('.info-close').style.display = "none";
    }, 1000);
}


// btn Category Burger Menu

var burgerMenuz = function() {
    var burgermenuItem = document.querySelectorAll('.category-burger');
    for (i = 0; i < burgermenuItem.length; ++i) {
        burgermenuItem[i].addEventListener('click', function(){
            document.querySelector('body').style.overflow="scroll";
            page.classList.remove('burger-page-on');
            page.classList.add('burger-page-off');
            page.classList.remove('burger-animation-on');
            page.classList.add('burger-animation-off');
            categoryScroll();
        });
        burgermenuItem[0].addEventListener('click', function(){
            categoryActive = 'Action';
            checkcategoryActive();
        });
        burgermenuItem[1].addEventListener('click', function(){
            categoryActive = 'Thriller';
            checkcategoryActive();
        });
        burgermenuItem[2].addEventListener('click', function(){
            categoryActive = 'Animation';
            checkcategoryActive();
        });
        burgermenuItem[3].addEventListener('click', function(){
            categoryActive = 'Comedy';
            checkcategoryActive();
        });
    }
}

burgerMenuz();

// Auto Scroll category

function categoryScroll(){
    var moviesList = document.querySelector('.movies-list').getBoundingClientRect().top;
    window.scrollBy({ 
        top: moviesList,
        left: 0, 
        behavior: 'smooth' 
    });
}


function categoryScrollDirect(){
    var moviesList = document.querySelector('.movies-list').getBoundingClientRect().top;
    window.scrollBy(0, moviesList);
}


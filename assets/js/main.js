	function check_ddot(str) {
	    for (var it = 0; it < str.length; it++)
	        if (str[it] === ':')
	            return true;
	    return false;
	}

	function get_duration(str) {
	    var nb1 = "";
	    var nb2 = "";
	    if (check_ddot(str) == true) {
	        for (var it = 0; str[it] != ':'; it++)
	            nb1 += str[it];
	    }
	    nb1 = parseInt(nb1);
	    it++;
	    while (it < str.length)
	        nb2 += str[it++];
	    nb2 = parseInt(nb2);
	    if (nb1 !== NaN)
	        nb2 = nb1 * 60 + nb2;
	    return nb2;
	}

	function check_order(tab, key) {
	    for (var it = 0; it < tab.length; it++)
	        if (it + 1 < tab.length) {
	            if (key === 'duration') {
	                if (get_duration(tab[it].duration) > get_duration(tab[it + 1].duration))
	                    return it;
	            } else if (key === 'title') {
	                if (tab[it][key].localeCompare(tab[it + 1][key]) > 0)
	                    return it;
	            } else if (tab[it][key] < tab[it + 1][key])
	                return it;
	        }
	    return it;
	}

	function order_by(film_array, key) {

	    var tmp = {};
	    var nb = 0;

	    while ((nb = check_order(film_array, key)) !== film_array.length) {
	        tmp = film_array[nb + 1];
	        film_array[nb + 1] = film_array[nb];
	        film_array[nb] = tmp;
	    }
	    return film_array;
	}



	var data = order_by(datas.films.slice(), "views");


	const recupMovie = function (data) {
	    let maDiv = document.createElement("div");
	    let parent = document.querySelector('.movie-selection')
	    parent.innerHTML = '';
	    let noRes = document.createElement("p");
	    noRes.classList.add("noResult", "none");
	    noRes.textContent = "Oh sorry bro, I did not find anything 😕";
	    parent.appendChild(noRes);
	    for (let i = 0; i < data.length; i++) {
	        let maDiv = document.createElement("div");
	        maDiv.classList.add("movie");
	        maDiv.innerHTML = "<img src='" + data[i].img + "' class='imgMovie'>" + "<div class='movie-hover'>" + '<div class="movie-play-icon"></div>' + '<span class="movie-rate">Rate : ' + data[i].rating + "/5" + "</span>" + "</div>" + "<h2 class=tileFirstdiv></h2>" +
	            "<p class='time'></p>" + "<p class='kind' style='color:red;'></p>"
	        parent.appendChild(maDiv);
	    }

	}


	recupMovie(data);

	let closei = document.querySelector(".closeOverlay");
	let imgmovie = document.querySelectorAll('.imgMovie1');


	const checkVideo = function (movie) {
	    if (movie === '') {
	        return 1;
	    } else {
	        return 0;
	    }
	}

	const displayInfo = function (i, data) {
	    let info = document.querySelector(".info");
	    let title = document.querySelector('.tileMovie');
	    let duration = document.querySelector('.duration');
	    let year = document.querySelector(".year");
	    let rating = document.querySelector(".rating");
	    let languageAudio = document.querySelector('.languageAudio');
	    let languageSubtile = document.querySelector(".languageSubtile");
	    let category = document.querySelector(".category");
	    let authors = document.querySelector(".authors");
	    let description = document.querySelector(".description");
	    let img = document.querySelector('.imgMovie1');
	    let video = document.querySelector('.player > .video > video');
	    let views = document.querySelector('.views');
	    let vote = document.querySelector('.vote');

	    info.classList.add("info-open");
	    video.src = data[i].src;
	    title.textContent = data[i].title;
	    year.innerHTML = "<b>Release year :</b> " + data[i].year;
	    authors.innerHTML = "" + "<b>Author :</b> " + data[i].author;
	    duration.innerHTML = "<b>Duration :</b> " + data[i].duration + "";
	    languageAudio.innerHTML = "" + "<b>Language</b> : " + data[i].audio_language;
	    languageSubtile.innerHTML = "" + "<b>Subtile :</b> " + data[i].sub_language;
	    rating.innerHTML = "" + "<b>Average Rating :</b> " + data[i].rating + "/5";
	    category.innerHTML = "" + "<b>Category :</b> " + data[i].category;
	    description.innerHTML = "" + "<b>Description :</b><br><br>" + "" + data[i].description;
	    document.querySelector('.player-title').innerHTML = data[i].title;
	    views.innerHTML = data[i].views.toLocaleString("en-US") + " views";

	    if (data[i].rating < 2) {
	        vote.innerHTML = "<div id=\"star1\" class=\"star star-full\"></div>            <div id=\"star2\" class=\"star star-empty\"></div><div id=\"star3\" class=\"star star-empty\"></div><div id=\"star4\" class=\"star star-empty\"></div><div id=\"star5\" class=\"star star-empty\"></div>"
	    } else if (data[i].rating > 1 && data[i].rating < 3) {
	        vote.innerHTML = "<div id=\"star1\" class=\"star star-full\"></div>            <div id=\"star2\" class=\"star star-full\"></div><div id=\"star3\" class=\"star star-empty\"></div><div id=\"star4\" class=\"star star-empty\"></div><div id=\"star5\" class=\"star star-empty\"></div>"
	    } else if (data[i].rating > 2 && data[i].rating < 4) {
	        vote.innerHTML = "<div id=\"star1\" class=\"star star-full\"></div>            <div id=\"star2\" class=\"star star-full\"></div><div id=\"star3\" class=\"star star-full\"></div><div id=\"star4\" class=\"star star-empty\"></div><div id=\"star5\" class=\"star star-empty\"></div>"
	    } else if (data[i].rating > 3 && data[i].rating < 5) {
	        vote.innerHTML = "<div id=\"star1\" class=\"star star-full\"></div>            <div id=\"star2\" class=\"star star-full\"></div><div id=\"star3\" class=\"star star-full\"></div><div id=\"star4\" class=\"star star-full\"></div><div id=\"star5\" class=\"star star-empty\"></div>"
	    } else if (data[i].rating == 5) {
	        vote.innerHTML = "<div id=\"star1\" class=\"star star-full\"></div>            <div id=\"star2\" class=\"star star-full\"></div><div id=\"star3\" class=\"star star-full\"></div><div id=\"star4\" class=\"star star-full\"></div><div id=\"star5\" class=\"star star-full\"></div>"
	    }

	    // Vote system


	    var star1 = document.querySelector('#star1');
	    var star2 = document.querySelector('#star2');
	    var star3 = document.querySelector('#star3');
	    var star4 = document.querySelector('#star4');
	    var star5 = document.querySelector('#star5');




	    star1.addEventListener('mouseover', function () {
	        resetStars();
	        star1.classList.add('star-full-red');
	        star2.classList.add('star-empty-red');
	        star3.classList.add('star-empty-red');
	        star4.classList.add('star-empty-red');
	        star5.classList.add('star-empty-red');
	    })

	    star2.addEventListener('mouseover', function () {
	        resetStars();
	        star1.classList.add('star-full-red');
	        star2.classList.add('star-full-red');
	        star3.classList.add('star-empty-red');
	        star4.classList.add('star-empty-red');
	        star5.classList.add('star-empty-red');
	    })

	    star3.addEventListener('mouseover', function () {
	        resetStars();
	        star1.classList.add('star-full-red');
	        star2.classList.add('star-full-red');
	        star3.classList.add('star-full-red');
	        star4.classList.add('star-empty-red');
	        star5.classList.add('star-empty-red');
	    })

	    star4.addEventListener('mouseover', function () {
	        resetStars();
	        star1.classList.add('star-full-red');
	        star2.classList.add('star-full-red');
	        star3.classList.add('star-full-red');
	        star4.classList.add('star-full-red');
	        star5.classList.add('star-empty-red');
	    })

	    star5.addEventListener('mouseover', function () {
	        resetStars();
	        star1.classList.add('star-full-red');
	        star2.classList.add('star-full-red');
	        star3.classList.add('star-full-red');
	        star4.classList.add('star-full-red');
	        star5.classList.add('star-full-red');
	    })

	    // RESET STARS

	    star1.addEventListener('mouseout', function () {
	        resetStars();
	    })

	    star2.addEventListener('mouseout', function () {
	        resetStars();
	    })

	    star3.addEventListener('mouseout', function () {
	        resetStars();
	    })

	    star4.addEventListener('mouseout', function () {
	        resetStars();
	    })

	    star5.addEventListener('mouseout', function () {
	        resetStars();
	    })

	    function resetStars() {
	        star1.classList.remove('star-full-red');
	        star2.classList.remove('star-full-red');
	        star3.classList.remove('star-full-red');
	        star4.classList.remove('star-full-red');
	        star5.classList.remove('star-full-red');
	        star1.classList.remove('star-empty-red');
	        star2.classList.remove('star-empty-red');
	        star3.classList.remove('star-empty-red');
	        star4.classList.remove('star-empty-red');
	        star5.classList.remove('star-empty-red');
	    }
        
        function resetStarsALL(){
            resetStars();
            star1.classList.remove('star-full-red-final');
            star2.classList.remove('star-full-red-final');
            star3.classList.remove('star-full-red-final');
            star4.classList.remove('star-full-red-final');
            star5.classList.remove('star-full-red-final');
            star1.classList.remove('star-empty-red-final');
            star2.classList.remove('star-empty-red-final');
            star3.classList.remove('star-empty-red-final');
            star4.classList.remove('star-empty-red-final');
            star5.classList.remove('star-empty-red-final');
            
        }
        
        // STARS CLICKED
        
        star1.addEventListener('click', function () {
            resetStars();
            star1.classList.add('star-full-red-final');
            star2.classList.add('star-empty-red-final');
            star3.classList.add('star-empty-red-final');
            star4.classList.add('star-empty-red-final');
            star5.classList.add('star-empty-red-final');
        })
        
        star2.addEventListener('click', function () {
            resetStars();
            star1.classList.add('star-full-red-final');
            star2.classList.add('star-full-red-final');
            star3.classList.add('star-empty-red-final');
            star4.classList.add('star-empty-red-final');
            star5.classList.add('star-empty-red-final');
        })
        
        star3.addEventListener('click', function () {
            resetStars();
            star1.classList.add('star-full-red-final');
            star2.classList.add('star-full-red-final');
            star3.classList.add('star-full-red-final');
            star4.classList.add('star-empty-red-final');
            star5.classList.add('star-empty-red-final');
        })
        
        star4.addEventListener('click', function () {
            resetStars();
            star1.classList.add('star-full-red-final');
            star2.classList.add('star-full-red-final');
            star3.classList.add('star-full-red-final');
            star4.classList.add('star-full-red-final');
            star5.classList.add('star-empty-red-final');
        })
        
        star5.addEventListener('click', function () {
            resetStars();
            star1.classList.add('star-full-red-final');
            star2.classList.add('star-full-red-final');
            star3.classList.add('star-full-red-final');
            star4.classList.add('star-full-red-final');
            star5.classList.add('star-full-red-final');
        })
        



	}

	const display_first_title = function (data) {

	    let movie = document.querySelectorAll('.movie');
	    let firstTitle = document.querySelectorAll(".tileFirstdiv");
	    let time = document.querySelectorAll(".time");
	    let kind = document.querySelectorAll(".kind")

	    for (let i = 0; i < movie.length; i++) {
	        firstTitle[i].textContent = data[i].title;
	        firstTitle[i].style.marginBottom = '5px';
	        firstTitle[i].style.verticalAlign = 't';
	        time[i].textContent = data[i].duration;
	        time[i].style.marginBottom = ' 5px';
	        kind[i].textContent = data[i].category;
	    }
	}

	const searchByCategory = function (category, data) {
	    let movie = document.querySelectorAll('.movie');

	    for (let i = 0; i < movie.length; i++) {
	        if (data[i].category !== category) {
	            movie[i].classList.add('none');
	        }
	    }
	}

	const clear = function () {
	    let movie = document.querySelectorAll('.movie');

	    for (let i = 0; i < movie.length; i++) {
	        movie[i].classList.remove('none');
	    }
	}

	const moreCategory = function (category) {
	    let and = document.querySelectorAll('.and');
	    let action = document.querySelector(".action");
	    let list = document.querySelectorAll(".list");

	    for (let i = 0; and.length; i++) {
	        and[i].classList.remove('none');
	        and[i].addEventListener("click", function () {
	            for (let j = 0; j < movie.length; j++) {
	                if (data.films[j].category === category)
	                    movie[j].classList.remove("none");
	            }
	        });
	    }
	}

	const checkCategoryInInput = function (data, movie, category, noRes) {
	    var countCategory = 0;
	    var check_all_cat = 0;

	    for (let o = 0; o < data.length; o++) {
	        if (data[o].category !== category) {
	            movie[o].classList.add('none');
	        } else
	            check_all_cat++;
	    }
	    for (let i = 0; i < data.length; i++) {
	        if (data[i].category === category && movie[i].classList[movie[i].classList.length - 1] === 'none') {
	            countCategory++;
	        }
	    }
	    if (countCategory === check_all_cat)
	        noRes.classList.remove('none');
	}

	const searchByInput = function (data, check_cat) {
	    let input = document.querySelector("input");
	    let movie = document.querySelectorAll(".movie");
	    let noRes = document.querySelector(".noResult");

	    input.addEventListener("focus", function () {
	        input.value = "";
	        input.addEventListener("keyup", function () {
	            let searchIn = input.value;
	            var j = 0;
	            for (let i = 0; i < data.length; i++) {
	                if (data[i].title.toUpperCase().indexOf(searchIn.toUpperCase()) !== -1)
	                    movie[i].classList.remove('none');
	                else {
	                    movie[i].classList.add("none");
	                    j++;
	                }
	            }
	            noRes.classList.add('none');
	            if (check_cat === 1)
	                checkCategoryInInput(data, movie, "Action", noRes);
	            else if (check_cat === 2)
	                checkCategoryInInput(data, movie, "Comedy", noRes);
	            else if (check_cat === 3)
	                checkCategoryInInput(data, movie, "Animation", noRes);
	            else if (check_cat === 4)
	                checkCategoryInInput(data, movie, "Horror / Thriller", noRes);
	            if (j === data.length) {
	                noRes.classList.remove('none');
	            }
	            return 1;
	        });
	    });
	}

	const clearNoResult = function () {
	    let noRes = document.querySelector(".noResult");
	    let input = document.querySelector('input');

	    if (input.value !== "") {
	        noRes.classList.add('none');
	    }
	}

	const chooseCategory = function (data) {
	    let action = document.querySelector(".action");
	    let comedy = document.querySelector('.comedy');
	    let animation = document.querySelector('.animation');
	    let thriller = document.querySelector('.thriller');
	    let all = document.querySelector('.all');
	    let movie = document.querySelectorAll('input')
	    let noRes = document.querySelector('.noResult');

	    action.addEventListener("click", function () {
	        clear();
	        searchByCategory("Action", data)
	        searchByInput(data, 1);
	        clearNoResult();
	    });
	    comedy.addEventListener("click", function () {
	        clear();
	        searchByCategory("Comedy", data);
	        searchByInput(data, 2);
	        clearNoResult();
	    });
	    animation.addEventListener("click", function () {
	        clear();
	        searchByCategory("Animation", data);
	        searchByInput(data, 3);
	        clearNoResult();
	    });
	    thriller.addEventListener("click", function () {
	        clear();
	        searchByCategory('Horror / Thriller', data);
	        searchByInput(data, 4);
	        clearNoResult();
	    });
	    all.addEventListener("click", function () {
	        clear();
	        searchByInput(data);
	        clearNoResult();
	    });
	}


	const filterDisplay = function (filter) {
	    let dat = order_by(datas.films.slice(), filter);

	    recupMovie(dat);
	    over();
	    display_first_title(dat);
	    video_info(dat);
	    chooseCategory(dat);
	    searchByInput(dat);
	    chooseCategory(dat);
	}

	const selectFilter = function () {
	    let poular = document.getElementById("Popular");
	    let year = document.getElementById("New_Releases");
	    let alpha = document.getElementById("Recently");
	    let reco = document.getElementById("Recommended");

	    poular.addEventListener("click", function () {
	        filterDisplay("views");
	    });
	    year.addEventListener("click", function () {
	        filterDisplay("year");
	    });
	    alpha.addEventListener("click", function () {
	        filterDisplay("title");
	    });
	    reco.addEventListener("click", function () {
	        filterDisplay("rating");
	    });
	}

	const chooseBurger = function (data) {
	    let cat1 = document.querySelector('.category-1');
	    let cat2 = document.querySelector('.category-2');
	    let cat3 = document.querySelector('.category-3');
	    let cat4 = document.querySelector('.category-4');

	    cat1.addEventListener("click", function () {
	        clear();
	        searchByCategory("Comedy", data);
	        searchByInput(data, 2);
	    });
	    cat2.addEventListener("click", function () {
	        clear();
	        searchByCategory("Animation", data)
	        searchByInput(data, 3);
	    });
	    cat3.addEventListener("click", function () {
	        clear();
	        searchByCategory("Horror / Thriller", data)
	        searchByInput(data, 4);
	    });
	    cat4.addEventListener("click", function () {
	        clear();
	        searchByCategory("Action", data);
	        searchByInput(data, 1);
	    });
	}

	const video_info = function (data) {
	    let movie = document.querySelectorAll('.movie');
	    let info = document.querySelectorAll(".info");
	    let closei = document.querySelector(".closeOverlay");

	    for (let i = 0; i < data.length; i++) {
	        movie[i].addEventListener("click", function () {
	            document.querySelector('.info').classList.add("info-open");
	            document.querySelector('.info').classList.remove("info-close");
	            document.querySelector('.info').classList.remove("none");
	            document.querySelector('.info-open').style.display = "";
	            document.body.style.overflow = "hidden";
	            notRecording = false;
	            player.currentTime = 0;
	            displayInfo(i, data);
	            var timerinfoopen;
	            timerinfoopen = setTimeout(function () {
	                document.querySelector('.homepage').style.display = "none";
	                document.body.style.overflow = "";
	                window.scrollTo(0, 0);
	                playpause();
	            }, 1000);

	        });
	    }
	}


	over();
	display_first_title(data)
	video_info(data);
	selectFilter();
	chooseCategory(data);
	searchByInput(data);
	chooseBurger(data);

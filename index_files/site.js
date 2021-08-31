(function($) {
"use strict";

	var mobile = isMobileDevice();
	var mobileBreakpoint = 740;
	var cssBreakpoint = 980;
	//var imgDispl = ($(window).width() <= cssBreakpoint)? 'mobi' : ( ($(window).width() <= 1366)? 'desk' : 'full' );
	var imgDispl = ($(window).width() <= cssBreakpoint)? 'mobi' : 'desk';
	var currImgDispl = imgDispl;

	if(mobile){ $('body').addClass('is-mobile'); } else { $('body').addClass('is-desktop'); }
	//if($(window).width() <= cssBreakpoint){ $('body').addClass('is-css-mobile'); } else { $('body').addClass('is-css-desktop'); }	

	var notifLand = $('#nma_landing-acknowledgement');

	var isHomepage_v1 = ($("#home-slider").length>0);
	var isHomepage_v2 = ( $('#rgbKineticSlider').length>0 );
	var isHomepage_v3 = ( $('#content>#slider').length>0 );
	var isHomepage_v4 = ( $('#content__frame').length>0 );
	var isHomepage = ( isHomepage_v1 || isHomepage_v2 || isHomepage_v3 || isHomepage_v4 );

	var hasFeed = ($('#section-story-feed').length>0);
	var vimeoIframes = $('.vimeo-wrap iframe');
	var vimeoFeedIframes = $('.vimeo-hover iframe');

	//fix for 100vh on mobile
	var vh = window.innerHeight;
	document.documentElement.style.setProperty('--100vh', `${vh}px`);	

	var scrollButton = $('#scroll-to-explore');
	var scrollLine = $('#scroll-down-line');
	//init load transition
	AOS.init({
		once: false,
		duration: 500,
		easing: 'ease-in-out',
		anchorplacement: 'bottom-bottom',
		offset: 80,
	});

	//init images
	initImages(currImgDispl);
	initHomeBannerSlider();
	initPageSliders();
	setIframes(vimeoIframes); setIframes(vimeoFeedIframes, true);
	scaleIframes(vimeoIframes); scaleIframes(vimeoFeedIframes, true);


	//Homepage animation timeline, do not autoplay	
	////fn -> tl.call(myFunction, ["param1", "param2"]);//step
	////fn -> .add( function(){ console.log('BAM!') } )//add to step
	var header_tl = gsap.timeline({repeat: 0, paused: true});
	header_tl.fromTo(".step-explore", { y: -100, opacity: 0}, {duration: 0.35, y: 0, opacity: 1});
	//header_tl.to("#step-site-menu", {duration: 0.35, y:0,  x: 0, opacity: 1}, "-=0.35");//.step-left

	if( isHomepage_v1 ){
		//if homepage
		var home_tl = gsap.timeline({repeat: 0, paused: true});
		home_tl.fromTo("#site-main", { opacity: 0}, { opacity: 1, duration: 1.35});
		home_tl.fromTo("#site-header", { opacity: 0}, { opacity: 1, duration: 1.35}, "-=1.35");

		home_tl.fromTo("#step-title", {y: 100, opacity: 0}, {duration: 0.35, y: 0, opacity: 1, delay: 0.35});
		home_tl.fromTo("#step-tagline", {y: 100, opacity: 0}, {duration: 0.35, y: 0, opacity: 1}, "-=0.15");
		home_tl.fromTo("#step-nma-logo", {y: 100, opacity: 0}, {duration: 0.35, y: 0, opacity: 1}, "-=0.15");
		home_tl.call(drawGridColLines);
		home_tl.fromTo(".step-left", {x: -100, opacity: 0}, {duration: 0.35, x: 0, opacity: 1});
		home_tl.fromTo(".step-right", {x: 100, opacity: 0}, {duration: 0.35, x: 0, opacity: 1}, "-=0.35");
		home_tl.add( function(){ $("#home-slider").slick("slickPlay"); } );
		home_tl.to("#step-header-border", { duration: 1.05, height: '100%' }, "-=0.7");
		home_tl.to("#step-scroll", { opacity: 1, duration: 0.35, delay: 0.7});	
		home_tl.fromTo("#scroll-down-line", {height: 0, opacity: 0}, {height: rem(8.2), opacity: 1}, "-=0.7");
		home_tl.call(drawSetScollLine);


	} else if(isHomepage_v2 || isHomepage_v3 || isHomepage_v4){
		//if homepage V2
		var home_tl = gsap.timeline({repeat: 0, paused: true});
		home_tl.fromTo("#site-main", { opacity: 0}, { opacity: 1, duration: 1.35});
		home_tl.fromTo("#site-header", { opacity: 0}, { opacity: 1, duration: 1.35}, "-=1.35");

		home_tl.fromTo("#step-title", {y: 100, opacity: 0}, {duration: 0.35, y: 0, opacity: 1, delay: 0.35});
		home_tl.fromTo("#step-tagline", {y: 100, opacity: 0}, {duration: 0.35, y: 0, opacity: 1}, "-=0.15");
		home_tl.fromTo("#step-nma-logo", {y: 100, opacity: 0}, {duration: 0.35, y: 0, opacity: 1}, "-=0.15");
		home_tl.call(drawGridColLines);
		home_tl.fromTo(".step-left", {x: -100, opacity: 0}, {duration: 0.35, x: 0, opacity: 1});
		home_tl.fromTo(".step-right", {x: 100, opacity: 0}, {duration: 0.35, x: 0, opacity: 1}, "-=0.35");
		home_tl.to("#step-header-border", { duration: 1.05, height: '100%' }, "-=0.7");
		home_tl.to("#step-scroll", { opacity: 1, duration: 0.35, delay: 0.7});	
		home_tl.fromTo("#scroll-down-line", {height: 0, opacity: 0}, {height: rem(8.2), opacity: 1}, "-=0.7");
		home_tl.call(drawSetScollLine);


	} else {

		//if not homepage
		var home_tl = gsap.timeline({repeat: 0, paused: false});

		if( $('#step-title').length>0 ){ 
			home_tl.fromTo("#step-title", {y: 100, opacity: 0}, {duration: 0.35, y: 0, opacity: 1, delay: 0.35});
		}
		if( $('#step-tagline').length>0 ){
			home_tl.fromTo("#step-tagline", {y: 100, opacity: 0}, {duration: 0.35, y: 0, opacity: 1}, "-=0.15");
		}		


		home_tl.fromTo("#site-main", { opacity: 0}, { opacity: 1, duration: 0.35});
		home_tl.fromTo("#site-header", { opacity: 0}, { opacity: 1, duration: 0.35}, "-=0.35");

		home_tl.call(drawGridColLines);
		home_tl.fromTo(".step-left", {x: -100, opacity: 0}, {duration: 0.35, x: 0, opacity: 1});
		home_tl.fromTo(".step-right", {x: 100, opacity: 0}, {duration: 0.35, x: 0, opacity: 1}, "-=0.35");
		//if(hasFeed){ 
			home_tl.fromTo(".step-explore", {x: 0, y :-100, opacity: 0}, {duration: 0.35, x: 0, y :0, opacity: 1}, "-=0.35"); 
		//}	

		home_tl.to("#step-header-border", { duration: 1.05, height: '100%' }, "-=0.7");
		//home_tl.to("#step-scroll", { opacity: 1, duration: 0.35, delay: 0.7});	
		//home_tl.fromTo("#scroll-down-line", {height: 0, opacity: 0}, {height: rem(8.2), opacity: 1}, "-=0.7");
		//home_tl.fromTo("#step-explore-sitename", { y: -100, opacity: 0}, {duration: 0.35, y: 0, opacity: 1}, "-=1.75");
	}


	$('#story-filters-clear').on('click', function(e){
		e.preventDefault();

		//[edit 29/1/21] Change form actions to GET
		$('#site-story-filters input[type="checkbox"]').prop('checked',false);//checkboxes (contributor is radio)

		$('#site-story-filters input#choice_sct-guest').prop('checked',false);//dont need this, but just in case
		$('#site-story-filters input#choice_sct-all').prop('checked',true);

		$('#form-story-filters').submit();//submit clear
	});

	$('#story-filters-toggle').bind('click', function(e){
		e.preventDefault();
		$('#site-story-filters').toggleClass('open');
		$('html, body').toggleClass('filter-open');
	});
	$('#story-filters-close, #story-filters-page-close').bind('click', function(e){
		e.preventDefault();
		$('#site-story-filters').removeClass('open');
		$('html, body').removeClass('filter-open');
		$('#site-main, #site-header .header-horizontal, #site-header .header-vertical').css('padding-top','');
	});
	

	var accordions = $('.transcript-acc');
	if( accordions.length>0 ){
		accordions.each(function(ind, elem) {
			let acc = $(this);
			let acc_h = acc.find('a.acc-head');
			let acc_b = acc.find('.acc-body');

			acc_b.slideUp(0);
			acc_h.bind('click', function(e){
				e.preventDefault();
				acc.toggleClass('closed');
				acc_b.slideToggle(350);

				if( acc.hasClass('closed') ){
					acc_h.find('.acc-head-label>span').text( 'View transcript' );
					//acc_h.find('.acc-head-toggle>span').text( '' );
				} else {
					acc_h.find('.acc-head-label>span').text( 'Close transcript' );
					//acc_h.find('.acc-head-toggle>span').text( 'Close' );
				}
			});
		});
	}	

	var videoHoverTimeout;
	//var stickyLine = $('#top-sticky-line');
	//var stickyLineInit = 180;

	//On page content load
	var scrollTop = $(window).scrollTop();
	$( window ).on("load", function(){
		initLandingCookies();//contains: home_tl.play();
		placeStoryHeading();

		//homepage/page header
		//pageHeaderDisplayToggle();
		if( isHomepage && scrollTop < 30 ){ $('#site-header').addClass('share-on'); } 
		else if(isHomepage){ $('#site-header').removeClass('share-on'); }

		//video
		if(!mobile){
			//var vimeoIframeHovers = $('.vimeo-hover iframe');
			var vimeoHovers = $('.vimeo-hover');
			vimeoHovers.bind('mouseover', function(e) {
				let iframe = $(this).find('iframe').first();
				let vid = new Vimeo.Player( iframe );
				//let vid_start = iframe.data('start')?? 0.00;
				let vid_start = iframe.data('start');
				if(!vid_start){ vid_start = 0.00; }
				let vid_time = iframe.data('time')? (iframe.data('time')*1000) : 5000;//1~10s
				//let vid_parent = $(this);

				vid.setCurrentTime(vid_start);

				var playPromise = vid.play();//play video
				if (playPromise !== undefined) {
			    playPromise.then(_ => {
			      // Automatic playback started!
			      // Show playing UI.

			      	$(this).removeClass('hover-out');
			      	//v1: pause when get end loop
					/*
			        videoHoverTimeout = setTimeout(function() {
			            vid.pause();//pause video
			            vid_parent.addClass('hover-out');
			        }, vid_time);
			        */
			        //v2: loop in section
			        (function autoloopVideo(){         
				        let oneloop = setTimeout(function() {
				            vid.setCurrentTime(vid_start);
				        }, vid_time);
				        setTimeout(vid_time, vid_time+350); 
				    })();	
			    		      
			    }).catch(error => {
			      // Auto-play was prevented
			      // Show paused UI.
			    });
			  }


			}).bind('mouseout', function(e) {
				let iframe = $(this).find('iframe').first();
				let vid = new Vimeo.Player( iframe );
				$(this).addClass('hover-out');
				//vid.pause();//pause video
				//vid.setCurrentTime(0.00);//reset video
				vid.unload();//reset to show poster image
				clearTimeout(videoHoverTimeout);
			}).bind('click', function(e){
				window.location.href = $(this).closest('a').attr('href');
			});	
		}

	});


	//Dynamic screen resize
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	var prevW = winWidth;
	var prevH = winHeight;
	$(window).resize(function(){
		winWidth = $(window).width();
		winHeight = $(window).height();

		scaleIframes(vimeoIframes);//post - now checking for both width & height resize

		if( winWidth != prevW ){
			prevW = winWidth;
			//imgDispl = ($(window).width() <= cssBreakpoint)? 'mobi' : ( ($(window).width() <= 1366)? 'desk' : 'full' );
			imgDispl = ($(window).width() <= cssBreakpoint)? 'mobi' : 'desk';
			if( imgDispl!=currImgDispl ){ currImgDispl = imgDispl; initImages(currImgDispl); }

			scaleIframes(vimeoFeedIframes, true);//feed
			placeStoryHeading();
			initPageSliders();//'unslick' applied on < cssBreakpoint

			//close menu
			$('html, body').removeClass('menu-open');
			$('#site-menu-burger').removeClass('active');
			$('#menu-label').text('Closed');
			//close filter
			$('html, body').removeClass('filter-open');
			$('#site-story-filters').removeClass('open')
			$('#site-main, #site-header .header-horizontal, #site-header .header-vertical').css('padding-top','');
		}

		if( winHeight != prevH ){
			prevH = winHeight;
			vh = window.innerHeight;
			document.documentElement.style.setProperty('--100vh', `${vh}px`);
		}

	});

	//Dynamic scroll
	var lastScrollTop, scrollTop = 0;
	$(window).scroll(function(){
		scrollTop = $(window).scrollTop();
		if( scrollTop > 1 ){  
			$('#site-header, #site-main').addClass('scrolling'); 
			//$('a#link-back-to-top').fadeIn(0);
		} else{ 
			$('#site-header, #site-main').removeClass('scrolling'); 
			//$('a#link-back-to-top').fadeOut(0);
		}

		//homepage/page header
		pageHeaderDisplayToggle();

		//homepage banner
		if( scrollLine.length>0 ){ scrollLine.css('height', scrollTop/2+rem(9) ); }
		if( scrollButton.length>0 && scrollTop > 10 ){ scrollButton.closest('.banner-scroll-container').addClass('noblink'); } 
		else { scrollButton.closest('.banner-scroll-container').removeClass('noblink'); }

		//scrolling classes
		if ( scrollTop > lastScrollTop ){
	    	$('body, #site-header, #site-main').removeClass('scroll-up').removeClass('scroll-down');// downscroll
	   	} else {
	    	$('body, #site-header, #site-main').addClass('scroll-up').removeClass('scroll-down');// upscroll
	   	}
	   	lastScrollTop = scrollTop;
	});

	$('#site-menu-burger').bind('click', function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		if($(this).hasClass('active')){ $('#menu-label').text('Open'); } else { $('#menu-label').text('Closed'); }
		$('html, body').toggleClass('menu-open');
	});

	var headMenuItems = $('#site-mobile-menu ul.menu-headnav li a');
	headMenuItems.mouseover(function(e) {
		headMenuItems.not(this).addClass('fade');
	}).mouseout(function(e) {
		headMenuItems.not(this).removeClass('fade');
	});


	var feedPromo = $('#section-story-prompt');
	if( feedPromo ){
		//https://connekthq.com/plugins/ajax-load-more/docs/callback-functions/
		window.almComplete = function(alm){
			let countPg = $('#ajax-load-more .alm-reveal').length;
			let promoCopy = feedPromo.clone().attr('id','alm-prompt-'+countPg);
			//append section if there isn't already one, and if items == 20
    		$('#ajax-load-more .alm-reveal').each(function(ind, elem) {
    			if( !$(this).find('.section_home-stories').length && $(this).find('.story-item').length>=20 ){
    				//$(this).append(promoCopy);
    				//$('#alm-prompt-'+countPg).wrap('<div id="alm-prompt-'+countPg+'-grid" class="story-item story-promo-break"></div>');
    				promoCopy.wrap('<div id="alm-prompt-'+countPg+'-grid" class="story-item story-promo-break"></div>').parent().appendTo(this);
    			}
    		});
		};
	}

	//smooth scrolling to anchor by id
	$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(e) {
	    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')  && location.hostname == this.hostname) {
			var target = $(this.hash); target = target.length ? target : $('[id=' + this.hash.slice(1) + ']');
			if (target.length) {
				e.preventDefault();
				var offset = 0;
				$('html, body').animate({ scrollTop: target.offset().top - offset }, 800, function() {
					var $target = $(target); 
					$target.focus();
					if ($target.is(":focus")) { return false; } else { $target.attr('tabindex','-1'); $target.focus(); };
				});
			}
	    }
	});

	$('body.single-story a.go-to-stories').bind('click', function(e){
		e.preventDefault();
		//console.log('ref: '+document.referrer +' match to '+ $(this).attr('href'));
		if( document.referrer == $(this).attr('href') || document.referrer.split(/[?#]/)[0] == $(this).attr('href') || (document.referrer == $(this).data('home') || document.referrer == $(this).data('home')+'/') ){
			window.history.back();
		} else {
			window.location.href = $(this).attr('href');
		}
	});

	$('a#link-back-to-stats').on('click', function(e){
		e.preventDefault();
		//go back to stats page
		if( document.referrer == $(this).attr('href') || document.referrer.split(/[?#]/)[0] == $(this).attr('href') || (document.referrer == $(this).data('home') || document.referrer == $(this).data('home')+'/') ){
			window.history.back();
		} else {
			window.location.href = $(this).attr('href');
		}
	});
	$('a#link-distressingmedia-enable, a.link-distressingmedia-enable').on('click', function(e){
		e.preventDefault();
		//show content
		let showthis = $(this).closest('.content.distressingmedia');
		showthis.removeClass('distressingmedia');
		$(this).remove();
	});


	function pageHeaderDisplayToggle(){
		if(imgDispl=='desk'){
			let offset = $(window).height() + $('#s2').height() - 74;
			if( isHomepage && scrollTop > offset ){ header_tl.play(); $('#site-header').addClass('solid'); }
			else if( isHomepage ){ header_tl.reverse(); $('#site-header').removeClass('solid'); }
			else if( scrollTop >= 140 ){ $('#site-header').addClass('solid'); }
			else{ $('#site-header').removeClass('solid'); }
			//else if( scrollTop >= $('#top-sticky').offset().top ){ $('#site-header').addClass('solid'); }
		} else {
			//let offset = $(window).height() + $('#s2').height() - 74;
			if( isHomepage && scrollTop > ($(window).height()-74) ){ header_tl.play(); $('#site-header').addClass('solid') }
			else if( isHomepage ){ header_tl.reverse(); $('#site-header').removeClass('solid') }
			else if( scrollTop >= 74 ){ $('#site-header').addClass('solid'); }
			else{ $('#site-header').removeClass('solid'); }

			//extra class for home
			if( isHomepage && scrollTop < 30 ){ $('#site-header').addClass('share-on'); } 
			else if(isHomepage){ $('#site-header').removeClass('share-on'); }

		}
	}
	function drawGridColLines(){
 		$('.grid-item-divider').addClass('draw');
	}
	function drawSetScollLine(){
 		$('#scroll-down-line').addClass('drawn');
	}

	function initLandingCookies(){
		if( notifLand.length > 0 ){
			var notifID = notifLand.attr('id');
			var notifShow = notifLand.data('show');
			var notifExpi = notifLand.data('expire');
			//createCookie(notifID, "1", "0");//debug/reset
			if (readCookie( notifID )) {
				//console.log('cookie');
				notifLand.remove();
				home_tl.play();
			} else {
				//console.log('no-cookie');
				//$(window).scrollTop(0);
				window.setTimeout(function() { $(window).scrollTop(0); }, 0);
				$('body').addClass('noscroll');
				notifLand.fadeIn(200).delay(notifShow).fadeOut(500, function(e){ 
					home_tl.play(); 
					$('body').removeClass('noscroll'); 
					createCookie(notifID, "1", notifExpi);
				});
			}
		} else {
			home_tl.play();
		}
	}
	function createCookie(name, value, days) {
		days = parseFloat(days);
			if (days > 0) {
					var date = new Date();
					date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));//x * hours * mins * sec * millisec
					var expires = "; expires=" + date.toGMTString();
			} else {
				//expire imadiately, set blank to never expire
				var date = new Date();
				var expires = "; expires=0"+ date.toGMTString();
			}
			document.cookie = name + "=" + value + expires + "; path=/";
	}
	function readCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') c = c.substring(1, c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
	}
	function initHomeBannerSlider(){
		var homeSlider = $('#home-slider');
		if(homeSlider){
			homeSlider.on('init', function(slick){
				$('#home-slider .banner-slide img').each(function(j, el) {
					//init stick lazyload for current image size
					let imgUrl = $(this).closest('.banner-slide').data('banner-'+imgDispl);
					$(this).data('lazy', imgUrl );
				});
			});
			homeSlider.slick({
			    infinite: true,	
			    //autoplay: false,		    
			    autoplay: true,
			    autoplaySpeed: 2200,
			    swipe: true,
			    fade: true,
			    //vertical: true,
			    cssEase: 'ease',
			    lazyLoad: 'progressive',
			    slidesToShow: 1,
			    slidesToScroll: 1,
			    speed: 500,
		  		variableWidth: false,
		  		pauseOnFocus: false,
			    pauseOnHover: false,
			    pauseOnDotsHover: false,
			    dots: false,
			    arrows: false,
			});
			//.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			//}).on('afterChange', function(event, slick, currentSlide, nextSlide){
			//});
			homeSlider.slick("slickPause");			
		}
	}

	function placeStoryHeading(){
		//mobileBreakpoint=740|cssBreakpoint-980
		if( $(window).width() > 1024 ){
			//$('#r1-c1-media').prependTo( $('#r1') );
			$('#r1-c2-heading').appendTo( $('#r1') );
		} else {
			$('#r1-c2-heading').prependTo( $('#r1') );
		}
	}
	function initPageSliders(){
		$( ".story-gallery:not(.slick-initialized)" ).each(function( i ) {
			var id = $(this).attr('id');
			$('#'+id+'-prev').css('height','0');
			$(this).slick({
			    infinite: false,			    
			    autoplay: false,
			    autoplaySpeed: 3200,
			    swipe: true,
			    slidesToShow: 1,
			    slidesToScroll: 1,
			    centerMode: false,
			    speed: 500,
		  		variableWidth: true,
		  		pauseOnFocus: true,
			    pauseOnHover: false,
			    pauseOnDotsHover: true,
			    dots: true,
			    appendDots: $('#'+id+'-nav .dots'),
			    arrows: true,
			    prevArrow: $('#'+id+'-prev'),
		      	nextArrow: $('#'+id+'-next'),
		      	responsive: [ { breakpoint: mobileBreakpoint, settings: "unslick" } ],
			}).on('afterChange', function(event, slick, currentSlide) {
				if( currentSlide == 0 ){
    				$('#'+id+'-prev').css('height','0');
    			} else {
    				$('#'+id+'-prev').css('height','');
    			}
				if (slick.$slides.length == currentSlide + slick.options.slidesToScroll) {
       				$('#'+id+'-next').css('height','0');
    			} else {
    				$('#'+id+'-next').css('height','');
    			} 
			});	
		});

	}

	function initImages(size){
		$('*[data-banner-'+size+']').each(function(i, elem) {
			$(this).css( 'background-image', 'url('+ $(this).data('banner-'+size) +')' );
		});
		$('img[data-img-'+size+']').each(function(i, elem) {
			$(this).attr( 'src', $(this).data('img-'+size) );
		});
	}	
	function setIframes(iframes, capToInit=false){
		iframes.each(function(i, e) {
			//var dimW = $(this).attr('width')?? 640;
			var dimW = $(this).attr('width');
			if(!dimW){ dimW = 640; }
			//var dimH = $(this).attr('height')?? 360;
			var dimH = $(this).attr('height');
			if(!dimH){ dimH=360; }
			$(this).data('width',dimW); //set for reference
			$(this).data('height',dimH);

			if(!capToInit){
				$(this).css({'width':'100%'});		
				//$(this).css({'width':'100%', 'max-width':'1440px'}); //cap width?	in scaleIframes() function 
			}
		});
	}
	//=>scaleIframes(vimeoIframes); scaleIframes(vimeoFeedIframes, true);
	function scaleIframes(iframes, capToInit=false){
		//need be set to css width=100%, height/width scales defined
		iframes.each(function(i, e) {
			var dimW = ($(this).data('width'))? $(this).data('width') : $(this).attr('width');
			var dimH = ($(this).data('height'))? $(this).data('height') : $(this).attr('height');
			
			if(!capToInit){
				//in story - show fullscreen until 1440
				var thisw = $(this).width();
				if( thisw > 1440 ){ thisw = 1440; } //cap width at 1440px (video to left instead of centre)	
			} else {
				//in feed - show max 640px but size up/down on smaller screens
				if( $(window).width() <= cssBreakpoint ){
					var thisw = $(this).parent().width();
				} else {
					var contw = $(this).closest('.flex-container').width() -  ($(this).closest('content').css('padding-left'))*2;
					var thisw = (contw < dimW) ? contw : $(this).width();
					if( thisw > dimW ){ thisw = dimW; }
				}
			}

			var thish = dimH;
			thisw = thisw;
			var newh = Math.round(thisw * dimH / dimW);

			//now check height fits in viewport!
			//but not on feed (!capToInit)
			let maxH = $(window).height() - 140 - 80;
			if(!capToInit && newh > maxH ){
				newh = maxH;
				thisw =  Math.round(newh * dimW / dimH);
			}

			$(this).attr('width',thisw);
			$(this).attr('height',newh);
		});
	}

	function isMobileDevice(){
		if( /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) ){ return true; }
		return false;
	}
	function rem(input) {
	    var emSize = parseFloat($("body").css("font-size"));
	    return (emSize * input);
	}
	$.fn.isInViewport = function() {
	    var elementTop = $(this).offset().top;
	    var elementBottom = elementTop + $(this).outerHeight();
	    var viewportTop = $(window).scrollTop();
	    var viewportBottom = viewportTop + $(window).height();
	    return elementBottom > viewportTop && elementTop < viewportBottom;
	};
	
	


})(jQuery);
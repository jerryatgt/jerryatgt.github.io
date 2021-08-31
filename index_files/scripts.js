(function($) {


	if( $('body').hasClass('page-template-tpl-datavis') ){ 


		$(window).on("load", function() {
			animateNumber();
			// click();
		});

		$(window).scroll(function() {
			animateNumber();
			storyFixed();
			storyOpacity();
		});

		$(window).resize(function() {});
		
		function click(){
			$("body").on("click","#all-age-groups .chart ul li .a-box,#common-themes .chart ul li .a-box",function(){
				if($(window).width()<=740){
					if($(this).parent("li").hasClass("active")){
						$(this).parent("li").removeClass("active")
					}else{
						$(this).parent("li").addClass("active").siblings("li").removeClass("active");
					}
				}
			})
		}

		function animateNumber() {
			var wTop = $(window).scrollTop(),
				wHeight = $(window).height(),
				wBottom = wTop + wHeight;
			$(".wowo:not(.animated)").each(function () {
				var me = $(this),
					meTop = me.offset().top,
					meHeight = me.innerHeight(),
					meBottom = meTop + meHeight,
					limitTop = wTop - meHeight,
					limitBottom = wBottom + meHeight;
				if (meTop > limitTop && meBottom < limitBottom) {
					me.addClass("animated");
				}
			});
			$("#common-themes .chart:not(.active)").each(function() {
				var me = $(this),
					meTop = me.offset().top,
					meHeight = me.innerHeight(),
					meBottom = meTop + meHeight,
					limitTop = wTop - meHeight,
					limitBottom = wBottom + meHeight;
				if(meTop > limitTop && meBottom < limitBottom) {
					me.addClass("active");
					me.find(".num").each(function() {
						var num = parseInt($(this).html());
						$(this).prop('number', 0).animateNumber({
							number: num
						},
						2000
						);
					})
					me.find(".percent .bar").each(function() {
						$(this).css("width",$(this).attr("data-width"));
					})
				}
			})
			$("#all-age-groups .chart:not(.active)").each(function() {
				var me = $(this),
					meTop = me.offset().top,
					meHeight = me.innerHeight(),
					meBottom = meTop + meHeight,
					limitTop = wTop - meHeight,
					limitBottom = wBottom + meHeight;
				if(meTop > limitTop && meBottom < limitBottom) {
					me.addClass("active");
					me.find(".num").each(function() {
						var num = parseInt($(this).html());
						$(this).prop('number', 0).animateNumber({
							number: num
						},
						2000
						);
					})
					me.find(".percent .bar").each(function() {
						$(this).css("height",$(this).attr("data-height"));
					})
				}
			})
			//$(".data-visualisation .section_home-banner .inner .content .banner-title:not(.active)").each(function() {
			$("body.page-template-tpl-datavis #step-title.banner-title:not(.active)").each(function() {
				var me = $(this),
					meTop = me.offset().top,
					meHeight = me.innerHeight(),
					meBottom = meTop + meHeight,
					limitTop = wTop - meHeight,
					limitBottom = wBottom + meHeight;
				if(meTop > limitTop && meBottom < limitBottom) {
					me.addClass("active");
					var num = me.data('to');//parseInt(me.html());
					me.prop('number', 0).animateNumber({
							number: num
						},
						2000
					);
				}
			})
		}

		function storyFixed(){
			if( $("#random-story").length>0 ){
				var sh = $(window).scrollTop();
				var vh = $(window).outerHeight(true);
				var boxTopHeight = $("#random-story").offset().top;
				var boxBottomHeight = $("#random-story").offset().top + $("#random-story").outerHeight(true);
				
				if(sh < boxTopHeight){
					$("#random-story").removeClass("fixed").removeClass("poaBottom");
				}
				if(sh > boxTopHeight && sh < boxBottomHeight - vh){
					$("#random-story:not(.fixed)").addClass("fixed").removeClass("poaBottom");
				}
				if(sh > boxBottomHeight - vh){
					$("#random-story:not(.poaBottom)").removeClass("fixed").addClass("poaBottom");
				}
			}
		}
		
		function storyOpacity(){
			if( $("#random-story").length > 0 ){
				var sh = $(window).scrollTop();
				var vh = $(window).outerHeight(true);
				$("#random-story .group").each(function(){
					var boxTopHeight = $(this).offset().top;
					var boxBottomHeight = $(this).offset().top + $(this).outerHeight(true);
					if(sh < boxTopHeight - vh/2){
						$(this).find(".data-item.active").removeClass("active");
					}
					if(sh > boxTopHeight - vh/2){
						$(".text .group .data-item").removeClass("active");
						$(this).find(".data-item:not(.active)").addClass("active");
					}
					if(sh > boxBottomHeight - vh/2){
						$(this).find(".data-item.active").removeClass("active");
					}
					return;
				})
			}
		}


	}


})(jQuery);

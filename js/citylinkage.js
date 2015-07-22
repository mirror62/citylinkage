;(function($){
	$.fn.extend({
		citylinkage:function(options){
			var opts = $.extend({}, defaluts, options);
			return this.each(function(){
				var $citylinkage = $(this);

				// create html structure 
				$citylinkage
				.attr("tabindex","0")
				.wrap('<div class="city-select" />');
				var zindex = parseInt($citylinkage.attr("data-index"));				
				var $cityselect = $citylinkage.closest(".city-select");
				var cityselectwarpHTML = 
				'<div class="city-select-warp">'
				+	'<ul class="city-select-tab clearfix">'
				+		'<li class="active">省份</li>'
				+		'<li>城市</li>'
				+		'<li>县区</li>'
				+	'</ul>'
				+	'<ul class="city-select-box">'
				+		'<li class="city-select-content"></li>'
				+		'<li class="city-select-content" style="display:none;"></li>'
				+		'<li class="city-select-content" style="display:none;"></li>'
				+	'</ul>'
				+'</div>';
				$cityselect.css("zIndex",zindex).append(cityselectwarpHTML)

				var provincesHtml = '';
				var $cityselectcontent = $cityselect.find(".city-select-content");
				$cityselectcontent.eq(0).html(eachData(provinces));

				var $warp = $cityselect.find(".city-select-warp");
				var $tab = $warp.find(".city-select-tab");
				var $tabli = $tab.find("li");
				var $citybox = $warp.find(".city-select-box");
				var $province = $('#' + opts.id1);
				var $city = $('#' + opts.id2);
				var $district = $('#' + opts.id3);
				var subs = ''; 
				var subshtml = '';
				var subschild = '';
				var subschildhtml = '';
				var LINE = '<span>\/</span>';
				
				// show $wrap
				$citylinkage.click(function(){$warp.show();})

				// close $wrap
				$(document).on("click",function(e){
					var $target = $(e.target);
					if($target.closest(".city-select-warp").length == 0 && $target.closest(".citylinkage").length == 0){
						$warp.hide();
					}
				})

				// click tab
				$tabli.click(function(){
					var $this = $(this);
					var index = $this.index();
					$tabli.removeClass("active");
					$this.addClass("active");
					$cityselectcontent.hide().eq(index).show();
					var activeVal = $(".cityhid").eq(index).val();
					if(activeVal.length > 0){
						$cityselectcontent.eq(index).find("a").each(function(){
							var $thiss = $(this);
							var nameVal = $thiss.attr("data");
							if(nameVal == activeVal){
								$thiss.addClass('active');
							}
						})
					}
				})

				$cityselect.on("click",".city-select-content a",function(){
					var $this = $(this);
					var name = $this.text();
					var citydata = $this.attr("data");
					var cscIndex = $this.closest(".city-select-content").index();
					var province = $province.attr("data");					
					var city = $city.attr("data");					

					$(".city-select-content a").removeClass("active");
					$this.addClass('active');

					if(cscIndex == 0){
						subs = checksubs(provinces,citydata);
						subshtml = eachData(subs);
						$cityselectcontent.eq(1).html(subshtml);
						$province.attr('data',name).val(citydata);
						$citylinkage.html(name);
						
						// clear area
						clearData(opts.id2)
						clearData(opts.id3)
						subschild = subschildhtml = '';
						$cityselectcontent.eq(2).empty();
						tabjump(1)
					} else if(cscIndex == 1){
						subschild = checksubs(subs,citydata);
						subschildhtml = eachData(subschild);
						$cityselectcontent.eq(2).html(subschildhtml);
						$city.val(citydata).attr('data',name);
						province = $province.attr('data');
						$citylinkage.html(province + LINE + name);

						// clear area
						clearData(opts.id3);
						tabjump(2);
					} else if(cscIndex == 2){
						$district.val(citydata).attr('data',name);
						city = $city.attr('data');
						$citylinkage.html(province + LINE + city + LINE + name);
						$warp.hide();
					}
				})

				function tabjump(index){
					$tabli.removeClass('active').eq(index).addClass('active');
					$cityselectcontent.hide().eq(index).show();
				}
			})
		}
	})
	var defaluts = {
		id1 : 'province',
		id2 : 'city',
		id3 : 'district'
	};
	function eachData(dataElement){
		var htmlElement = '';
		$.each(dataElement,function(i,v){
			htmlElement = htmlElement + '<a href=\"javascript:void(0);\" title=\"'+ v.name +'\" data=\"' + v.value + '\">' + v.name + '<\/a>'
		});
		return htmlElement;
	}
	function checksubs(dataElement,choosedata){
		var subs = '';
		$.each(dataElement,function(i,v){
			if(v.value == choosedata){
				subs = v.subs;
				return false;
			}
		})
		return subs;
	}
	function clearData(id){
		$('#'+ id).attr('data','').val('');
	}
})(jQuery)
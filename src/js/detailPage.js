//商品轮播
$(function() {
	let pictureShow = document.querySelector('.pictureShow');
	let ul = pictureShow.children[0];

	// 无缝滚动关键一:复制第一张到最后
	ul.appendChild(ul.children[0].cloneNode(true));

	let len = ul.children.length;

	// 初始化:
	// 计算ul的宽度
	// li的宽度*数量
	ul.style.width = pictureShow.clientWidth * len + 'px';

	// 默认索引值
	let index = 0;

	// 添加页码
	let page = document.createElement('div');
	page.className = 'page';

	var content = '';
	// 往.page中添加页面
	for(let i = 0; i < len - 1; i++) {
		content += `<span></span>`
	}
	page.innerHTML = content;
	page.children[index].className = 'active';
	// 把page写入页面
	pictureShow.appendChild(page);

	//动画效果
	let timer = setInterval(autoPlay, 3000);

	// 鼠标移入移出
	pictureShow.onmouseover = function() {
		clearInterval(timer);
	}

	pictureShow.onmouseout = function() {
		timer = setInterval(autoPlay, 3000);
	}

	function autoPlay() {

		index++;

		show();
	}

	function show() {
		// 终点判断
		if(index >= len) {
			// 无缝滚动关键2:当滚动完成复制图片时,瞬间重回初始状态
			ul.style.left = 0;
			index = 1;
		} else if(index < 0) {
			index = len - 1;
		}

		let target = -index * pictureShow.clientWidth;

		animate(ul, {
			left: target
		});
		// ul.style.top = -target + 'px';

		// 高亮页码
		for(let i = 0; i < len - 1; i++) {
			if(i === index) {
				page.children[i].className = 'active';
			} else {
				page.children[i].className = '';
			}
		}

		if(index === len - 1) {
			page.children[0].className = 'active';
		}
	}
})

// tab切换
$(function() {

	// var tab = document.querySelector('.tab');
	// var main = document.querySelector('.main');

	// tab[0].className = 'tab_active';

	// for(var i=0;i<tab.length;i++){

	// }

	$("tab").click(function() {
		$("goods").eq($(this).index()).addClass("").siblings().removeClass("");
		$("xiangqing").hide().eq($(this).index()).show();
	})

})

//点击商品传入详情页
$(function() {
	var params = location.search.slice(1)
	$.ajax({
		type: "post",
		dataType: 'json',
		url: "http://10.3.138.135:8181/particulars",
		data: {
			num: params
		},
		headers: {
			'auth': window.localStorage.getItem('token')
		},
		success: function(data) {

			var list = data.data;
			var fui_cell_group = document.querySelector('.fui-cell-group');
            $('#goods_name').html(list[0].goodsName);
            $('.goods_price').html(list[0].goodsprice);
			$('.company').html(list[0].provider);
			$('.price').html(list[0].goodsprice);
			$('.goods').attr('data-guid',list[0].num)
            var pictureShow_lunbo = $('.pictureShow_lunbo');
            for(var i=0;i<pictureShow_lunbo.length;i++){
                pictureShow_lunbo[i].innerHTML = list.map(item=>{
                        return`
                            <li><img src='${list[i].images}' class="imgg"></li>
                            <li><img src='${list[i].images}'></li>
                            <li><img src='${list[i].images}'></li>
                            <li><img src='${list[i].images}'></li>
                            `
                }).join('');
            }

            var img = $('.img');
            for(var i=0;i<img.length;i++){
                img[i].innerHTML = list.map(item=>{
                        return`
                            <img src='${list[i].images}'style="width:200px;height:200px">
                            `
                }).join('');
			}
			$(function(){
				var goodslist = [];
				var cookies = document.cookie.split('; ');
				cookies.forEach(function(item){
					item = item.split('=');
		
					// 判断是否已经存在goodslist的cookie
					if(item[0] === 'goodslist'){
						goodslist = JSON.parse(item[1]);
					}
				});	
				var goodss = Cookie.get('goodss');
					if (goodss.length > 0) {
						goodss = JSON.parse(goodss)
					} else {
						goodss = []
					}
				$('.confirm').click(function(){
				
						var guid = $('.goods').attr('data-guid');
						var has = goodss.some(function (goodsList) {
							var res = goodsList.num === location.search.slice(1);
							if (res) {
								goodsList.qty++
							}
							return res;
						});
					
						if (!has) {
							var goodsList = {
								num: location.search.slice(1),
								src: $('.imgg').prop('src'),
								name: $('#goods_name').text(),
								price: $('.price').text(),
							
							}
							
							goodss.push(goodsList);
	
							
						}
						document.cookie = 'goodss=' + JSON.stringify(goodss);

				})
				$('#btn_buy').click(function(){
				
					var guid = $('.goods').attr('data-guid');
					var has = goodss.some(function (goodsList) {
						var res = goodsList.num === location.search.slice(1);
						if (res) {
							goodsList.qty++
						}
						return res;
					});
				
					if (!has) {
						var goodsList = {
							num: location.search.slice(1),
							src: $('.imgg').prop('src'),
							name: $('#goods_name').text(),
							price: $('.price').text(),
						
						}
						
						goodss.push(goodsList);

						
					}
					document.cookie = 'goodss=' + JSON.stringify(goodss);
					window.location.href = 'car.html'

			})
				
				})
			
			
		}
		
	})
	
})

//数量选择
$(function() {
	$('.buy_car').click(function() {
		$('.qty').addClass('active');
	})
	$('.confirm').click(function() {
		$(".qty").toggleClass("active");
	})
	$('.close').click(function() {
		$(".qty").toggleClass("active");
	})
})

//数量加减
$(document).ready(function() {
	//获得文本框对象
	var sum = $(".sum");
	//初始化数量为1,并失效减
	$('.jian').attr('disabled', true);
	//数量增加操作
	$(".add").click(function() {
		// 给获取的val加上绝对值，避免出现负数
		sum.val(Math.abs(parseInt(sum.val())) + 1);
		if(parseInt(sum.val()) != 1) {
			$('.jian').attr('disabled', false);
		};
	})
	//数量减少操作
	$(".jian").click(function() {
		sum.val(Math.abs(parseInt(sum.val())) - 1);
		if(parseInt(sum.val()) == 1) {
			$('.jian').attr('disabled', true);
		};
	})
});


//返回
$(function(){
    var btnPrev = document.querySelector('#prev');
    // 绑定点击事件
    btnPrev.onclick = function(){
        history.back();
    }
    
})
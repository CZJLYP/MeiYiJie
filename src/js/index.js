$(function() {
	let banner = document.querySelector('.banner');
	let ul = banner.children[0];
	// 无缝滚动关键一:复制第一张到最后
	ul.appendChild(ul.children[0].cloneNode(true));
	let len = ul.children.length;
	// 初始化:
	// 计算ul的宽度
	// li的宽度*数量
	ul.style.width = banner.clientWidth * len + 'px';
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
	banner.appendChild(page);

	//动画效果
	let timer = setInterval(autoPlay, 3000);

	// 鼠标移入移出
	banner.onmouseover = function() {
		clearInterval(timer);
	}
	banner.onmouseout = function() {
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

		let target = -index * banner.clientWidth;

		animate(ul, {
			left: target
		});

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




$(function() {
	$.ajax({
		type: "post",
		url: "http://10.3.138.135:8181/goods",
		headers: {
			'auth': window.localStorage.getItem('token')
		},
		success: function(data) {
			console.log(data)
			var datalist = data.data;
			console.log(datalist)

			var title_goods = $('.title_goods');

			for(var i=0;i<title_goods.length;i++){
				title_goods[i].innerHTML = datalist.map(item=>{
						return`
		                    <a class="goods" href="#" data-guid="${item.num}">
		                        <img src=${item.images} alt="" />
		                        <div class="detail">
		                            <div class="name">
		                                ${item.goodsName}
		                            </div>
		                            <div class="price">
		                                <span class="text">
		                                    <p class="minprice">${item.goodsprice}</p>
		                                </span>
		                            </div>
		                        </div>
		                    </a>`
				}).join('');
				$(function(){
		                $('.goods').on('click',function(e){
		                    window.location.href = 'html/detailPage.html?'+$(this).attr('data-guid');      
		                })
		            })
		        }
			
		}
	})
})
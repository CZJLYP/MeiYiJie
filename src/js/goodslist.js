$(function() {
	$.ajax({
		type: "post",
		dataType: 'json',
		url: "http://10.3.138.135:8181/goods",
		headers: {
			'auth': window.localStorage.getItem('token')
		},

		success: function(data) {
            console.log(data);
            var datalist = data.data;
            var goodslist = document.querySelector('.fui-content-inner')
            var html='';
            for(var i=0;i<datalist.length;i++){
              html += `<div class="fui-goods-group container" id="goods-list-container">
              <div class="fui-goods-item" data-guid="${datalist[i].num}">
                  <div class="image" style="background-image: url(${datalist[i].images});"></div>
                  <div class="detail">
                      <div class="name">${datalist[i].goodsName}</div>
                      <div class="price">
                          <span class="text">${datalist[i].goodsprice}</span>
                          <span class="buy">购买</span>
                      </div>
                  </div>
              </div>
          </div>`
            }
            goodslist.innerHTML = html;
            $(function(){
                $('.fui-goods-item').on('click',function(e){
                    window.location.href = 'detailPage.html?'+$(this).attr('data-guid');      
                })
            })
        }
    })
    
})



//返回
$(function(){
    var btnPrev = document.querySelector('#prev');
    // 绑定点击事件
    btnPrev.onclick = function(){
        history.back();
    }
    
})
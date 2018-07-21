document.addEventListener("DOMContentLoaded",()=>{
   var groupp = document.getElementById('groupp');

	var goodslist;

	render();

	function render(){

		goodslist = Cookie.get('goodss');
        // console.log(goodslist)
		goodslist = goodslist.length>0 ? JSON.parse(goodslist) : [];
        var totalprice = document.getElementsByClassName('totalprice')[0];
        totalprice.innerText = goodslist[0].price;
		// 根据数据生成html结构
	
        var html =''
        
        for(var i=0;i<goodslist.length;i++){
            html +=`
            <div class="fui-list-group-title" style="font-size: 15px">
                <i class="icon icon-dianpu1"></i> 深圳市有味有道电子商务有限公司
                </div>
                <input type="hidden" name="goodsid[]" value="">
                <input type="hidden" name="optionid[]" value="0">
                <div class="fui-list goods-item align-start">
                <div class="fui-list-media">
                    <img id="" class="round" src="${goodslist[0].src}">
                </div>
                <div class="fui-list-inner">        
                    <div class="subtitle">
                        ${goodslist[0].name}
                     </div>
                </div>
                <div class="fui-list-angle" style="width: auto">
                    <span style="font-size: .65rem;color: #000">
                        <span class="marketprice">${goodslist[0].price}</span>
                    </span>
                    <div class="num" style="font-size: 15px">
                    x1
                        <input class="num shownum" type="hidden" name="" value="1">
                    </div>
                </div>
            </div>
        <div class="fui-cell-group" style="margin-top: 0">
            <div class="fui-cell  lineblock ">
                <div class="fui-cell-info c000" style="text-align: right; font-size: 15px">共
                    <span id="goodscount" class="text-danger bigprice">1</span> 件商品 共计：
                    <span class="text-danger bigprice"> 
                        <span class="goodsprice">${goodslist[0].price}</span>
                    </span>
                </div>
            </div>
        </div>`
        }
		
		groupp.innerHTML = html;
    
	}

$('.btn').click(function(){
     window.location.href = 'pay.html'
    })
})





// 返回
$(function(){
    var btnPrev = document.querySelector('#prev');
    // 绑定点击事件
    btnPrev.onclick = function(){
        history.back();
    }
    
})

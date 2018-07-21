$(function () {
    var groupp = document.getElementById('cart_container');

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
             html +=`  <div class="container order_lists cartBox" >
             <div class="cart1">
                 <input type="checkbox" name="checkbox" class="j_car fui-radio shopChoice">
                 <a href="#">
                     <i></i>
                     <span>${goodslist[0].name}</span>
                 </a>
             </div>
             <div class="cart2">
                 <div class="cart2L">
                     <input type="checkbox" name="checkbox" class="j_car fui-radio son_check">
                 </div>
                 <div class="cart2C">
                     <img src="${goodslist[0].src}" alt="">
                 </div>

                 <div class="cart2R">
                     <div class="cart2RT">
                         <a href="">
                             <span></span>
                         </a>
                     </div>
                     <div class="cart2RB">
                         <span class="price">${goodslist[0].price}</span>
                         <del></del>
                         <div class="fui-number small amount_box">
                             <div class="minus reduce">-</div>

                             <input class="num shownum sum " type="tel" name="" value="1">

                             <div class="plus">+</div>

                         </div>
                     </div>
                 </div>
             </div>
         </div>`
         }
         
         groupp.innerHTML = html;
     
     }


    var $plus = $('.plus'),
        $reduce = $('.reduce'),
        $all_sum = $('.sum');
    $plus.click(function () {
        var $inputVal = $(this).prev('input')
        $count = parseInt($inputVal.val()) + 1
        $obj = $(this).parents('.amount_box').find('.reduce')
        $priceTotalObj = $('.fui-list-inner').find('.sum_price')
        $price = $(this).parents('.order_lists').find('.price').html()  //单价
        $priceTotal = ($count * $price).toFixed(2);

        $inputVal.val($count);
        $priceTotalObj.html($priceTotal);


    });


    $reduce.click(function () {
        var $inputVal = $(this).next('input')
        $count = parseInt($inputVal.val()) - 1
        $priceTotalObj = $('.fui-list-inner').find('.sum_price')
        $price = $(this).parents('.order_lists').find('.price').html()  //单价
        $priceTotal = ($count * $price).toFixed(2);
        if ($inputVal.val() > 1) {
            $inputVal.val($count);
            $priceTotalObj.html($priceTotal);
        }

    });
    

    


    //全局的checkbox选中和未选中的样式
    var $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
        $wholeChexbox = $('.whole_check'),
        $cartBox = $('.cartBox'),                       //每个商铺盒子
        $shopCheckbox = $('.shopChoice'),               //每个商铺的checkbox
        $sonCheckBox = $('.son_check');                 //每个商铺下的商品的checkbox
    $wholeChexbox.click(function () {
        var $checkboxs = $cartBox.find('input[type="checkbox"]');
        if ($(this).is(':checked')) {
            $checkboxs.prop("checked", true);
            $('.btn').css('backgroundColor','red');
         
        } else {
            $checkboxs.prop("checked", false);
            $('.btn').css('backgroundColor','#ccc');
        }
        
    });

      $sonCheckBox.each(function () {
$(this).click(function () {
    if ($(this).is(':checked')) {
        //判断：所有单个商品是否勾选
        var len = $sonCheckBox.length;
        var num = 0;
        $sonCheckBox.each(function () {
            if ($(this).is(':checked')) {
                num++;
            }
        });
        if (num == len) {
            $wholeChexbox.prop("checked", true);
            $('.btn').css('backgroundColor','red');
            $wholeChexbox.next('label').addClass('mark');
        }
    } else {
        //单个商品取消勾选，全局全选取消勾选
        $wholeChexbox.prop("checked", false);
        $wholeChexbox.next('label').removeClass('mark');
        $('.btn').css('backgroundColor','#ccc');
    }
})
});
$cartBox.each(function () {
var $this = $(this);
var $sonChecks = $this.find('.son_check');
$sonChecks.each(function () {
    $(this).click(function () {
        if ($(this).is(':checked')) {
            //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
            var len = $sonChecks.length;
            var num = 0;
            $sonChecks.each(function () {
                if ($(this).is(':checked')) {
                    num++;
                }
            });
            if (num == len) {
                $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
            $('.btn').css('backgroundColor','red');
                
            }

        } else {
            //否则，店铺全选取消
            $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
            $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
            $('.btn').css('backgroundColor','#ccc');
        }
      
    });
});
});
$shopCheckbox.each(function () {
$(this).click(function () {
    if ($(this).is(':checked')) {
        //判断：店铺全选中，则全局全选按钮打对勾。
        var len = $shopCheckbox.length;
        var num = 0;
        $shopCheckbox.each(function () {
            if ($(this).is(':checked')) {
                num++;
            }
        });
        if (num == len) {
            $wholeChexbox.prop("checked", true);
            $wholeChexbox.next('label').addClass('mark');
            $('.btn').css('backgroundColor','red');

        }

        //店铺下的checkbox选中状态
        $(this).parents('.cartBox').find('.son_check').prop("checked", true);
        $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
    } else {
        //否则，全局全选按钮取消对勾
        $wholeChexbox.prop("checked", false);
        $wholeChexbox.next('label').removeClass('mark');
        $('.btn').css('backgroundColor','#ccc');
        
        //店铺下的checkbox选中状态
        $(this).parents('.cartBox').find('.son_check').prop("checked", false);
        $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
    }
 
});
});

    $('.btn').click(function(){
     window.location.href = 'close.html'
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
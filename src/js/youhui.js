$(function(){  
  $(".tablea").find(".box:first").show();    //为每个BOX的第一个元素显示        
  $(".oranger li").on("mouseover",function(){ //给a标签添加事件  
     var index=$(this).index();  //获取当前a标签的个数  
     $(this).parent().next().find(".box").hide().eq(index).show(); //返回上一层，在下面查找css名为box隐藏，然后选中的显示  
     $(this).addClass("hover").siblings().removeClass("hover"); //a标签显示，同辈元素隐藏  
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
$(function(){
    $(".box_intro .brn_setting.").click(function(){
        $(".box_intro").slideUp();
        loadDataFn()
    });
});

var complateData;
var searSave;
var seatPriceSave = 0;

function loadDataFn(){
    $.ajax({
        url:"js/data.json",
        dataType:"json",
        success:function(result){
            complateDAta = result.seatInfo;
            settingSeatFn();
        }
    });
}

function settingSeatFn(){

    $(".txt_info_number").text("");
    $(".txt_info").text("0");
    for(var i=0; i<complateData.length; i++){

        var n = complateData[i].name;
        var p = complateData[i].price;
        var r = complateData[i].reserve;
    
        $(".section.reservation > ol").append("<li class='unit'><button data-price='"+p+"' "+r+">"+n+"</button></li>")

    }

    $(".section.reservation").slideDown();

    $(".section.reservation .unit button").click(function(){
         $(this).toggleClass("select");
        seatSave = [];
        seatPriceSave = 0;

        for(var i=0; i<complateData.length; i++){
            var boo= $(".section.reservation .unit").eq(i).find("button").hasClass("select")
            if(boo){
            seatSave.push(complateData[i].name)
            seatPriveSave += Number(complateData[i].price);
            }
        }

        $(".txt_info_numver").text(seatSave);
        $(".txt_info_total").text(seatPriceSave);
    });

    $(".btn_submit").click(function(){

        $(".section.reservaton").slideUp();
        $(".section.complete").slideDown();

        $(".section.complete .txt_number".text(seatSave);
        $(".section.complete .txt_price strong").text(seatPriceSave);
    });

    $(".section.complete .btn_reset").click(function(){
        $(".section.complete").slideUp();
        $(".box_intro").slideDown();
        $(".section.reservation > ol .unit").remove();
    })



};


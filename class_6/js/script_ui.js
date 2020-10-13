$(function(){
    $(".box_intro .btn_setting").click(function(){
        $(".box_intro").slideUp();
        loadDataFn()//json data 호출
    });

    var complateData; //json 데이터를 담는 변수;
    var seatSave = []; //선택된 자리 정보를 담는 변수;
    var seatPriceSave = 0; //선택된 자리가격을 합산 저장하는 변수;


    function loadDataFn(){
        $.ajax ({
            url:"js/data.json",
            dataType:"json",
            success:function(result){
                complateData = result.seatInfo;
                settingSeatFn(); // 자리 셋팅 함수 호출
            }
        });
    }

    //자리 셋팅 함수
    function settingSeatFn(){

        $(".txt_info_number").text("");
        $(".txt_info_total").text("0");
        for(var i=0; i<complateData.length; i++){
            //데이터 파싱
            var n = complateData[i].name;
            var p = complateData[i].price;
            var r = complateData[i].reserve;
            
            $(".section.reservation > ol").append("<li class='unit'><button data-price='"+p+"' "+r+">"+n+"</button></li>")

        }
        $(".section.reservation").slideDown();

        $(".section.reservation .unit button").click(function(){
            $(this).toggleClass("select");
            seatSave = []; //배열초기화
            seatPriceSave = 0; //가격정보 초기화0
            //select라는 클래스를 갖고 있는 정보만 저장하는 for문
            for(var i=0; i<complateData.length; i++){
                //unit이라는 클래스를 갖고 있는 li들
                var boo= $(".section.reservation .unit").eq(i).find("button").hasClass("select")
                if(boo){
                    seatSave.push(complateData[i].name) //좌석정보 배열에 선택좌석 저장
                    seatPriceSave += Number(complateData[i].price); //선택좌석 가격 합산
                }
            }

            //저장된 배열과 변수를 html에 업데이트
            $(".txt_info_number").text(seatSave);
            $(".txt_info_total").text(seatPriceSave);
        
        });

        $(".btn_submit").click(function(){
            
            $(".section.reservation").slideUp();
            $(".section.complete").slideDown();

            $(".section.complete .txt_number").text(seatSave);
            $(".section.complete .txt_price strong").text(seatPriceSave);
        });


        // 리셋버튼
        $(".section.complete .btn_reset").click(function(){
            $(".section.complete").slideUp() // 완료 div를 숨김
            $(".box_intro").slideDown() // 첫화면 div를 보여줌
            $(".section.reservation > ol .unit").remove(); // json 데이터 로드 후 셋팅된 자리를 삭제

        });

    };


})
$(function(){
    $(".input_area input[type='text']").keypress(function(event){
        if(event.keyCode == 13 && $(this).val().length > 0){ //엔터를 누를 경우와 입력하고 있는 input에 값이 있을 때 실행하는 조건문
            var _val = $(this).val(); // 입력된 input의 내용을 담는 변수 * val() = 값을 가져오는 것
            var _class = $(this).attr("class"); // 입력된 input의 클래스명을 담는 변수 * attr() = 속성 값 담음
            var _time; // _time에 시간 관련 변수를 합하여 저장

            //현재 시간 구하기
            var _data = new Date(); // pc의 전체 시간 정보
            var _hh = _data.getHours(); // 시간정보중 시간(hour)
            var _mm = _data.getMinutes(); // 시간정보중 분(minutes)
            var _apm = "오전";
            if(_hh>12){
                _apm = "오후"
                _hh = _hh - 12; // 기존 시간 변수 _hh에서 12를 빼고 다시 _hh에 저장
            }
            if(_hh < 10) _hh ="0" + _hh; // 시간이 한자리일 경우(0~9) 앞에 문자(0)을 추가
            if(_mm < 10) _mm ="0" + _mm; // 분이 한자리일 경우(0~9) 앞에 문자(0)을 추가

            _time = _apm+":"+_hh+":"+_mm; // _time에 시간 관련 변수를 합하여 저장
            //현재 시간 구하기 끝

            // 말풍선 태그를 추가하는 append
            $(".chat_area").append("<div class='item "+_class+"'><div class='box'><p class='msg'>"+_val+"</p><span class='time'>"+_time+"</span></div></div>")
            // 트랜지션 효과를 쓰기 위해 0.01초 딜레이 타임 이후 on 클래스를 추가해줌

            setTimeout(function(){
                $(".chat_area .item").last().addClass("on");

                //내용추가 후 스크롤을 맨 밑으로 내림
                var _itemH = $(".chat_area .item").height() + 15;
                var _itemC = $(".chat_area .item").length;
                var _itemTotal = _itemH * _itemC - 15;

                // $(".chat_area").scrollTop(_itemTotal);
                $(".chat_area").stop().animate({
                    scrollTop:_itemTotal
                }, 500);
            },10)
            
            $(this).val(""); // input의 입력된 내용을 삭제 * val("") = 값 초기화
        };
    });
})
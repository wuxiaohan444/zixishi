// 通过日期算周几
export function getWeek(dateString) {
    var dateArray = dateString.split("-");
    let date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    return "周" + "日一二三四五六".charAt(date.getDay());
}

// 获取当前时间
export function getNowFormatDate(type) {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    if (type === 1) {
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hours + seperator2 + minutes + seperator2 + seconds;
    } else {
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    }
    return currentdate;
}
// 获取几天后的时间
export function behindDate(number) {
    let days = number ? number : 0
    var date = new Date();
    date.setDate(date.getDate() + days);
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate
}

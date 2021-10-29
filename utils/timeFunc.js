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

// 营业时间算上
export function getBusiness(allData,start,end){
    let startIndex, endIndex;
    let today =[];
    let data = allData;
    data.map((item, index) => {
        if (item.split('-')[0] == start) {
            startIndex = index
        }
        if (item.split('-')[1] == end) {
            endIndex = index
        }
    })
    data.map((item, index) => {
        if (index >= startIndex && index <= endIndex) {
            today.push({
                time: item
            })
        }
    })
    return today
}

// 根据起始日期和结束日期获取时间段数组
// 输入日期的格式："2021-01-01"
export function getAllDate(day1, day2) {
    // fix : 修复输入两个一样日期导致出错
    if (day1 === day2) {
        return [day1]
    }
    var getDate = function (str) {
        var tempDate = new Date();
        var list = str.split("-");
        tempDate.setFullYear(list[0]);
        tempDate.setMonth(list[1] - 1);
        tempDate.setDate(list[2]);
        return tempDate;
    }
    var date1 = getDate(day1);
    var date2 = getDate(day2);
    if (date1 > date2) {
        var tempDate = date1;
        date1 = date2;
        date2 = tempDate;
    }
    date1.setDate(date1.getDate() + 1);
    var dateArr = [];
    var i = 0;
    while (!(date1.getFullYear() == date2.getFullYear()
        && date1.getMonth() == date2.getMonth()
        && date1.getDate() == date2.getDate())) {

        var dayStr = date1.getDate().toString();
        if (dayStr.length == 1) {
            dayStr = "0" + dayStr;
        }
        var monthStr = (date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : date1.getMonth() + 1;
        dateArr[i] = date1.getFullYear() + "-" + monthStr + "-" + dayStr;
        i++;
        date1.setDate(date1.getDate() + 1);
    }
    dateArr.splice(0, 0, day1)
    dateArr.push(day2);
    return dateArr;
}

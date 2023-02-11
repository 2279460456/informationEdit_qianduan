import React from 'react';


function getdate() {

    let myDate = new Date;
    let year = myDate.getFullYear();   //年
    let month = myDate.getMonth() + 1; //月
    let date = myDate.getDate();       //日
    let hours = myDate.getHours();
    let minute = myDate.getMinutes();

    let now_date = year + '/' + month + '/' + date + '/' + hours + ':' + minute;
    return now_date;
}

export default getdate
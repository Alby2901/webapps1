'use strict'

//
// Function to conver objet dateJS to strin for set value of data-time field
//
function dateJsObj_2_DateTimeFieldString(date) {

    if (!date) return dayjs(date).format('YYYY-MM-DD') + "T" + dayjs(date).format('HH') + ":" + dayjs(date).format('mm');

    return dayjs(date1).format('YYYY-MM-DD') + "T" + dayjs(date1).format('HH') + ":" + dayjs(date1).format('mm');

};
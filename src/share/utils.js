export const epoch2Date = (epoch) => {
    var date = new Date(epoch * 1000);
    var year = date.getFullYear()
    var month = (date.getMonth() + 1) < 10 ? ('0'+(date.getMonth() + 1)) : (date.getMonth() + 1)
    var day = date.getDate() < 10 ? ('0'+(date.getDate())) : date.getDate()
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}

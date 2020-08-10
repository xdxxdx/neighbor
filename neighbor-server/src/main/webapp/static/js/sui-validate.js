  var longitude = function(value, element, param) {
		  var longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
		  value = trim(value);
		  return longrg.test(value);
};
$.validate.setRule("longitude", longitude, '经度范围：-180.0～+180.0');
 var latitude = function(value, element, param) {
		  var latgrg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
		  value = trim(value);
		  return latgrg.test(value);
};
$.validate.setRule("latitude", latitude, '纬度范围：-90.0～+90.0');
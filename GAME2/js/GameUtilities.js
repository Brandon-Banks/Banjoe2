// Function that will setup an animation frame
requestAnimFrame = (function(){
    if (window.requestAnimationFrame) return window.requestAnimationFrame;
    if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame;
    if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame;
    if (window.oRequestAnimationFrame) return window.oRequestAnimationFrame;
    if (window.msRequestAnimationFrame) return window.msRequestAnimationFrame;
    else return  function( callback, element ){
        window.setTimeout(callback, element);
    };
})();

// jQuery plugin function to preload images
$.preload = function( obj ) {
	var robj = {};
	for ( var key in obj ) {
		if (obj.hasOwnProperty(key)) {
			var $img = $('<img/>');
			$img[0].src = obj[key];
			robj[key] = $img[0];
		}
    }
	return robj;
}

/* jQuery plugin function to preload images
$.preload = function( obj ) {
    return $.map(obj, function( prop, key ){
        var $img = $('<img/>');
        $img[0].src = prop;
        return $img[0];
    });
}
*/

if ( typeof Object.create !== 'function' ) {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    }
}
const Canvas = require ( 'canvas' );
( function ( _this ) {
	_this.code2img = function ( code ) {
		let codes = encodeURI ( code.trim ()).split ( '' ).map ( v => v.charCodeAt ());
		let w = h = Math.ceil ( Math.sqrt (codes.length / 3 ));
		let canvas = Canvas.createCanvas ( w, h );
		let ctx = canvas.getContext ( '2d' );
		let imageData = ctx.getImageData ( 0, 0, w, h );
		for ( let i = 0, len = Math.ceil ( codes.length / 3 ); i < len; i ++ ) {
			imageData.data[i * 4] = codes[i * 3] || 0;
			imageData.data[i * 4 + 1] = codes[i * 3 + 1] || 0;
			imageData.data[i * 4 + 2] = codes[i * 3 + 2] || 0;
			imageData.data[i * 4 + 3] = 255;
		}
		ctx.putImageData ( imageData, 0, 0 );

		return canvas;
	};
	_this.img2code = function ( path ) {
		return Canvas.loadImage ( path ).then ( function ( img ) {
			let canvas = Canvas.createCanvas ( img.width, img.height );
			let ctx = canvas.getContext ( '2d' );
			ctx.drawImage ( img, 0, 0, img.width, img.height );
			let codes = ctx.getImageData ( 0, 0, img.width, img.height ).data;
			let str = '';
			for (var i = 0; i < codes.length; i += 4) {
				if ( codes[i + 3] !== 0 ) {
					if ( codes[i] !== 0 ) {
						str += String.fromCharCode ( codes[i] );
					}
					if ( codes[i + 1] !== 0 ) {
						str += String.fromCharCode ( codes[i + 1] );
					}
					if ( codes[i + 2] !== 0 ) {
						str += String.fromCharCode ( codes[i + 2] );
					}
				}
		    }
		    str = decodeURI ( str );
		    return str;
		});
	};
})( this );
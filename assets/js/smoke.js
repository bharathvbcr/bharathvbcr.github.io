(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.smokemachine = factory();
  }
}(this, function() {
    'use strict';

    var opacities = (function() {
        var a = [];
        for (var i = 0; i < 256; i++) {
            a.push(i);
        }
        for (var i = 255; i >= 0; i--) {
            a.push(i);
        }
        return a;
    })();

	var smokeSpriteSize = 20;
	var smokeSprite = (function(){
		var smokeSprite = document.createElement('canvas'),
			ctx = smokeSprite.getContext('2d'),
			data = ctx.createImageData(smokeSpriteSize, smokeSpriteSize);

		smokeSprite.width = smokeSpriteSize;
		smokeSprite.height = smokeSpriteSize;

		for (var i = 0; i < data.data.length; i += 4) {
			data.data[i+3] = opacities[i/4];
		}
		ctx.putImageData(data, 0, 0);

		return smokeSprite;
	})();


	function makeSmokeSprite(color){
		var smokeSprite = document.createElement('canvas'),
			ctx = smokeSprite.getContext('2d');

		smokeSprite.width = smokeSpriteSize;
		smokeSprite.height = smokeSpriteSize;
		var data = ctx.createImageData(smokeSpriteSize, smokeSpriteSize);

		for (var i = 0; i < data.data.length; i += 4) {
			data.data[i] = color[0];
			data.data[i+1] = color[1];
			data.data[i+2] = color[2];
			data.data[i+3] = opacities[i/4];
		}
		ctx.putImageData(data, 0, 0);

		return smokeSprite;
	}


	function SmokeMachine(canvas, color){
		var ctx = canvas.getContext('2d');
		var particles = [];
		var preRoll = 500;
		var smokeSprite = makeSmokeSprite(color);

		function addsmoke(x, y, size, speed, rotation, color, data){
			var particle = {
				x: x,
				y: y,
				size: 1,
				targetSize: size,
				speed: speed,
				rotation: rotation,
				color: color,
				data: data,
				life: 0,
				maxLife: 200
			};
			particles.push(particle);
		}

		function step(delta){
			var i = particles.length;
			while(i--){
				var particle = particles[i];
				particle.life++;
				if(particle.life > particle.maxLife){
					particles.splice(i, 1);
				}else{
					particle.x += Math.cos(particle.rotation) * particle.speed;
					particle.y += Math.sin(particle.rotation) * particle.speed;
					particle.size = particle.life / particle.maxLife * particle.targetSize;
					ctx.globalAlpha = (1 - particle.life / particle.maxLife) * 0.2;
					ctx.drawImage(
						smokeSprite,
						particle.x - particle.size/2,
						particle.y - particle.size/2,
						particle.size,
						particle.size
					);
				}
			}
		}

		var lastframe;
		function animate(t){
			if(!lastframe) lastframe = t;
			var delta = t - lastframe;
			lastframe = t;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			step(delta);
			requestAnimationFrame(animate);
		}

		for(var i = 0; i < preRoll; i++){
			step(16);
		}
		animate();

		return {
			addsmoke: addsmoke,
			step: step,
			particles: particles,
			clear: function(){
				particles = [];
			}
		};
	}

	return SmokeMachine;
}));
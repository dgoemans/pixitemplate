requirejs.config({
    baseUrl: 'src',
    paths: {
        pixi: '../lib/pixi',
        class: '../lib/js.class.min',
        proton: '../lib/proton.min'
    },

    shim: {
        'class' : {
            exports: 'Class'
        },
        'proton' : {
            exports: 'Proton'
        }

    }
});

navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate || function(){};

require(["Game", "pixi", "proton"], function(Game, PIXI, Proton) {
    var proton = new Proton();
    var stage = new PIXI.Stage(0x6699FF);

    var pixiRenderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    document.body.appendChild(pixiRenderer.view);

    var particleBatch = new PIXI.SpriteBatch();

    var protonRenderer = new Proton.Renderer('other', proton);

    protonRenderer.onParticleCreated = function (particle) {
        var sprite = new PIXI.Sprite(particle.target)
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        particle.sprite = new PIXI.Sprite(particle.target);
        particleBatch.addChild(particle.sprite);
    };
    protonRenderer.onParticleUpdate = function (particle) {
        particle.sprite.position.x = particle.p.x;
        particle.sprite.position.y = particle.p.y;
        particle.sprite.scale.x = particle.scale;
        particle.sprite.scale.y = particle.scale;
        particle.sprite.alpha = particle.alpha;
        particle.sprite.rotation = particle.rotation * Math.PI / 180;
    };
    protonRenderer.onParticleDead = function (particle) {
        particle.sprite.parent.removeChild(particle.sprite);
    };

    protonRenderer.start();


    var game = new Game(stage, proton);
    stage.addChild(particleBatch);

    var lastTime = Date.now();

    requestAnimFrame( animate );

    var delta = 0;

    function animate() {

        var now = Date.now();

        delta = (now - lastTime)/1000;
        delta = Math.min(delta,0.33);

        requestAnimFrame( animate );

        proton.update();
        game.update(delta);
        game.render();

        // render the stage
        pixiRenderer.render(stage);

        lastTime = now;
    }
});
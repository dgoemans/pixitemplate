/**
 * Created by David on 14-Mar-15.
 */

define([
    "class",
    "pixi",
    "filters/RGBSplit2Filter",
    "proton"],
    function(Class, PIXI, RGBSplit2Filter, Proton) {

    var Game = Class({

        create: function (stage, proton)
        {
            this.stage = stage;
            this.time = 0;

            //this.filter = new RGBSplit2Filter();
            //this.blur = new PIXI.BlurFilter();
            //this.blur.blur = 14;

            this.background = new PIXI.Sprite(PIXI.Texture.fromImage("assets/img/bg.jpg"));
            this.background.width = window.innerWidth;
            this.background.height = window.innerHeight;
            this.background.x = this.background.y = 0;
            stage.addChild(this.background);

            this.spriteBatch = new PIXI.SpriteBatch();
            stage.addChild(this.spriteBatch);

            //this.spriteBatch.filters = [this.blur];


        },

        update: function(delta)
        {
            this.time += delta;
        },

        render: function()
        {

        }
    });


    return Game;
});
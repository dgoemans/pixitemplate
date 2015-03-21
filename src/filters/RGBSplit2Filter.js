/**
 * Created by David on 14-Mar-15.
 */

define(["pixi"], function(PIXI){
    var RGBSplit2Filter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            red: {type: '2f', value: {x:20, y:20}},
            green: {type: '2f', value: {x:-20, y:20}},
            blue: {type: '2f', value: {x:20, y:-20}},
            dimensions:   {type: '4fv', value:[0,0,0,0]}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform vec2 red;',
            'uniform vec2 green;',
            'uniform vec2 blue;',
            'uniform vec4 dimensions;',
            'uniform sampler2D uSampler;',

            'void main(void) {',
            '   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;',
            '   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;',
            '   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;',
            '   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;',
            '}'
        ];
    };

    RGBSplit2Filter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    RGBSplit2Filter.prototype.constructor = RGBSplit2Filter;

    /**
     * The angle of the split.
     *
     * @property angle
     * @type Number
     */
    Object.defineProperty(RGBSplit2Filter.prototype, 'distance', {
        get: function() {
            return this.uniforms.red.value.x;
        },
        set: function(value) {
            //this.padding = value;
            this.uniforms.red.value.x = value;
            this.uniforms.red.value.y = 0;
            this.uniforms.green.value.x = -value;
            this.uniforms.green.value.y = 0;
            this.uniforms.blue.value.x = value;
            this.uniforms.blue.value.y = -0;
        }
    });

    return RGBSplit2Filter;
});



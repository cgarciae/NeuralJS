/**
 * Created by Cristian Garcia on 6/29/2014.
 */

var R = ramda,
    L = LambdaJS,
    N = {};

/**
 * @class
 * @property {number} val
 */
function Val (val) {
    this.val = val;
}
N.Val = Val;
    /**
 *
 * @class
 * @property {Val} w
 * @property {LinearNeuron} source
 * @property {LinearNeuron} target
 */
function LinearWeight (source, target, val) {

    this.w = new Val (val || Math.random ());
    this.source = source;
    this.target = target;
}
N.LinearWeight = LinearWeight;

/**
 * @returns {number}
 */
LinearWeight.prototype.filterSignal = function filterSignal() {
    return this.source.y.val * this.w.val;
};

/**
 * @class
 * @property {Val} z
 * @property {Val} y
 * @property {LinearWeight[]} sources
 * @property {LinearWeight[]} targets
 */
function LinearNeuron () {
    this.z = new Val (undefined);
    this.y = new Val (undefined);
    this.sources = [];
    this.targets = [];
}

N.LinearNeuron = LinearNeuron;

/**
 * @returns {number}
 */
LinearNeuron.prototype.f =  function f () {
    if (this.y.val) return this.y.val;

    //return this.y.val = R.foldl (L.add, 0,)
};



//Layers
var LinearLayer = N.LinearLayer = function LinearLayer (n) {

};


//Activation Functions
/**
 * @param {number} x
 * @returns {number}
 */
function sigmoid (x) {
    return 1 / (1 + Math.exp (-x));
}

/**
 * Created by Cristian García and Carlos Alvarez on 6/29/2014.
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
 * @param {LinearNeuron} source
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
    return this.source.f() * this.w.val;
};

/**
 * @class
 * @property {Val} z
 * @property {Val} _y
 * @property {LinearWeight[]} sources
 * @property {LinearWeight[]} targets
 */
function LinearNeuron () {
    this._y = new Val (undefined);
    this.sources = [];
    this.targets = [];
}

LinearNeuron.prototype.f = R.identity;

N.LinearNeuron = LinearNeuron;

/**
 * @returns {number}
 */



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

function addSignals (acc, weight){
    return acc + weight.filterSignal();
}

var sumSignals = R.foldl (addSignals, 0);
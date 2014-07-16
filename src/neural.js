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

N.LinearNeuron =  LinearNeuron;

/**
 * @param {LinearNeuron} other
 */
var connectNeurons = N.connectNeurons = function (a,b) {
    var weight = new LinearWeight (a, b);
    relate (a, b);
};

/**
 * @returns {number}
 */



//Layers
/**@class
 * @property {LinearNeuron[]} neurons
 * @property {LinearLayer[]} sources
 * @property {LinearLayer[]} targets
 * @param {number} n
 */
var LinearLayer = N.LinearLayer = function LinearLayer (n) {
    this.neurons = R.map (createNeuron(LinearNeuron), R.range(0,n));
    this.sources = [];
    this.targets = [];
};

/**
 * @param {LinearLayer} a
 * @param {LinearLayer} b
 */
function FullConnection (a, b) {
    relate (a, b);
    
    a.neurons.forEach (function (na) {
        b.neurons.forEach (function (nb) {
            connectNeurons (na, nb);
        });
    });
}

N.FullConnection = FullConnection;

    function createNeuron (constructor) {
    return function () {
        return new constructor();
    }
}

//Activation Functions
/**
 * @param {number} x
 * @returns {number}
 */
function sigmoid (x) {
    return 1 / (1 + Math.exp (-x));
}

function relate (a, b) {
    a.targets.push (b);
    b.sources.push (a);
}

function addSignals (acc, weight){
    return acc + weight.filterSignal();
}

var sumSignals = R.foldl (addSignals, 0);

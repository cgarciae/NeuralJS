/**
 * Created by Cristian García and Carlos Alvarez on 6/29/2014.
 */

var R = ramda,
    L = LambdaJS,
    N = {};

function addSignals (acc, weight){
    return acc + weight.w * weight.source.y;
}
var sumSignals = R.foldl (addSignals, 0);

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
 * @property {Neuron} source
 * @property {Neuron} target
 * @param {Neuron} source
 * @param {Neuron} target
 * @param {number} [val]
 */
function Weight (source, target, val) {
    this._w = new Val (val || Math.random ());
    this.source = source;
    this.target = target;
}
N.Weight = Weight;

Object.defineProperty(Weight.prototype, 'w', {
    get : function () {
        return this._w.val;
    },
    set : function (value) {
        this._w.val = value;
    }
});

/**
 * @returns {number}
 */

/**
 * @class
 * @property {Val} z
 * @property {Val} _y
 * @property {Weight[]} sources
 * @property {Weight[]} targets
 */
function Neuron () {
    this._y = new Val (undefined);
    this._z = new Val (undefined);
    this.sources = [];
    this.targets = [];
}
N.Neuron =  Neuron;

Object.defineProperty(Neuron.prototype, 'z', {
    get : function () {
        return this._z.val || (this._z.val = sumSignals (this.sources));
    },
    set : function (value) {
        this._z.val = value;
    }
});

Object.defineProperty(Neuron.prototype, 'y', {
    get : function () {
        return this._y.val;
    },
    set : function (value) {
        this._y.val = value;
    }
});

/**
 * @param {Neuron} other
 */
var connectNeurons = N.connectNeurons = function (a,b) {
    var weight = new Weight (a, b);
    relate (a, b, weight);
};

/**
 * @returns {number}
 */



//Layers
/**@class
 * @property {Neuron[]} neurons
 * @property {Layer[]} sources
 * @property {Layer[]} targets
 * @param {number} n
 */
function Layer (n) {
    this.neurons = R.map (createNeuron(Neuron), R.range(0,n));
    this.sources = [];
    this.targets = [];
}
N.Layer = Layer;

/**
 * @param {Layer} b
 * @returns {Layer}
 */
Layer.prototype.fullConnectTo = function fullConnectTo (b) {
    return fullConnection (this, b);
};

Layer.prototype.activate = function activate () {
    if (! this.neurons[0].y) {
        this.sources.forEach (function (l) {
            l.activate();
        });
        this.layerActivationFunction();
    }
};

Layer.prototype.layerActivationFunction = function () {
    this.neurons.forEach (function (n) {
        n.y = n.z;
    });
};



    /**
 * @param {Layer} a
 * @param {Layer} b
 * @return {Layer}
 */
function fullConnection (a, b) {
    relate (a, b);

    a.neurons.forEach (function (na) {
        b.neurons.forEach (function (nb) {
            connectNeurons (na, nb);
        });
    });

    return b;
}

N.fullConnection = fullConnection;

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

function relate (a, b, container) {
    a.targets.push (container || b);
    b.sources.push (container || a);
}




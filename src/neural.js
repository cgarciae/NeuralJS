/**
 * Created by Cristian García and Carlos Alvarez on 6/29/2014.
 */

var R = ramda,
    L = LambdaJS,
    N = {};

/**
 * @param {Neuron} neuron
 * @param {number} data
 * @returns {Neuron}
 */
var setProp = R.curry (function (prop, value, obj){
    obj[prop] = value;
    return obj;
});

function addSignals (acc, weight){
    return acc + weight.w * weight.source.y;
}
var sumSignals = R.foldl (addSignals, 0);


/**
 * @class
 * @property {number} val
 */
function Val (val) {
    if ( !this instanceof Val) return new Val(val);
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
 * @param {Neuron} a
 * @param {Neuron} b
 */
function connectNeurons (a,b) {
    var weight = new Weight (a, b);
    relate (a, b, weight);
}
N.connectNeurons = connectNeurons;

/**
 * @returns {number}
 */



//Layers
/**@class
 * @property {Neuron[]} neurons
 * @property {LinearLayer[]} sources
 * @property {LinearLayer[]} targets
 * @param {number} n
 */
function LinearLayer (n) {
    this.neurons = R.map (createNeuron(Neuron), R.range(0,n));
    this.sources = [];
    this.targets = [];
}
N.LinearLayer = LinearLayer;

/**
 * @param {LinearLayer} b
 * @returns {LinearLayer}
 */
LinearLayer.prototype.fullConnectTo = function fullConnectTo (b) {
    return fullConnection (this, b);
};

LinearLayer.prototype.activate = function activate () {
    if (! this.neurons[0].y) {
        this.sources.forEach (function (l) {
            l.activate();
        });
        this.layerActivationFunction();
    }
};

LinearLayer.prototype.layerActivationFunction = function () {
    this.neurons.forEach (function (n) {
        n.y = n.z;
    });
};

Object.defineProperty (LinearLayer.prototype, 'data', {
    get : function () {
        return R.map (R.get('y'),this.neurons);
    },
    set: function (data) {

        if (this.neurons.length != data.length)
            throw new Error('Data length is not equal to the number of neurons');

        R.zipWith(setProp('y'), data, this.neurons)
    }
});


Object.defineProperty (LinearLayer.prototype, 'targetData', {
    set: function (data) {

        if (this.neurons.length != data.length)
            throw new Error('Data length is not equal to the number of neurons');

        R.zipWith(setProp('t'), R.map(Val, data ), this.neurons);
    }
});


    /**
 * @param {LinearLayer} a
 * @param {LinearLayer} b
 * @return {LinearLayer}
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
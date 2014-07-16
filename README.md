NeuralJS
========

Neural Networks in JavaScript, inspired by PyBrain.

### fullConnection
**Signature**<br>
```
fullConnection :: Layer -> Layer -> Layer
```

**Expression**<br>
```
fullConnection (la, lb) == lb
```

**Description**<br>
`fullConnection` connects all neurons in `la` to all neurons in `lb`, and returns `lb`. More specifically, for all `Neuron` `na` 
in `la.neurons`, and for all `Neuron` `nb` in `lb.neurons`, `Weight (na, nb)` belongs to `na.targets` and `nb.sources`. 
This is the classical connection between layers.

**Usage**
Since `fullConnection (la, lb)` returns `lb`, this function admits for chaining
```
fullConnection(la, lb);
fullConnection(lb, lc);
```
is equivalent to
```
fullConnection (fullConnection(la, lb), lc);
```
### fullConnectTo
**Signature**<br>
```
(Layer l) => l.fullConnectTo :: Layer -> Layer
```

**Expression**<br>
```
la.fullConnectTo (lb) == fullConnection (la, lb) == lb
```

**Description**<br>
Same as `fullConnection` but wrapped as a method for `Layer`s.

**Usage**
`fullConnectTo` improves the chaining capacities of `fullConnection`, given that
```
fullConnection(la, lb);
fullConnection(lb, lc);
```
is equivalent to
```
la.fullConnectTo (lb).fullConnectTo (lc);
```

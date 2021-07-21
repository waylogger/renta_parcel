// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"static/connection/auth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccess = getAccess;
exports.sessionKeys = exports.dataApiEndpoint = exports.refreshEndpoint = exports.signInEndpoint = exports.login = exports.passwordHash = exports.port = exports.server = void 0;

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var server = 'http://81.177.48.80';
exports.server = server;
var port = '50500';
exports.port = port;
var passwordHash = 'f7f8e967f2756082ada759e8e189e772e00a1deb13583e9beee02ad9a5420fda5ce2069e942cdc22a8cae4ecb90ace005737c6c96dd655330f0f1ae6a0ffd8fc';
exports.passwordHash = passwordHash;
var login = 'USER_FOR_SITE';
exports.login = login;
var signInEndpoint = '/api/v1/tokens/signin';
exports.signInEndpoint = signInEndpoint;
var refreshEndpoint = '/api/v1/tokens/refresh';
exports.refreshEndpoint = refreshEndpoint;
var dataApiEndpoint = 'data_api';
/**
 * @namespace
*/

exports.dataApiEndpoint = dataApiEndpoint;
var sessionKeys = {
  expires: 'expires',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};
/**
 * @function
 * @param {object}
 * @description wrap over localstorage for saving js objects
*/

exports.sessionKeys = sessionKeys;

function saveInSessionStorage(someObject) {
  someObject = JSON.parse(someObject);
  var keys = Object.keys(someObject);
  keys.forEach(function (key, el) {
    sessionStorage.setItem(key, someObject[key]);
  });
}
/**
 * @function
 * @param {array} keys 
 * @returns {object}
 * @description convert sessionStorage to JSObject
*/


function readFromSessionStorage(keys) {
  var resObj = {};
  keys.forEach(function (el) {
    var a = sessionStorage.getItem(el);
    resObj[el] = a;
  });
  return resObj;
} // ------------------------------------------------------------------------------------------------

/**
 * @function
 * @returns sessionKeys from SessionStorage
*/


function getSavedSecret() {
  return _getSavedSecret.apply(this, arguments);
} // ------------------------------------------------------------------------------------------------


function _getSavedSecret() {
  _getSavedSecret = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var savedToken;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            savedToken = readFromSessionStorage(Object.keys(sessionKeys));

            if (!(!savedToken.accessToken || !savedToken.refreshToken || !savedToken.expires)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", undefined);

          case 5:
            return _context.abrupt("return", savedToken);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getSavedSecret.apply(this, arguments);
}

function saveSecret(_x) {
  return _saveSecret.apply(this, arguments);
} // ------------------------------------------------------------------------------------------------


function _saveSecret() {
  _saveSecret = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(secret) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", saveInSessionStorage(secret));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _saveSecret.apply(this, arguments);
}

function getToken(_x2) {
  return _getToken.apply(this, arguments);
} // ------------------------------------------------------------------------------------------------


function _getToken() {
  _getToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(accessData) {
    var path, bdy, token;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (accessData) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", undefined);

          case 2:
            path = "".concat(server, ":").concat(port).concat(signInEndpoint);
            bdy = JSON.stringify(accessData);
            _context3.next = 6;
            return fetch(path, {
              method: 'POST',
              body: bdy,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (res) {
              return res.json();
            }).then(function (res) {
              return res;
            });

          case 6:
            token = _context3.sent;
            return _context3.abrupt("return", token);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getToken.apply(this, arguments);
}

function refreshToken(_x3) {
  return _refreshToken.apply(this, arguments);
} // ------------------------------------------------------------------------------------------------


function _refreshToken() {
  _refreshToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(token) {
    var path, bdy, newToken;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(!token || !token.refreshToken)) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", undefined);

          case 2:
            path = "".concat(server, ":").concat(port).concat(refreshEndpoint);
            bdy = JSON.stringify({
              Token: token.refreshToken
            });
            _context4.next = 6;
            return fetch(path, {
              method: 'POST',
              body: bdy,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (res) {
              return res.json();
            }).then(function (res) {
              return res;
            });

          case 6:
            newToken = _context4.sent;
            return _context4.abrupt("return", newToken);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _refreshToken.apply(this, arguments);
}

function tokenExpired(_x4) {
  return _tokenExpired.apply(this, arguments);
} // ------------------------------------------------------------------------------------------------


function _tokenExpired() {
  _tokenExpired = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(token) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", token.expires < Math.floor(Date.now() / 1000));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _tokenExpired.apply(this, arguments);
}

var token = "";

function auth(_x5) {
  return _auth.apply(this, arguments);
} // ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------


function _auth() {
  _auth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(accessData) {
    var savedToken;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getSavedSecret();

          case 2:
            savedToken = _context6.sent;

            if (savedToken) {
              _context6.next = 14;
              break;
            }

            _context6.next = 6;
            return getToken(accessData);

          case 6:
            token = _context6.sent;

            if (token) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", 'codes.authFailure');

          case 9:
            _context6.next = 11;
            return saveSecret(JSON.stringify(token, null, ' '));

          case 11:
            return _context6.abrupt("return", 'codes.authSuccess');

          case 14:
            _context6.next = 16;
            return tokenExpired(savedToken);

          case 16:
            if (!_context6.sent) {
              _context6.next = 27;
              break;
            }

            _context6.next = 19;
            return refreshToken(savedToken);

          case 19:
            token = _context6.sent;

            if (token) {
              _context6.next = 22;
              break;
            }

            return _context6.abrupt("return", 'codes.authFailure');

          case 22:
            _context6.next = 24;
            return saveSecret(JSON.stringify(token, null, ' '));

          case 24:
            return _context6.abrupt("return", 'codes.authSuccess');

          case 27:
            token = savedToken;
            return _context6.abrupt("return", 'codes.authSuccess');

          case 29:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _auth.apply(this, arguments);
}

var accessData = {
  UserName: login,
  PasswordHash: passwordHash
}; // ------------------------------------------------------------------------------------------------

function getAccess() {
  return _getAccess.apply(this, arguments);
}

function _getAccess() {
  _getAccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return auth(accessData);

          case 2:
            return _context7.abrupt("return", token.accessToken);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _getAccess.apply(this, arguments);
}
},{"regenerator-runtime/runtime":"node_modules/regenerator-runtime/runtime.js"}],"static/connection/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequestBuilder = getRequestBuilder;
exports.getTarrifs = getTarrifs;
exports.getCityList = getCityList;
exports.getCarList = getCarList;
exports.getServiceTypeList = getServiceTypeList;
exports.getServiceList = getServiceList;
exports.getPlaceList = getPlaceList;
exports.getCarFreeList = getCarFreeList;
exports.getCarPeriodList = getCarPeriodList;
exports.getCost = getCost;
exports.sendRequest = sendRequest;

require("regenerator-runtime/runtime");

var _auth = require("./auth");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var queryString = {
  stringify: function stringify(params) {
    if (!params) return;
    return Object.keys(params).map(function (key) {
      return key + '=' + params[key];
    }).join('&');
  }
};

function getRequestBuilder(_x, _x2) {
  return _getRequestBuilder.apply(this, arguments);
}

function _getRequestBuilder() {
  _getRequestBuilder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(urlSuffix, query) {
    var url, token, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = '';
            query ? url = "".concat(_auth.server, ":").concat(_auth.port, "/").concat(_auth.dataApiEndpoint, "/").concat(urlSuffix, "?").concat(query) : url = "".concat(_auth.server, ":").concat(_auth.port, "/").concat(_auth.dataApiEndpoint, "/").concat(urlSuffix);
            _context.next = 4;
            return (0, _auth.getAccess)();

          case 4:
            token = _context.sent;
            _context.next = 7;
            return fetch(url, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer ".concat(token)
              }
            });

          case 7:
            res = _context.sent;
            return _context.abrupt("return", res.json());

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getRequestBuilder.apply(this, arguments);
}

function getTarrifs(_x3) {
  return _getTarrifs.apply(this, arguments);
}

function _getTarrifs() {
  _getTarrifs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(reqObj) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getRequestBuilder('tariff_list', queryString.stringify(reqObj));

          case 2:
            return _context2.abrupt("return", _context2.sent.cars);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getTarrifs.apply(this, arguments);
}

function getCityList() {
  return _getCityList.apply(this, arguments);
}

function _getCityList() {
  _getCityList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getRequestBuilder('city_list', {});

          case 2:
            return _context3.abrupt("return", _context3.sent.cities);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getCityList.apply(this, arguments);
}

function getCarList() {
  return _getCarList.apply(this, arguments);
}

function _getCarList() {
  _getCarList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getRequestBuilder('car_list', {});

          case 2:
            return _context4.abrupt("return", _context4.sent.cars);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getCarList.apply(this, arguments);
}

function getServiceTypeList() {
  return _getServiceTypeList.apply(this, arguments);
}

function _getServiceTypeList() {
  _getServiceTypeList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", getRequestBuilder('service_type_list', {}));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getServiceTypeList.apply(this, arguments);
}

function getServiceList() {
  return _getServiceList.apply(this, arguments);
}

function _getServiceList() {
  _getServiceList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", getRequestBuilder('service_list', {}));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getServiceList.apply(this, arguments);
}

function getPlaceList() {
  return _getPlaceList.apply(this, arguments);
}

function _getPlaceList() {
  _getPlaceList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return getRequestBuilder('place_list', {});

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _getPlaceList.apply(this, arguments);
}

function getCarFreeList(_x4) {
  return _getCarFreeList.apply(this, arguments);
}

function _getCarFreeList() {
  _getCarFreeList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(reqObj) {
    var res;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return getRequestBuilder('car_free_list', queryString.stringify(reqObj));

          case 2:
            res = _context8.sent.cars;
            return _context8.abrupt("return", res);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getCarFreeList.apply(this, arguments);
}

function getCarPeriodList(_x5) {
  return _getCarPeriodList.apply(this, arguments);
}

function _getCarPeriodList() {
  _getCarPeriodList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(reqObj) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getRequestBuilder('car_period_list', queryString.stringify(reqObj));

          case 2:
            return _context9.abrupt("return", _context9.sent.car_periods);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _getCarPeriodList.apply(this, arguments);
}

function getCost(_x6) {
  return _getCost.apply(this, arguments);
}

function _getCost() {
  _getCost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(reqObj) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return getRequestBuilder('bid_cost', queryString.stringify(reqObj, {
              arrayFormat: 'bracket'
            }));

          case 2:
            return _context10.abrupt("return", _context10.sent);

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _getCost.apply(this, arguments);
}

function sendRequest(_x7) {
  return _sendRequest.apply(this, arguments);
}

function _sendRequest() {
  _sendRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(body) {
    var urlSuffix, url, token, res;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            urlSuffix = 'bid_create';
            url = "".concat(_auth.server, ":").concat(_auth.port, "/").concat(_auth.dataApiEndpoint, "/").concat(urlSuffix);
            _context11.next = 4;
            return (0, _auth.getAccess)();

          case 4:
            token = _context11.sent;
            _context11.next = 7;
            return fetch(url, {
              method: 'PUT',
              headers: {
                'Authorization': "Bearer ".concat(token)
              },
              body: body
            });

          case 7:
            res = _context11.sent;
            return _context11.abrupt("return", res.json());

          case 9:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _sendRequest.apply(this, arguments);
}
},{"regenerator-runtime/runtime":"node_modules/regenerator-runtime/runtime.js","./auth":"static/connection/auth.js"}],"static/state/dataFromServer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataFromServer = void 0;

var _month;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file dataFromServer.js
 * @module clietn/state/dataFromServer.js
*/

/**
 * @constant
*/
var month = (_month = {}, _defineProperty(_month, 1, 'Январь'), _defineProperty(_month, 2, 'Февраль'), _defineProperty(_month, 3, 'Март'), _defineProperty(_month, 4, 'Апрель'), _defineProperty(_month, 5, 'Май'), _defineProperty(_month, 6, 'Июнь'), _defineProperty(_month, 7, 'Июль'), _defineProperty(_month, 8, 'Август'), _defineProperty(_month, 9, 'Сентябрь'), _defineProperty(_month, 10, 'Октябрь'), _defineProperty(_month, 11, 'Ноябрь'), _defineProperty(_month, 12, 'Декабрь'), _month);
/**
 * @function
 * @param {string} monthStr
 * @returns {number}
*/

function translateMonth(monthStr) {
  return Object.keys(month).filter(function (item) {
    return month[item] === monthStr;
  })[0];
}
/**
 * @constant
 * @property {Array} placeToReceiveOrReturnCar=[]
*/


var dataFromServer = {
  placesToReceiveOrReturnCar: [],
  //fill by components/placeSelector.js
  carList: [],
  tariffsList: [],
  currentCar: '',
  carToBid: '',
  beginFetchPeriod: "".concat(new Date().getFullYear(), "-01-01 00:00"),
  endFetchPeriod: "".concat(new Date().getFullYear(), "-12-31 00:00"),
  freePeriods: [],
  operationCars: [],
  clickedCars: [],

  /**
   * @property {function} getPlaceId
   * @returns {number} 
   * @description фильтруем placeToReceiveOrReturnCar по полученному аргументу, возвращаем Id найденной записи
  */
  getPlaceId: function getPlaceId(place) {
    if (!place) return undefined;
    place = place.split(' + ');

    if (place.length != 2) {
      return dataFromServer.placesToReceiveOrReturnCar[0].place_id;
    }

    place = place[0];
    var id = dataFromServer.placesToReceiveOrReturnCar.filter(function (a) {
      return a.title === place;
    })[0].place_id;
    return id;
  },

  /**
   * @function
   * @returns {number} id of place with free delivery cost
  */
  getFreePlace: function getFreePlace() {
    var freePlace = dataFromServer.placesToReceiveOrReturnCar.filter(function (item) {
      return item.delivery_cost === 0;
    })[0];
    return freePlace.place_id;
  },
  getDeliveryCost: function getDeliveryCost(id) {
    var place = dataFromServer.placesToReceiveOrReturnCar.filter(function (a) {
      return a.place_id === id;
    })[0];
    return place ? place.delivery_cost : 0;
  },

  /**
   * @function
   * @param {string} carStr
   * @example
   * hyundai_creta -> id
  */

  /**
   * @function
   * @param {string} carHashStr
   * @returns carObject
  */
  getCurrentCar: function getCurrentCar() {
    var carHashStr = location.hash.slice(1, location.hash.length);
    var car = dataFromServer.carList.filter(function (item) {
      item = item.model.toString();
      item = item.replace(/\([^\s]+\)/, '');
      item = item.trim();
      item = item.replace(/\s/g, '_');
      item = item.toLocaleLowerCase();
      return item === carHashStr;
    });
    dataFromServer.currentCar = car;
    return car;
  },

  /**
   * @function
   * @param {number} carId
   * @returns {object} tarrrifs for it car
  */
  getTarrifs: function getTarrifs() {},

  /**
   * @constant
  */
  dataSent: false,

  /**
   * @function
  */
  currentMonth: function currentMonth() {
    var a = $("#dp-cal-month-text").text();
    return translateMonth(a);
  },

  /**
   * @function
   * @returns {Array}
  */
  currentMonths: function currentMonths() {
    var m = dataFromServer.currentMonth();
    var prevMonth = m - 1 === 0 ? 12 : m - 1;
    var lastMonth = m + 1 === 13 ? 1 : m + 1;
    return [prevMonth, m, lastMonth];
  },

  /**
   * @function
  */
  currentDay: function currentDay() {
    var d = $(".dp-current").text();
    if (d) return parseInt(d, 10);
    return;
  },

  /**
   * @function
   * @returns {Array} of days
  */
  currentDays: function currentDays() {
    var days = $(".dp-day").toArray();
    days = days.map(function (item, inx) {
      return item.id;
    });
    return days;
  },

  /**
   * @function
  */
  currentYear: function currentYear() {
    var y = $('.dp-cal-year').text();
    if (y) return parseInt(y, 10);
    return;
  },

  /**
   * @function
  */
  currentYears: function currentYears() {
    var y = dataFromServer.currentYear();
    return [y - 1, y, y + 1];
  },

  /**
   * @function
   * @param {String} dayId
   * @return {Boolean}
  */
  needToDisable: function needToDisable(dayId) {
    var dt = new Date();
    var year = dt.getFullYear();
    if (!dataFromServer.currentYear()) return undefined;
    if (year > dataFromServer.currentYear()) return true;
    return false;
  }
};
exports.dataFromServer = dataFromServer;
},{}],"static/components/carSelector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCarsAndTariffs = getCarsAndTariffs;

require("regenerator-runtime/runtime");

var _index = require("../connection/index");

var _dataFromServer = require("../state/dataFromServer");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @file carSelector.js
 * @module client/components/carSelector.js
*/
function getCarsAndTariffs() {
  return _getCarsAndTariffs.apply(this, arguments);
}

function _getCarsAndTariffs() {
  _getCarsAndTariffs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var promises, i, tarifObj;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _index.getCarList)();

          case 2:
            _dataFromServer.dataFromServer.carList = _context.sent;
            promises = [];

            for (i = 0; i < _dataFromServer.dataFromServer.carList.length; ++i) {
              tarifObj = {
                car_id: _dataFromServer.dataFromServer.carList[i].car_id
              };
              promises.push((0, _index.getTarrifs)(tarifObj));
            }

            _context.next = 7;
            return Promise.all(promises);

          case 7:
            _dataFromServer.dataFromServer.tariffsList = _context.sent;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getCarsAndTariffs.apply(this, arguments);
}
},{"regenerator-runtime/runtime":"node_modules/regenerator-runtime/runtime.js","../connection/index":"static/connection/index.js","../state/dataFromServer":"static/state/dataFromServer.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43117" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","static/components/carSelector.js"], null)
//# sourceMappingURL=/carSelector.d095cf27.js.map
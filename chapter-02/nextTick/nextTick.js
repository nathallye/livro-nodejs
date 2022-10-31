const recursiveCompute = function() {
  //...
  process.nextTick(recursiveCompute);
};
recursiveCompute();
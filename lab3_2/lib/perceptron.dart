perceptron(int endPoint, double learningRate, int maxIterations, double maxTime) {
  double w1 = 0;
  double w2 = 0;
  
  const input = [
      [0,6],
      [1,5],
      [3,3],
      [2,4],
    ];

    double time = 0;
    int iterations = 0;

    while (maxIterations > time && maxTime > iterations) {
      var begin = DateTime.now().microsecondsSinceEpoch;
      for (final value in input) {
        var y = w1 * value[0].toDouble() + w2 * value[1].toDouble();
        var delta = endPoint - y;
        delta = delta > 0 ? delta : 0;

        w1 += delta * value[0].toDouble() * learningRate;
        w2 += delta * value[1].toDouble() * learningRate;
      }
      var end = DateTime.now().microsecondsSinceEpoch;
      time += (end - begin) / 1000;
      iterations++;
    }
    return [w1, w2, time, iterations];
  
}
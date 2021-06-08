import 'dart:math';
List<double> fitnessFunction(List<int> deltas) {
  List<double> reverseDeltas = deltas.map((delta) => 1 / delta).toList();
  double reversedDeltaSum =
      reverseDeltas.reduce((value, element) => value += element);
  List<double> fitnesses =
      reverseDeltas.map((deltas) => (deltas / reversedDeltaSum) * 100).toList();
  return fitnesses;
}

List<List<int>> diophant({a, b, c, d, ans, iter}) {
  int maxRange = (ans / 2).round();
  List<List<int>> initVals = [];
  for (int i = 0; i < 5; i++) {
    initVals.add([
      Random().nextInt(maxRange) + 1,
      Random().nextInt(maxRange) + 1,
      Random().nextInt(maxRange) + 1,
      Random().nextInt(maxRange) + 1
    ]);
  }
  var successRes = 0;
  var iterations = 1;
  while (successRes != 1) {
    List<int> deltas = initVals
        .map<int>((gen) =>
            (ans - (a * gen[0] + b * gen[1] + c * gen[2] + d * gen[3])).abs())
        .toList();
    var resultIndex = deltas.indexOf(0);
    if (resultIndex > -1) {
      successRes = 1;
      return [
        initVals[resultIndex],
        [iterations]
      ];
    }
    List<double> fitnesses = fitnessFunction(deltas);

    var bestParentArr = [];
    for (int i = 0; i < fitnesses.length; i++) {
      for (int j = 0; j < fitnesses[i].round(); j++) {
        bestParentArr.add(i);
      }
    }
    List<List<int>> parents = [];
    List<List<int>> newInitVals = [];

    for (int i = 0; i < 5; i++) {
      var firstParent;
      var secondParent;
      do {
        firstParent = bestParentArr[Random().nextInt(bestParentArr.length)];
        secondParent = bestParentArr[Random().nextInt(bestParentArr.length)];
      } while (firstParent == secondParent ||
          parents
                  .where((parent) =>
                      parent[0] == firstParent && parent[1] == secondParent)
                  .length >
              0);
      parents.add([firstParent, secondParent]);

      var devider = Random().nextInt(3);
      var mutant = Random().nextInt(2);
      List<int> child = [];
      List<int> firstGen = [];
      List<int> secondGen = [];
      switch (devider) {
        case 0:
          if (mutant == 0) {
            firstGen = [0, 1];
            secondGen = [1, 4];
          } else {
            secondGen = [0, 1];
            firstGen = [1, 4];
          }
          break;
        case 1:
          if (mutant == 0) {
            firstGen = [0, 2];
            secondGen = [2, 4];
          } else {
            secondGen = [0, 2];
            firstGen = [2, 4];
          }
          break;
        case 2:
          if (mutant == 0) {
            firstGen = [0, 3];
            secondGen = [3, 4];
          } else {
            secondGen = [0, 3];
            firstGen = [3, 4];
          }
          break;
        default:
      }

      child.addAll(initVals[firstParent].getRange(firstGen[0], firstGen[1]));
      child.addAll(initVals[secondParent].getRange(secondGen[0], secondGen[1]));
      newInitVals.add(child);
    }
    List<int> newInitValsDelta = newInitVals
        .map<int>((gen) =>
            (ans - (a * gen[0] + b * gen[1] + c * gen[2] + d * gen[3])).abs())
        .toList();
    double avgDelta =
        deltas.reduce((value, element) => value + element) / deltas.length;
    double avgNewValDelta =
        newInitValsDelta.reduce((value, element) => value + element) /
            newInitValsDelta.length;
    if (avgDelta > avgNewValDelta) {
      for (int i = 0; i < newInitVals.length; i++) {
        for (int j = 0; j < 4; j++) {
          var randomInt = Random().nextInt(10);
          if (randomInt > 4) {
            newInitVals[i][j] = Random().nextInt((ans / 2).round());
          }
        }
      }
    }
    initVals = newInitVals.getRange(0, 5).toList();
    iterations++;
    if (iterations > iter - 1) {
      return [
        initVals[0],
        [iterations]
      ];
    }
  }
}
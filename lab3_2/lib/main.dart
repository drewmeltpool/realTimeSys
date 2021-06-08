import 'dart:math';

import 'package:flutter/material.dart';
import 'package:lab3_2/perceptron.dart';

void main() {
  runApp(MaterialApp(
    theme: ThemeData.dark(),
    home: HomePage(),
  ));
}

class HomePage extends StatefulWidget {
  @override
  _HomeAppState createState() => _HomeAppState();
}

class _HomeAppState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text('Perceptron'),
      ),
      body: PerceptionPage(),
    );
  }
}

class PerceptionPage extends StatefulWidget {
  PerceptionPage({Key key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return __PerceptionPageState();
  }
}

class __PerceptionPageState extends State<PerceptionPage> {
  double w1;
  double w2;
  int iterations;
  double time;

  TextEditingController iterationController = TextEditingController();
  TextEditingController maxTimeController = TextEditingController();
  TextEditingController learningController = TextEditingController();

  changeState(res) {
    setState(() {
      w1 = res[0];
      w2 = res[1];
      iterations = res[2];
      time = res[3];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(children: [
              Container(
                child: TextField(
                  controller: iterationController,
                  keyboardType: TextInputType.number,
                  obscureText: false,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Iteration',
                      labelStyle: TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                      )),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 10),
                child: TextField(
                  controller: maxTimeController,
                  keyboardType: TextInputType.number,
                  obscureText: false,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Max Time',
                      labelStyle: TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                      )),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 10),
                child: TextField(
                  controller: learningController,
                  keyboardType: TextInputType.number,
                  obscureText: false,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Learning Time',
                      labelStyle: TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                      )),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 10),
                child: MaterialButton(
                  onPressed: () {
                    // var iter = int.parse(iterationController.text);
                    // var time = double.parse(maxTimeController.text);
                    // var learn = double.parse(learningController.text);

                    // changeState(perceptron(4, learn, iter, time));
                    var rng = new Random();
                    var begin = DateTime.now().microsecondsSinceEpoch / 1000;
                    var end = begin;
                    const duration = 3000;
                    while (end - begin < duration) {
                      print(perceptron(rng.nextInt(100), rng.nextDouble() * 100,
                          rng.nextInt(100), rng.nextDouble() * 100));
                      end = DateTime.now().microsecondsSinceEpoch / 1000;
                    }
                  },
                  color: Colors.green,
                  child: SizedBox(
                    width: double.infinity,
                    child: Padding(
                        padding: EdgeInsets.only(top: 15, bottom: 15),
                        child:
                            Text('Calculate', style: TextStyle(fontSize: 20))),
                  ),
                ),
              ),
              Container(
                  alignment: Alignment.topLeft,
                  margin: EdgeInsets.only(top: 10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('w1: $w1', style: TextStyle(fontSize: 20)),
                      Text('w2: $w2', style: TextStyle(fontSize: 20)),
                      Text('iteration: $iterations',
                          style: TextStyle(fontSize: 20)),
                      Text('time: $time', style: TextStyle(fontSize: 20)),
                    ],
                  )),
            ])));
  }
}

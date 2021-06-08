import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'GA.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Generic Diophantus',
      theme: ThemeData.dark(),
      home: MyHomePage(title: 'Generic Diophantus'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int a = 0;
  int b = 0;
  int c = 0;
  int d = 0;
  int answer = 0;
  int iteration = 0;

  TextEditingController aNumber = TextEditingController();
  TextEditingController bNumber = TextEditingController();
  TextEditingController cNumber = TextEditingController();
  TextEditingController dNumber = TextEditingController();
  TextEditingController ansNumber = TextEditingController();
  TextEditingController iterNumber = TextEditingController();

  updateAnswer(ans) {
    setState(() {
      if (ans != null) {
        a = ans[0][0];
        b = ans[0][1];
        c = ans[0][2];
        d = ans[0][3];
        answer = int.parse(ansNumber.text);
        iteration = ans[1][0];
      }
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text('Genetic'),
        ),
        body: Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(children: [
              Container(
                margin: EdgeInsets.only(top: 10),
                child: TextField(
                  controller: aNumber,
                  keyboardType: TextInputType.number,
                  obscureText: false,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'A',
                      labelStyle: TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                      )),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 10),
                child: TextField(
                  controller: bNumber,
                  keyboardType: TextInputType.number,
                  obscureText: false,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'B',
                      labelStyle: TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                      )),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 10),
                child: TextField(
                  controller: cNumber,
                  keyboardType: TextInputType.number,
                  obscureText: false,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'C',
                      labelStyle: TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                      )),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 10),
                child: TextField(
                  controller: dNumber,
                  keyboardType: TextInputType.number,
                  obscureText: false,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'D',
                      labelStyle: TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                      )),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 10),
                child: TextField(
                  controller: ansNumber,
                  keyboardType: TextInputType.number,
                  obscureText: false,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'D',
                      labelStyle: TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                      )),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 10),
                child: TextField(
                  controller: iterNumber,
                  keyboardType: TextInputType.number,
                  obscureText: false,
                  decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Iterations',
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
                    var x1 = int.parse(aNumber.text);
                    var x2 = int.parse(bNumber.text);
                    var x3 = int.parse(cNumber.text);
                    var x4 = int.parse(dNumber.text);
                    var ans = int.parse(ansNumber.text);
                    var iter = int.parse(iterNumber.text);
                    var dd = diophant(
                        a: x1, 
                        b: x2, 
                        c: x3, 
                        d: x4, 
                        ans: ans, 
                        iter: iter
                    );

                    if (dd == null) {
                      _errorDialog();
                      return;
                    }
                    updateAnswer(dd);
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
                    Text('a: $a'),
                    Text('b: $b'),
                    Text('c: $c'),
                    Text('d: $d'),
                    Text('answer: $answer'),
                    Text('iteration: $iteration'),
                  ],
                ),
              ),
            ])));
  }

  _errorDialog() {
    showDialog(
        context: context,
        builder: (_) => new AlertDialog(
              title: new Text("Error Dialog"),
              content: new Text("Itertation > 100"),
              actions: <Widget>[
                MaterialButton(
                  child: Text('Close'),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                )
              ],
            ));
  }
}

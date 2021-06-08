import 'package:flutter/material.dart';
import 'ferma.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Lab3.1',
      theme: ThemeData.dark(),
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  TextEditingController fermaInput = new TextEditingController();

  String answer = '';
  void changeData() {
    setState(() {
      answer = ferma(int.parse(fermaInput.text));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('Ferma Algorithm')),
        body: Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(children: [
              TextField(
                controller: fermaInput,
                keyboardType: TextInputType.number,
                obscureText: false,
                decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Ferma Method',
                    hintText: 'Input int number',
                    labelStyle: TextStyle(
                      fontSize: 16,
                      color: Colors.white,
                    )),
              ),
              Container(
                margin: const EdgeInsets.only(top: 10),
                child: MaterialButton(
                  onPressed: changeData,
                  color: Colors.green,
                  child: SizedBox(
                    width: double.infinity,
                    child: Padding(
                        padding: EdgeInsets.only(top: 10, bottom: 10),
                        child: Text('Raised Button')),
                  ),
                ),
              ),
              Container(
                  margin: const EdgeInsets.only(top: 10),
                  child: Text('$answer', 
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),))
            ])));
  }

}

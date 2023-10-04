import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String buttonName = 'Click';
  int bottomBarIndex = 0;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("I luv tutorials"),
        ),
        body: Center(
          child: ElevatedButton(
              onPressed: () {
                setState(() {
                  buttonName = 'dododo $buttonName';
                });
              },
              child: Text(buttonName)),
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const [
            BottomNavigationBarItem(
              label: "Home",
              icon: Icon(Icons.home),
            ),
            BottomNavigationBarItem(
              label: "Settings",
              icon: Icon(Icons.settings),
            )
          ],
          currentIndex: bottomBarIndex,
          onTap: (int index) {
            setState(() {
              bottomBarIndex = index;
            });
          },
        ),
      ),

      // OPTIONS
      debugShowCheckedModeBanner: false,
    );
  }
}

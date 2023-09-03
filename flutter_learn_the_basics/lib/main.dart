import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("I luv tutorials"),
        ),
        body: const Text("im in the body now"),
        bottomNavigationBar: BottomNavigationBar(
          items: const [
             BottomNavigationBarItem(
              label: "Home",
              icon: Icon(Icons.home)
            ),
             BottomNavigationBarItem(
              label:"Home",
              icon: Icon(Icons.home)
            )
          ],
        ),
      ),

      // OPTIONS
      debugShowCheckedModeBanner: false,
    );
  }
}

import 'package:flutter/material.dart';

import 'home_screen.dart';
import 'version_screen.dart';
import 'settings_screen.dart';

class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});

  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int currentIndex = 0;

  final List<Widget> pages = const [
    HomeScreen(),
    VersionScreen(),
    SettingsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: pages[currentIndex],

      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(28),
            topRight: Radius.circular(28),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 20,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(28),
            topRight: Radius.circular(28),
          ),
          child: NavigationBar(
            backgroundColor: Colors.white,
            surfaceTintColor: Colors.white,
            indicatorColor: const Color(0xFFEDE7FF),
            selectedIndex: currentIndex,
            height: 78,

            labelBehavior:
                NavigationDestinationLabelBehavior.alwaysShow,

            onDestinationSelected: (index) {
              setState(() {
                currentIndex = index;
              });
            },

            destinations: const [
              NavigationDestination(
                icon: Icon(Icons.menu_book_outlined),
                selectedIcon: Icon(
                  Icons.menu_book,
                  color: Colors.deepPurple,
                ),
                label: "Bible",
              ),
              NavigationDestination(
                icon: Icon(Icons.workspace_premium_outlined),
                selectedIcon: Icon(
                  Icons.workspace_premium,
                  color: Colors.amber,
                ),
                label: "Premium",
              ),
              NavigationDestination(
                icon: Icon(Icons.settings_outlined),
                selectedIcon: Icon(
                  Icons.settings,
                  color: Colors.blue,
                ),
                label: "Settings",
              ),
            ],
          ),
        ),
      ),
    );
  }
}

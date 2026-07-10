import 'package:flutter/material.dart';

import 'screens/main_navigation.dart';
import 'services/settings_service.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const PeaceMBibleApp());
}

class PeaceMBibleApp extends StatefulWidget {
  const PeaceMBibleApp({super.key});

  @override
  State<PeaceMBibleApp> createState() => _PeaceMBibleAppState();
}

class _PeaceMBibleAppState extends State<PeaceMBibleApp> {
  ThemeMode themeMode = ThemeMode.system;

  @override
  void initState() {
    super.initState();
    loadTheme();
  }

  Future<void> loadTheme() async {
    themeMode = await SettingsService.getThemeMode();

    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "Peace M Bible",

      themeMode: themeMode,

      theme: ThemeData(
        colorSchemeSeed: Colors.deepPurple,
        useMaterial3: true,
        brightness: Brightness.light,
      ),

      darkTheme: ThemeData(
        colorSchemeSeed: Colors.deepPurple,
        useMaterial3: true,
        brightness: Brightness.dark,
      ),

      home: const MainNavigation(),
    );
  }
}

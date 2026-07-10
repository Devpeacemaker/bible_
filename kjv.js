import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'providers/settings_provider.dart';
import 'providers/highlight_provider.dart';
import 'providers/translation_provider.dart';

import 'screens/main_navigation.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final settingsProvider = SettingsProvider();
  await settingsProvider.load();

  final highlightProvider = HighlightProvider();
  await highlightProvider.load();

  final translationProvider = TranslationProvider();
  await translationProvider.load();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider.value(
          value: settingsProvider,
        ),
        ChangeNotifierProvider.value(
          value: highlightProvider,
        ),
        ChangeNotifierProvider.value(
          value: translationProvider,
        ),
      ],
      child: const PeaceMBibleApp(),
    ),
  );
}

class PeaceMBibleApp extends StatelessWidget {
  const PeaceMBibleApp({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = Provider.of<SettingsProvider>(context);

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Peace M Bible',

      themeMode: settings.themeMode,

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

import 'package:flutter/material.dart';
import '../services/settings_service.dart';

class SettingsProvider extends ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.system;
  double _fontSize = 18;

  ThemeMode get themeMode => _themeMode;
  double get fontSize => _fontSize;

  Future<void> load() async {
    _themeMode = await SettingsService.getThemeMode();
    _fontSize = await SettingsService.getFontSize();
    notifyListeners();
  }

  Future<void> setTheme(ThemeMode mode) async {
    _themeMode = mode;
    await SettingsService.saveThemeMode(mode);
    notifyListeners();
  }

  Future<void> setFontSize(double size) async {
    _fontSize = size;
    await SettingsService.saveFontSize(size);
    notifyListeners();
  }
}

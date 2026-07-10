import 'package:flutter/material.dart';
import '../services/settings_service.dart';

class SettingsProvider extends ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.system;
  double _fontSize = 18;
  Color _highlightColor = Colors.yellow;

  String _selectedBible = "kjv";
  bool _isPremium = false;

  ThemeMode get themeMode => _themeMode;
  double get fontSize => _fontSize;
  Color get highlightColor => _highlightColor;

  String get selectedBible => _selectedBible;
  bool get isPremium => _isPremium;

  Future<void> load() async {
    _themeMode = await SettingsService.getThemeMode();
    _fontSize = await SettingsService.getFontSize();
    _highlightColor = await SettingsService.getHighlightColor();
    _selectedBible = await SettingsService.getBibleVersion();
    _isPremium = await SettingsService.isPremium();

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

  Future<void> setHighlightColor(Color color) async {
    _highlightColor = color;
    await SettingsService.saveHighlightColor(color);
    notifyListeners();
  }

  Future<void> setBibleVersion(String version) async {
    _selectedBible = version;
    await SettingsService.saveBibleVersion(version);
    notifyListeners();
  }

  Future<void> activatePremium() async {
    _isPremium = true;
    await SettingsService.activatePremium();
    notifyListeners();
  }
}

import 'package:flutter/material.dart';
import '../services/settings_service.dart';

class SettingsProvider extends ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.system;
  double _fontSize = 18;

  bool _dailyVerse = true;
  bool _soundEnabled = true;
  bool _keepScreenOn = false;

  Color _highlightColor = Colors.yellow;
  String _selectedBible = "kjv";
  bool _isPremium = false;

  ThemeMode get themeMode => _themeMode;
  double get fontSize => _fontSize;

  bool get dailyVerse => _dailyVerse;
  bool get soundEnabled => _soundEnabled;
  bool get keepScreenOn => _keepScreenOn;

  Color get highlightColor => _highlightColor;
  String get selectedBible => _selectedBible;
  bool get isPremium => _isPremium;

  Future<void> load() async {
    _themeMode = await SettingsService.getThemeMode();
    _fontSize = await SettingsService.getFontSize();

    _dailyVerse = await SettingsService.getDailyVerse();
    _soundEnabled = await SettingsService.getSoundEnabled();
    _keepScreenOn = await SettingsService.getKeepScreenOn();

    _highlightColor = await SettingsService.getHighlightColor();
    _selectedBible = await SettingsService.getBibleVersion();
    _isPremium = await SettingsService.isPremium();

    notifyListeners();
  }

  Future<void> setThemeMode(ThemeMode mode) async {
    _themeMode = mode;
    await SettingsService.saveThemeMode(mode);
    notifyListeners();
  }

  Future<void> setFontSize(double size) async {
    _fontSize = size;
    await SettingsService.saveFontSize(size);
    notifyListeners();
  }

  Future<void> setDailyVerse(bool value) async {
    _dailyVerse = value;
    await SettingsService.saveDailyVerse(value);
    notifyListeners();
  }

  Future<void> setSoundEnabled(bool value) async {
    _soundEnabled = value;
    await SettingsService.saveSoundEnabled(value);
    notifyListeners();
  }

  Future<void> setKeepScreenOn(bool value) async {
    _keepScreenOn = value;
    await SettingsService.saveKeepScreenOn(value);
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

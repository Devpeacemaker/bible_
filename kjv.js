import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsService {
  // =========================
  // THEME
  // =========================

  static Future<void> saveThemeMode(ThemeMode mode) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString("theme", mode.name);
  }

  static Future<ThemeMode> getThemeMode() async {
    final prefs = await SharedPreferences.getInstance();

    switch (prefs.getString("theme")) {
      case "light":
        return ThemeMode.light;
      case "dark":
        return ThemeMode.dark;
      default:
        return ThemeMode.system;
    }
  }

  // =========================
  // FONT SIZE
  // =========================

  static Future<void> saveFontSize(double size) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setDouble("fontSize", size);
  }

  static Future<double> getFontSize() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getDouble("fontSize") ?? 18;
  }

  // =========================
  // DAILY VERSE
  // =========================

  static Future<void> saveDailyVerse(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool("dailyVerse", value);
  }

  static Future<bool> getDailyVerse() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool("dailyVerse") ?? true;
  }

  // =========================
  // READING SOUND
  // =========================

  static Future<void> saveSoundEnabled(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool("soundEnabled", value);
  }

  static Future<bool> getSoundEnabled() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool("soundEnabled") ?? true;
  }

  // =========================
  // KEEP SCREEN AWAKE
  // =========================

  static Future<void> saveKeepScreenOn(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool("keepScreenOn", value);
  }

  static Future<bool> getKeepScreenOn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool("keepScreenOn") ?? false;
  }

  // =========================
  // DEFAULT BIBLE VERSION
  // =========================

  static Future<void> saveBibleVersion(String version) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString("bibleVersion", version);
  }

  static Future<String> getBibleVersion() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString("bibleVersion") ?? "KJV";
  }
}

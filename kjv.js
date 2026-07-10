import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TranslationProvider extends ChangeNotifier {
  String _translation = "KJV";
  bool _premium = false;

  String get translation => _translation;
  bool get premium => _premium;

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();

    _translation = prefs.getString("translation") ?? "KJV";
    _premium = prefs.getBool("premium") ?? false;

    notifyListeners();
  }

  Future<void> setTranslation(String version) async {
    _translation = version;

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString("translation", version);

    notifyListeners();
  }

  Future<void> setPremium(bool value) async {
    _premium = value;

    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool("premium", value);

    notifyListeners();
  }

  bool isLocked(String version) {
    if (version == "KJV") {
      return false;
    }

    return !_premium;
  }
}

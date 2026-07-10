import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HighlightProvider extends ChangeNotifier {
  final Map<String, Color> _highlights = {};

  Map<String, Color> get highlights => _highlights;

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();

    final data = prefs.getStringList("highlights") ?? [];

    _highlights.clear();

    for (final item in data) {
      final parts = item.split("|");

      if (parts.length == 2) {
        _highlights[parts[0]] =
            Color(int.parse(parts[1]));
      }
    }

    notifyListeners();
  }

  Future<void> highlightVerse(
    String key,
    Color color,
  ) async {
    _highlights[key] = color;

    await _save();

    notifyListeners();
  }

  Future<void> removeHighlight(
    String key,
  ) async {
    _highlights.remove(key);

    await _save();

    notifyListeners();
  }

  Color? getHighlight(String key) {
    return _highlights[key];
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();

    final List<String> data = [];

    _highlights.forEach((key, color) {
      data.add("$key|${color.value}");
    });

    await prefs.setStringList(
      "highlights",
      data,
    );
  }
}

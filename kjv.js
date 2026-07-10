import 'dart:convert';
import 'package:flutter/services.dart';

class BibleService {
  static List<dynamic>? _books;
  static String _currentVersion = "kjv";

  /// Current loaded version
  static String get currentVersion => _currentVersion;

  /// Change Bible version
  static Future<void> setVersion(String version) async {
    if (_currentVersion == version && _books != null) return;

    _currentVersion = version;
    _books = null;

    await loadBible();
  }

  /// Load selected Bible
  static Future<void> loadBible() async {
    if (_books != null) return;

    String file = "assets/bibles/kjv.json";

    switch (_currentVersion) {
      case "eng":
        file = "assets/bibles/eng.json";
        break;

      case "swa":
        file = "assets/bibles/swa.json";
        break;

      case "kjv":
      default:
        file = "assets/bibles/kjv.json";
    }

    final jsonString = await rootBundle.loadString(file);

    _books = json.decode(jsonString);
  }

  /// Read chapter
  static Future<List<String>> getChapter(
    int bookIndex,
    int chapterIndex,
  ) async {
    await loadBible();

    final chapters = _books![bookIndex]["chapters"] as List;
    final verses = chapters[chapterIndex] as List;

    return verses.map((e) => e.toString()).toList();
  }

  /// Search selected Bible
  static Future<List<Map<String, dynamic>>> searchBible(
    String keyword,
  ) async {
    await loadBible();

    keyword = keyword.toLowerCase();

    List<Map<String, dynamic>> results = [];

    for (int book = 0; book < _books!.length; book++) {
      final bookData = _books![book];

      final chapters = bookData["chapters"] as List;

      for (int chapter = 0; chapter < chapters.length; chapter++) {
        final verses = chapters[chapter] as List;

        for (int verse = 0; verse < verses.length; verse++) {
          final text = verses[verse].toString();

          if (text.toLowerCase().contains(keyword)) {
            results.add({
              "bookIndex": book,
              "chapter": chapter + 1,
              "verse": verse + 1,
              "text": text,
            });
          }
        }
      }
    }

    return results;
  }
}

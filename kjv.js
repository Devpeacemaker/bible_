import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;

class BibleService {
  static List<dynamic>? _books;

  static String _currentVersion = "kjv";

  static String get currentVersion => _currentVersion;

  static Future<void> setVersion(String version) async {
    _currentVersion = version;

    if (version == "eng") {
      _books = null;
      return;
    }

    _books = null;

    await loadBible();
  }

  static Future<void> loadBible() async {
    if (_books != null) return;

    String file = "assets/bibles/kjv.json";

    switch (_currentVersion) {
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

  static Future<List<String>> getEnglishChapter(
    String book,
    int chapter,
  ) async {
    final response = await http.get(
      Uri.parse(
        "https://bible-api.com/${Uri.encodeComponent("$book $chapter")}",
      ),
    );

    if (response.statusCode != 200) {
      throw Exception("Failed to load English Bible");
    }

    final data = jsonDecode(response.body);

    final verses = data["verses"] as List;

    return verses
        .map<String>((v) => v["text"].toString().trim())
        .toList();
  }

  static Future<List<String>> getChapter(
    int bookIndex,
    int chapterIndex,
  ) async {
    await loadBible();

    final chapters = _books![bookIndex]["chapters"] as List;

    final verses = chapters[chapterIndex] as List;

    return verses
        .map((e) => e.toString())
        .toList();
  }

  static Future<List<Map<String, dynamic>>> searchBible(
    String keyword,
  ) async {
    await loadBible();

    keyword = keyword.toLowerCase();

    List<Map<String, dynamic>> results = [];

    for (int book = 0; book < _books!.length; book++) {
      final bookData = _books![book];

      final chapters = bookData["chapters"] as List;

      for (int chapter = 0;
          chapter < chapters.length;
          chapter++) {
        final verses = chapters[chapter] as List;

        for (int verse = 0;
            verse < verses.length;
            verse++) {
          final text = verses[verse].toString();

          if (text
              .toLowerCase()
              .contains(keyword)) {
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

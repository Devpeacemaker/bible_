import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;

class BibleService {
  static List<dynamic>? _books;

  static String _currentVersion = "kjv";

  static const String apiUrl =
      "https://peace-m-bible-backend.onrender.com";

  static String get currentVersion =>
      _currentVersion;

  static Future<void> setVersion(
      String version) async {
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

    final jsonString =
        await rootBundle.loadString(file);

    _books = json.decode(jsonString);
  }
  static Future<List<String>> getChapter(
    int bookIndex,
    int chapterIndex,
  ) async {
    if (_currentVersion == "eng") {
      final response = await http.get(
        Uri.parse(
          "$apiUrl/bible/eng/$bookIndex/$chapterIndex",
        ),
      );

      if (response.statusCode != 200) {
        throw Exception("Failed to load chapter");
      }

      final data = jsonDecode(response.body);

      return List<String>.from(data["verses"]);
    }

    await loadBible();

    final chapters =
        _books![bookIndex]["chapters"] as List;

    final verses =
        chapters[chapterIndex] as List;

    return verses
        .map((e) => e.toString())
        .toList();
  }

  static Future<List<Map<String, dynamic>>>
      searchBible(String keyword) async {
    if (_currentVersion == "eng") {
      final response = await http.get(
        Uri.parse(
          "$apiUrl/search/eng?query=$keyword",
        ),
      );

      if (response.statusCode != 200) {
        return [];
      }

      return List<Map<String, dynamic>>.from(
        jsonDecode(response.body),
      );
    }

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

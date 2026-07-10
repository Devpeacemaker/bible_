import 'dart:convert';
import 'package:flutter/services.dart';

class BibleService {
  static List<dynamic>? _books;

  static Future<void> loadBible() async {
    if (_books != null) return;

    final jsonString = await rootBundle.loadString(
      'assets/bibles/kjv.json',
    );

    _books = json.decode(jsonString);
  }

  static Future<List<String>> getChapter(
    int bookIndex,
    int chapterIndex,
  ) async {
    await loadBible();

    final chapters = _books![bookIndex]["chapters"] as List;
    final verses = chapters[chapterIndex] as List;

    return verses.map((e) => e.toString()).toList();
  }

  /// Search the whole Bible
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

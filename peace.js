import 'dart:convert';
import 'package:flutter/services.dart';

class SwahiliBibleService {
  static List _books = [];

  static Future<void> loadBible() async {
    final jsonString =
        await rootBundle.loadString(
      'assets/bibles/swa.json',
    );

    final data = json.decode(jsonString);

    _books = data["books"];

    print("Swahili books loaded: ${_books.length}");
  }

  static List getBooks() {
    return _books;
  }
}

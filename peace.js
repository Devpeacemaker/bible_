import 'dart:convert';

import 'package:flutter/services.dart';

class SwahiliBibleService {
  static List _books = [];

  static Future<void> loadBible() async {
    final jsonString =
        await rootBundle.loadString(
      'assets/bibles/swa.json',
    );

    _books = json.decode(jsonString);
  }

  static List getBooks() {
    return _books;
  }
}

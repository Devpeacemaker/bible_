import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../data/bible_books.dart';
import '../providers/settings_provider.dart';
import '../services/api_service.dart';
import '../services/user_service.dart';

import 'chapter_screen.dart';
import 'create_account_screen.dart';
import 'subscription_screen.dart';

class BooksScreen extends StatefulWidget {
  const BooksScreen({super.key});

  @override
  State<BooksScreen> createState() => _BooksScreenState();
}

class _BooksScreenState extends State<BooksScreen> {
  String search = "";

  Future<bool> checkPremium() async {
    final settings = Provider.of<SettingsProvider>(
      context,
      listen: false,
    );

    // KJV is always free
    if (settings.selectedBible == "kjv") {
      return true;
    }

    final hasAccount = await UserService.hasAccount();

    if (!hasAccount) {
      if (!mounted) return false;

      final created = await Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => const CreateAccountScreen(),
        ),
      );

      if (created != true) {
        return false;
      }
    }

    final user = await UserService.getUser();

    if (user == null) {
      return false;
    }

    final premium = await ApiService.premium(
      user.phone,
    );

    if (!premium) {
      if (!mounted) return false;

      await Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => const SubscriptionScreen(),
        ),
      );

      return false;
    }

    return true;
  }

  int getChapterCount(String book) {
    const chapters = {
      "Genesis": 50,
      "Exodus": 40,
      "Leviticus": 27,
      "Numbers": 36,
      "Deuteronomy": 34,
      "Joshua": 24,
      "Judges": 21,
      "Ruth": 4,
      "1 Samuel": 31,
      "2 Samuel": 24,
      "1 Kings": 22,
      "2 Kings": 25,
      "1 Chronicles": 29,
      "2 Chronicles": 36,
      "Ezra": 10,
      "Nehemiah": 13,
      "Esther": 10,
      "Job": 42,
      "Psalms": 150,
      "Proverbs": 31,
      "Ecclesiastes": 12,
      "Song of Solomon": 8,
      "Isaiah": 66,
      "Jeremiah": 52,
      "Lamentations": 5,
      "Ezekiel": 48,
      "Daniel": 12,
      "Hosea": 14,
      "Joel": 3,
      "Amos": 9,
      "Obadiah": 1,
      "Jonah": 4,
      "Micah": 7,
      "Nahum": 3,
      "Habakkuk": 3,
      "Zephaniah": 3,
      "Haggai": 2,
      "Zechariah": 14,
      "Malachi": 4,
      "Matthew": 28,
      "Mark": 16,
      "Luke": 24,
      "John": 21,
      "Acts": 28,
      "Romans": 16,
      "1 Corinthians": 16,
      "2 Corinthians": 13,
      "Galatians": 6,
      "Ephesians": 6,
      "Philippians": 4,
      "Colossians": 4,
      "1 Thessalonians": 5,
      "2 Thessalonians": 3,
      "1 Timothy": 6,
      "2 Timothy": 4,
      "Titus": 3,
      "Philemon": 1,
      "Hebrews": 13,
      "James": 5,
      "1 Peter": 5,
      "2 Peter": 3,
      "1 John": 5,
      "2 John": 1,
      "3 John": 1,
      "Jude": 1,
      "Revelation": 22,
    };

    return chapters[book] ?? 1;
  }

  @override
  Widget build(BuildContext context) {
    final oldBooks = BibleBooks.oldTestament
        .where(
          (b) => b.toLowerCase().contains(
                search.toLowerCase(),
              ),
        )
        .toList();

    final newBooks = BibleBooks.newTestament
        .where(
          (b) => b.toLowerCase().contains(
                search.toLowerCase(),
              ),
        )
        .toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text("Bible Books"),
        backgroundColor: Colors.purple,
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              decoration: const InputDecoration(
                hintText: "Search Bible book...",
                prefixIcon: Icon(Icons.search),
              ),
              onChanged: (value) {
                setState(() {
                  search = value;
                });
              },
            ),
          ),
          Expanded(
            child: ListView(
              children: [
                const Padding(
                  padding: EdgeInsets.all(8),
                  child: Text(
                    "OLD TESTAMENT",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.purple,
                    ),
                  ),
                ),
                ...oldBooks.map((book) {
                  final index =
                      BibleBooks.oldTestament.indexOf(book);

                  return ListTile(
                    leading: const Icon(Icons.menu_book),
                    title: Text(book),
                    subtitle: Text(
                      "${getChapterCount(book)} Chapters",
                    ),
                    onTap: () async {
                      final allowed =
                          await checkPremium();

                      if (!allowed) return;

                      if (!mounted) return;

                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => ChapterScreen(
                            book: book,
                            totalChapters:
                                getChapterCount(book),
                            bookIndex: index,
                          ),
                        ),
                      );
                    },
                  );
                }),
                const Padding(
                  padding: EdgeInsets.all(8),
                  child: Text(
                    "NEW TESTAMENT",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.purple,
                    ),
                  ),
                ),
                ...newBooks.map((book) {
                  final index =
                      39 +
                          BibleBooks.newTestament
                              .indexOf(book);

                  return ListTile(
                    leading: const Icon(Icons.menu_book),
                    title: Text(book),
                    subtitle: Text(
                      "${getChapterCount(book)} Chapters",
                    ),
                    onTap: () async {
                      final allowed =
                          await checkPremium();

                      if (!allowed) return;

                      if (!mounted) return;

                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => ChapterScreen(
                            book: book,
                            totalChapters:
                                getChapterCount(book),
                            bookIndex: index,
                          ),
                        ),
                      );
                    },
                  );
                }),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

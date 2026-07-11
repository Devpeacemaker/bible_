import 'package:flutter/material.dart';
import 'bible_screen.dart';

class ChapterScreen extends StatelessWidget {
  final String book;
  final int totalChapters;
  final int bookIndex;

  const ChapterScreen({
    super.key,
    required this.book,
    required this.totalChapters,
    required this.bookIndex,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(book),
        backgroundColor: Colors.purple,
        foregroundColor: Colors.white,
      ),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: totalChapters,
        gridDelegate:
            const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 4,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 1,
        ),
        itemBuilder: (context, index) {
          final chapter = index + 1;

          return ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.purple,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
              ),
            ),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => BibleScreen(
                    book: book,
                    chapter: chapter,
                    bookIndex: bookIndex,
                    totalChapters: totalChapters,
                  ),
                ),
              );
            },
            child: Text(
              chapter.toString(),
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          );
        },
      ),
    );
  }
}

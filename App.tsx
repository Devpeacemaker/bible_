import 'package:flutter/material.dart';
import 'eng_bible_screen.dart';

class EngChaptersScreen extends StatelessWidget {
  final String book;
  final int chapters;

  const EngChaptersScreen({
    super.key,
    required this.book,
    required this.chapters,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(book),
      ),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: chapters,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 4,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 1.1,
        ),
        itemBuilder: (context, index) {
          final chapter = index + 1;

          return InkWell(
            borderRadius: BorderRadius.circular(12),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => EngBibleScreen(
                    book: book,
                    chapter: chapter,
                  ),
                ),
              );
            },
            child: Card(
              elevation: 2,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: Text(
                  "$chapter",
                  style: const TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

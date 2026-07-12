import 'package:flutter/material.dart';

class AudioBibleScreen extends StatelessWidget {
  const AudioBibleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final books = [
      "Genesis",
      "Exodus",
      "Leviticus",
      "Numbers",
      "Deuteronomy",
      "Joshua",
      "Judges",
      "Ruth",
      "Matthew",
      "Mark",
      "Luke",
      "John",
      "Acts",
      "Romans",
      "Revelation",
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text("Audio Bible"),
      ),
      body: ListView.builder(
        itemCount: books.length,
        itemBuilder: (context, index) {
          return Card(
            margin: const EdgeInsets.symmetric(
              horizontal: 12,
              vertical: 6,
            ),
            child: ListTile(
              leading: const CircleAvatar(
                child: Icon(Icons.headphones),
              ),
              title: Text(books[index]),
              subtitle: const Text(
                "Tap to listen",
              ),
              trailing: const Icon(Icons.play_circle_fill),
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(
                      "Audio for ${books[index]} will be available soon.",
                    ),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}

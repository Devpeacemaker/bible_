import 'package:flutter/material.dart';

class ConcordanceScreen extends StatefulWidget {
  const ConcordanceScreen({super.key});

  @override
  State<ConcordanceScreen> createState() =>
      _ConcordanceScreenState();
}

class _ConcordanceScreenState
    extends State<ConcordanceScreen> {
  final controller = TextEditingController();

  final List<Map<String, String>> verses = [
    {
      "word": "Faith",
      "verse": "Hebrews 11:1",
      "text":
          "Now faith is the substance of things hoped for..."
    },
    {
      "word": "Love",
      "verse": "John 3:16",
      "text":
          "For God so loved the world..."
    },
    {
      "word": "Prayer",
      "verse": "Matthew 7:7",
      "text":
          "Ask, and it shall be given unto you..."
    },
    {
      "word": "Hope",
      "verse": "Romans 15:13",
      "text":
          "Now the God of hope fill you..."
    },
    {
      "word": "Grace",
      "verse": "Ephesians 2:8",
      "text":
          "For by grace are ye saved through faith..."
    },
  ];

  String search = "";

  @override
  Widget build(BuildContext context) {
    final results = verses.where((v) {
      return v["word"]!
          .toLowerCase()
          .contains(search.toLowerCase());
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text("Concordance"),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(15),
            child: TextField(
              controller: controller,
              decoration: const InputDecoration(
                hintText: "Search a word...",
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
            child: ListView.builder(
              itemCount: results.length,
              itemBuilder: (_, i) {
                return Card(
                  margin: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  child: ListTile(
                    title: Text(results[i]["word"]!),
                    subtitle: Text(
                      "${results[i]["verse"]}\n\n${results[i]["text"]}",
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

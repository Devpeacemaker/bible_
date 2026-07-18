import 'package:flutter/material.dart';

class DictionaryScreen extends StatefulWidget {
  const DictionaryScreen({super.key});

  @override
  State<DictionaryScreen> createState() => _DictionaryScreenState();
}

class _DictionaryScreenState extends State<DictionaryScreen> {
  final searchController = TextEditingController();

  final List<Map<String, String>> words = [
    {
      "word": "Amen",
      "meaning": "So be it; truly."
    },
    {
      "word": "Grace",
      "meaning": "God's undeserved favor."
    },
    {
      "word": "Faith",
      "meaning": "Complete trust in God."
    },
    {
      "word": "Messiah",
      "meaning": "The Anointed One, Jesus Christ."
    },
    {
      "word": "Gospel",
      "meaning": "The good news of Jesus Christ."
    },
    {
      "word": "Disciple",
      "meaning": "A follower of Jesus."
    },
    {
      "word": "Covenant",
      "meaning": "A sacred agreement between God and man."
    },
    {
      "word": "Sabbath",
      "meaning": "The holy day of rest."
    },
  ];

  String search = "";

  @override
  Widget build(BuildContext context) {
    final filtered = words.where((e) {
      return e["word"]!
          .toLowerCase()
          .contains(search.toLowerCase());
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text("Bible Dictionary"),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(15),
            child: TextField(
              controller: searchController,
              decoration: const InputDecoration(
                hintText: "Search word...",
                prefixIcon: Icon(Icons.search),
              ),
              onChanged: (v) {
                setState(() {
                  search = v;
                });
              },
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: filtered.length,
              itemBuilder: (_, i) {
                return Card(
                  margin: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  child: ListTile(
                    title: Text(
                      filtered[i]["word"]!,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    subtitle: Text(filtered[i]["meaning"]!),
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

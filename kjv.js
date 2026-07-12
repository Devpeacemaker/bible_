import 'package:flutter/material.dart';

class CrossReferenceScreen extends StatefulWidget {
  const CrossReferenceScreen({super.key});

  @override
  State<CrossReferenceScreen> createState() =>
      _CrossReferenceScreenState();
}

class _CrossReferenceScreenState
    extends State<CrossReferenceScreen> {
  final controller = TextEditingController();

  final references = [
    {
      "verse": "John 3:16",
      "related": [
        "Romans 5:8",
        "1 John 4:9",
        "Ephesians 2:4-5"
      ]
    },
    {
      "verse": "Genesis 1:1",
      "related": [
        "John 1:1",
        "Hebrews 11:3",
        "Psalm 33:6"
      ]
    },
    {
      "verse": "Psalm 23:1",
      "related": [
        "John 10:11",
        "Ezekiel 34:11",
        "Isaiah 40:11"
      ]
    },
    {
      "verse": "Matthew 5:14",
      "related": [
        "John 8:12",
        "Philippians 2:15",
        "Isaiah 60:1"
      ]
    },
  ];

  String search = "";

  @override
  Widget build(BuildContext context) {
    final filtered = references.where((r) {
      return r["verse"]
          .toString()
          .toLowerCase()
          .contains(search.toLowerCase());
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text("Cross References"),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(15),
            child: TextField(
              controller: controller,
              decoration: const InputDecoration(
                hintText: "Search verse...",
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
              itemCount: filtered.length,
              itemBuilder: (_, index) {
                final refs =
                    filtered[index]["related"] as List<String>;

                return Card(
                  margin: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  child: ExpansionTile(
                    leading: const Icon(Icons.link),
                    title: Text(filtered[index]["verse"].toString()),
                    children: refs
                        .map(
                          (e) => ListTile(
                            leading: const Icon(Icons.menu_book),
                            title: Text(e),
                          ),
                        )
                        .toList(),
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

import 'package:flutter/material.dart';

class NotesScreen extends StatefulWidget {
  const NotesScreen({super.key});

  @override
  State<NotesScreen> createState() => _NotesScreenState();
}

class _NotesScreenState extends State<NotesScreen> {
  final List<Map<String, String>> notes = [];

  void addNote() async {
    final titleController = TextEditingController();
    final noteController = TextEditingController();

    final result = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("New Bible Note"),
        content: SingleChildScrollView(
          child: Column(
            children: [
              TextField(
                controller: titleController,
                decoration: const InputDecoration(
                  labelText: "Verse (e.g. John 3:16)",
                ),
              ),
              const SizedBox(height: 15),
              TextField(
                controller: noteController,
                maxLines: 6,
                decoration: const InputDecoration(
                  labelText: "Your Note",
                  border: OutlineInputBorder(),
                ),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            child: const Text("Cancel"),
            onPressed: () => Navigator.pop(context, false),
          ),
          ElevatedButton(
            child: const Text("Save"),
            onPressed: () {
              if (titleController.text.isNotEmpty &&
                  noteController.text.isNotEmpty) {
                notes.add({
                  "title": titleController.text,
                  "note": noteController.text,
                });
              }
              Navigator.pop(context, true);
            },
          ),
        ],
      ),
    );

    if (result == true) {
      setState(() {});
    }
  }

  void deleteNote(int index) {
    setState(() {
      notes.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Bible Notes"),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: addNote,
        child: const Icon(Icons.add),
      ),
      body: notes.isEmpty
          ? const Center(
              child: Text(
                "No notes yet.\nTap + to create your first Bible note.",
                textAlign: TextAlign.center,
              ),
            )
          : ListView.builder(
              itemCount: notes.length,
              itemBuilder: (context, index) {
                return Card(
                  margin: const EdgeInsets.all(10),
                  child: ListTile(
                    title: Text(
                      notes[index]["title"]!,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    subtitle: Text(notes[index]["note"]!),
                    trailing: IconButton(
                      icon: const Icon(
                        Icons.delete,
                        color: Colors.red,
                      ),
                      onPressed: () => deleteNote(index),
                    ),
                  ),
                );
              },
            ),
    );
  }
}

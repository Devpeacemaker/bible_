import 'package:flutter/material.dart';

import '../services/notes_service.dart';

class ViewNoteScreen extends StatefulWidget {
  final int index;

  const ViewNoteScreen({
    super.key,
    required this.index,
  });

  @override
  State<ViewNoteScreen> createState() =>
      _ViewNoteScreenState();
}

class _ViewNoteScreenState
    extends State<ViewNoteScreen> {

  late TextEditingController titleController;
  late TextEditingController noteController;

  @override
  void initState() {
    super.initState();

    final note =
        NotesService.getNote(widget.index);

    titleController = TextEditingController(
      text: note["title"],
    );

    noteController = TextEditingController(
      text: note["content"],
    );
  }

  Future<void> saveChanges() async {

    await NotesService.updateNote(
      index: widget.index,
      title: titleController.text.trim(),
      content: noteController.text.trim(),
    );

    if (!mounted) return;

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("Note updated successfully."),
      ),
    );
  }

  Future<void> deleteNote() async {

    final confirm = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Delete Note"),
        content: const Text(
          "Are you sure you want to delete this note?",
        ),
        actions: [
          TextButton(
            onPressed: () =>
                Navigator.pop(context, false),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            onPressed: () =>
                Navigator.pop(context, true),
            child: const Text("Delete"),
          ),
        ],
      ),
    );

    if (confirm != true) return;

    await NotesService.deleteNote(widget.index);

    if (!mounted) return;

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(

        title: const Text("View Note"),

        actions: [

          IconButton(
            icon: const Icon(Icons.save),
            onPressed: saveChanges,
          ),

          IconButton(
            icon: const Icon(
              Icons.delete,
              color: Colors.red,
            ),
            onPressed: deleteNote,
          ),

        ],

      ),

      body: Padding(

        padding: const EdgeInsets.all(16),

        child: Column(

          children: [

            TextField(

              controller: titleController,

              decoration: InputDecoration(
                labelText: "Title",
                border: OutlineInputBorder(
                  borderRadius:
                      BorderRadius.circular(12),
                ),
              ),

            ),

            const SizedBox(height: 20),

            Expanded(

              child: TextField(

                controller: noteController,

                expands: true,

                maxLines: null,

                textAlignVertical:
                    TextAlignVertical.top,

                decoration: InputDecoration(

                  hintText:
                      "Write your notes...",

                  border: OutlineInputBorder(
                    borderRadius:
                        BorderRadius.circular(12),
                  ),

                ),

              ),

            ),

          ],

        ),

      ),

    );
  }
}

import 'package:flutter/material.dart';

import '../services/notes_service.dart';
import 'view_note_screen.dart';

class SavedNotesScreen extends StatefulWidget {
  const SavedNotesScreen({super.key});

  @override
  State<SavedNotesScreen> createState() =>
      _SavedNotesScreenState();
}

class _SavedNotesScreenState
    extends State<SavedNotesScreen> {

  void refresh() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {

    final notes = NotesService.getNotes();

    return Scaffold(

      appBar: AppBar(
        title: const Text("Saved Notes"),
        centerTitle: true,
      ),

      body: notes.isEmpty

          ? const Center(
              child: Text(
                "No saved notes yet.",
                style: TextStyle(fontSize: 18),
              ),
            )

          : ListView.builder(

              padding: const EdgeInsets.all(15),

              itemCount: notes.length,

              itemBuilder: (context, index) {

                final note = notes[index];

                return Card(

                  margin:
                      const EdgeInsets.only(bottom: 15),

                  elevation: 3,

                  shape: RoundedRectangleBorder(
                    borderRadius:
                        BorderRadius.circular(15),
                  ),

                  child: ListTile(

                    contentPadding:
                        const EdgeInsets.all(15),

                    title: Text(
                      note["title"],
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),

                    subtitle: Padding(
                      padding:
                          const EdgeInsets.only(top: 8),
                      child: Text(
                        note["content"],
                        maxLines: 3,
                        overflow:
                            TextOverflow.ellipsis,
                      ),
                    ),

                    trailing:
                        const Icon(Icons.chevron_right),

                    onTap: () async {

                      await Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) =>
                              ViewNoteScreen(
                                index: index,
                              ),
                        ),
                      );

                      refresh();
                    },

                  ),

                );
              },

            ),

    );
  }
}

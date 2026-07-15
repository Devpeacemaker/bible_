import 'package:flutter/material.dart';

import '../services/notes_service.dart';
import 'saved_notes_screen.dart';

class NotesScreen extends StatefulWidget {
  const NotesScreen({super.key});

  @override
  State<NotesScreen> createState() =>
      _NotesScreenState();
}

class _NotesScreenState
    extends State<NotesScreen> {

  final titleController =
      TextEditingController();

  final noteController =
      TextEditingController();


  Future<void> saveNote() async {

    if (titleController.text.trim().isEmpty ||
        noteController.text.trim().isEmpty) {

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            "Please enter a title and your notes.",
          ),
        ),
      );

      return;
    }


    await NotesService.addNote(
      title: titleController.text.trim(),
      content: noteController.text.trim(),
    );


    titleController.clear();
    noteController.clear();


    if (!mounted) return;

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("Note saved successfully."),
      ),
    );
  }


  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: const Text("Bible Notes"),
        centerTitle: true,

        actions: [

          IconButton(

            icon: const Icon(Icons.folder),

            tooltip: "Saved Notes",

            onPressed: () async {

              await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) =>
                      const SavedNotesScreen(),
                ),
              );

              setState(() {});
            },

          ),

        ],

      ),


      body: SafeArea(

        child: Padding(

          padding:
              const EdgeInsets.all(16),

          child: Column(

            crossAxisAlignment:
                CrossAxisAlignment.start,

            children: [

              const Text(

                "Title",

                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),

              ),

              const SizedBox(height: 8),

              TextField(

                controller:
                    titleController,

                decoration:
                    InputDecoration(

                  hintText:
                      "Example: Sunday Service",

                  border:
                      OutlineInputBorder(

                    borderRadius:
                        BorderRadius.circular(12),

                  ),

                ),

              ),

              const SizedBox(height: 20),

              const Text(

                "Your Notes",

                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),

              ),

              const SizedBox(height: 8),

              Expanded(

                child: TextField(

                  controller:
                      noteController,

                  expands: true,

                  maxLines: null,

                  textAlignVertical:
                      TextAlignVertical.top,

                  decoration:
                      InputDecoration(

                    hintText:
                        "Write everything you learned here...",

                    alignLabelWithHint:
                        true,

                    border:
                        OutlineInputBorder(

                      borderRadius:
                          BorderRadius.circular(12),

                    ),

                  ),

                ),

              ),

              const SizedBox(height: 20),

              SizedBox(

                width: double.infinity,

                height: 55,

                child: ElevatedButton.icon(

                  icon: const Icon(Icons.save),

                  label: const Text(
                    "SAVE NOTE",
                  ),

                  onPressed: saveNote,

                ),

              ),

            ],

          ),

        ),

      ),

    );

  }

}

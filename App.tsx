import 'package:flutter/material.dart';

import '../services/notes_service.dart';

class NotesScreen extends StatefulWidget {
  const NotesScreen({super.key});

  @override
  State<NotesScreen> createState() => _NotesScreenState();
}

class _NotesScreenState extends State<NotesScreen> {

  List notes = [];


  @override
  void initState() {
    super.initState();
    loadNotes();
  }


  void loadNotes() {
    setState(() {
      notes = NotesService.getNotes();
    });
  }


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

            onPressed: () =>
                Navigator.pop(context, false),
          ),


          ElevatedButton(

            child: const Text("Save"),

            onPressed: () async {

              if (titleController.text.isNotEmpty &&
                  noteController.text.isNotEmpty) {

                await NotesService.addNote(
                  title: titleController.text,
                  content: noteController.text,
                );

              }

              Navigator.pop(context, true);
            },
          ),
        ],
      ),
    );


    if (result == true) {
      loadNotes();
    }
  }



  void deleteNote(int index) async {

    await NotesService.deleteNote(index);

    loadNotes();

  }



  @override
  Widget build(BuildContext context) {

    final isDark =
        Theme.of(context).brightness ==
            Brightness.dark;


    return Scaffold(

      appBar: AppBar(
        title: const Text(
          "Bible Notes",
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),

        centerTitle: true,
      ),


      floatingActionButton:
          FloatingActionButton.extended(

        onPressed: addNote,

        icon: const Icon(Icons.add),

        label: const Text("Add Note"),
      ),



      body: notes.isEmpty

          ? const Center(

              child: Text(
                "No notes yet.\nTap Add Note to create your first Bible note.",
                textAlign: TextAlign.center,
              ),

            )


          : ListView.builder(

              padding: const EdgeInsets.all(12),

              itemCount: notes.length,


              itemBuilder: (context, index) {

                final note = notes[index];


                return Card(

                  elevation: 3,

                  margin:
                      const EdgeInsets.only(bottom: 12),


                  child: ListTile(

                    contentPadding:
                        const EdgeInsets.all(15),


                    title: Text(

                      note["title"],

                      style: const TextStyle(

                        fontWeight:
                            FontWeight.bold,

                        fontSize: 17,
                      ),
                    ),



                    subtitle: Padding(

                      padding:
                          const EdgeInsets.only(top: 8),

                      child: Text(

                        note["content"],

                        style: TextStyle(

                          color: isDark
                              ? Colors.white70
                              : Colors.black87,
                        ),
                      ),
                    ),



                    trailing: IconButton(

                      icon: const Icon(
                        Icons.delete,
                        color: Colors.red,
                      ),

                      onPressed: () =>
                          deleteNote(index),
                    ),
                  ),
                );
              },
            ),
    );
  }
}

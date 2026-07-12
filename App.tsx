import 'package:flutter/material.dart';
import '../services/notes_service.dart';

class AddNoteScreen extends StatefulWidget {
  const AddNoteScreen({super.key});

  @override
  State<AddNoteScreen> createState() =>
      _AddNoteScreenState();
}


class _AddNoteScreenState
    extends State<AddNoteScreen> {

  final titleController =
      TextEditingController();

  final noteController =
      TextEditingController();


  Future<void> saveNote() async {

    if (titleController.text.isEmpty ||
        noteController.text.isEmpty) {
      return;
    }


    await NotesService.addNote(
      title: titleController.text,
      content: noteController.text,
    );


    if (mounted) {
      Navigator.pop(context, true);
    }

  }



  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: const Text(
          "New Bible Note",
        ),
      ),


      body: Padding(

        padding:
            const EdgeInsets.all(20),


        child: Column(

          children: [

            TextField(

              controller:
                  titleController,


              decoration:
                  const InputDecoration(

                labelText:
                    "Verse / Title",

                border:
                    OutlineInputBorder(),

              ),

            ),


            const SizedBox(
              height: 20,
            ),



            Expanded(

              child: TextField(

                controller:
                    noteController,


                expands:
                    true,


                maxLines:
                    null,


                textAlignVertical:
                    TextAlignVertical.top,


                decoration:
                    const InputDecoration(

                  hintText:
                      "Write your Bible thoughts here...",

                  border:
                      OutlineInputBorder(),

                ),

              ),

            ),


            const SizedBox(
              height: 20,
            ),



            SizedBox(

              width:
                  double.infinity,


              height:
                  55,


              child:
                  ElevatedButton.icon(

                icon:
                    const Icon(
                      Icons.save,
                    ),


                label:
                    const Text(
                      "Save Note",
                    ),


                onPressed:
                    saveNote,

              ),

            ),

          ],

        ),

      ),

    );

  }
}

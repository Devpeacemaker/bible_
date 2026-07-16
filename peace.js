import 'package:flutter/material.dart';

import '../services/notes_service.dart';
import 'note_details_screen.dart';


class NotesScreen extends StatefulWidget {

  const NotesScreen({super.key});


  @override
  State<NotesScreen> createState() =>
      _NotesScreenState();

}



class _NotesScreenState extends State<NotesScreen> {


  final titleController =
      TextEditingController();


  final noteController =
      TextEditingController();


  List notes = [];



  @override
  void initState() {

    super.initState();

    loadNotes();

  }



  void loadNotes() {

    setState(() {

      notes =
          NotesService.getNotes()
              .reversed
              .toList();

    });

  }




  Future<void> saveNote() async {


    if(titleController.text.trim().isEmpty ||
        noteController.text.trim().isEmpty){

      return;

    }


    await NotesService.addNote(

      title:
          titleController.text.trim(),

      content:
          noteController.text.trim(),

    );


    titleController.clear();

    noteController.clear();


    loadNotes();

  }




  Future<void> deleteNote(int index) async {

    await NotesService.deleteNote(index);

    loadNotes();

  }





  String formatDate(String? date){

    try{

      if(date == null){

        return "Unknown date";

      }


      final parsed =
          DateTime.parse(date);


      return "${parsed.day}/${parsed.month}/${parsed.year} "
          "${parsed.hour}:${parsed.minute.toString().padLeft(2,'0')}";


    }catch(e){

      return "Unknown date";

    }

  }





  void openNote(Map note){

    Navigator.push(

      context,

      MaterialPageRoute(

        builder: (_) => NoteDetailsScreen(

          title:
              note["title"] ?? "Untitled Note",

          content:
              note["content"] ?? "",

          date:
              formatDate(note["date"]),

        ),

      ),

    );

  }





  @override
  Widget build(BuildContext context){


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "My Notes History",
            ),

        centerTitle:true,

      ),



      body: Padding(

        padding:
            const EdgeInsets.all(16),


        child: Column(

          children:[


            Container(

              width:
                  double.infinity,


              padding:
                  const EdgeInsets.all(18),


              decoration:
                  BoxDecoration(

                gradient:
                    const LinearGradient(

                  colors:[

                    Colors.deepPurple,

                    Colors.purpleAccent,

                  ],

                ),


                borderRadius:
                    BorderRadius.circular(20),

              ),


              child:
                  const Row(

                children:[

                  Icon(

                    Icons.history_edu,

                    size:45,

                    color:Colors.white,

                  ),


                  SizedBox(width:15),


                  Expanded(

                    child:Text(

                      "Your personal journal of teachings,\nthoughts and revelations",

                      style:
                          TextStyle(

                        color:Colors.white,

                        fontSize:16,

                      ),

                    ),

                  ),

                ],

              ),

            ),



            const SizedBox(height:20),



            TextField(

              controller:titleController,

              decoration:
                  InputDecoration(

                labelText:"Note Title",

                prefixIcon:
                    const Icon(Icons.title),

                border:
                    OutlineInputBorder(

                  borderRadius:
                      BorderRadius.circular(15),

                ),

              ),

            ),



            const SizedBox(height:12),



            Expanded(

              child:TextField(

                controller:noteController,

                expands:true,

                maxLines:null,

                decoration:
                    InputDecoration(

                  hintText:
                      "Write what you have learned here...",

                  border:
                      OutlineInputBorder(

                    borderRadius:
                        BorderRadius.circular(15),

                  ),

                ),

              ),

            ),



            const SizedBox(height:15),



            SizedBox(

              width:double.infinity,

              height:55,


              child:
                  ElevatedButton.icon(

                icon:
                    const Icon(Icons.save),

                label:
                    const Text("Save Note"),

                onPressed:
                    saveNote,

              ),

            ),



            const SizedBox(height:15),



            Expanded(

              child:

              notes.isEmpty

              ?

              const Center(

                child:
                    Text(
                      "No saved notes yet",
                    ),

              )


              :

              ListView.builder(

                itemCount:
                    notes.length,


                itemBuilder:(context,index){


                  final note =
                      notes[index];


                  return Card(

                    elevation:4,

                    margin:
                        const EdgeInsets.only(
                          bottom:12,
                        ),


                    shape:
                        RoundedRectangleBorder(

                      borderRadius:
                          BorderRadius.circular(18),

                    ),


                    child:
                        ListTile(

                      contentPadding:
                          const EdgeInsets.all(15),


                      onTap:
                          ()=>openNote(note),


                      title:
                          Text(

                            note["title"] ??
                                "Untitled Note",

                            style:
                                const TextStyle(

                              fontWeight:
                                  FontWeight.bold,

                              fontSize:18,

                            ),

                          ),



                      subtitle:
                          Column(

                        crossAxisAlignment:
                            CrossAxisAlignment.start,

                        children:[

                          const SizedBox(height:8),


                          Text(

                            note["content"] ?? "",

                            maxLines:2,

                            overflow:
                                TextOverflow.ellipsis,

                          ),



                          const SizedBox(height:10),



                          Row(

                            children:[

                              const Icon(

                                Icons.calendar_month,

                                size:15,

                              ),


                              const SizedBox(width:5),


                              Text(

                                formatDate(
                                  note["date"],
                                ),

                              ),

                            ],

                          ),

                        ],

                      ),



                      trailing:
                          IconButton(

                        icon:
                            const Icon(

                              Icons.delete,

                              color:Colors.red,

                            ),


                        onPressed:
                            ()=>deleteNote(index),

                      ),

                    ),

                  );

                },

              ),

            ),

          ],

        ),

      ),

    );

  }

}

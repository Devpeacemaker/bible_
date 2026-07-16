import 'package:flutter/material.dart';

import '../services/audio_service.dart';
import 'audio_chapters_screen.dart';


class AudioBooksScreen extends StatefulWidget {

  final String bibleId;


  const AudioBooksScreen({

    super.key,

    required this.bibleId,

  });



  @override
  State<AudioBooksScreen> createState() =>
      _AudioBooksScreenState();

}



class _AudioBooksScreenState
    extends State<AudioBooksScreen> {


  bool loading = true;


  List<dynamic> books = [];



  @override
  void initState(){

    super.initState();

    loadBooks();

  }



  Future<void> loadBooks() async {

    try {


      final result =
          await AudioService.getBooks(

        bibleId:
            widget.bibleId,

      );



      setState(() {

        books = result;

        loading = false;

      });



    } catch(e){


      setState(() {

        loading = false;

      });



      if(mounted){

        ScaffoldMessenger.of(context)
            .showSnackBar(

          SnackBar(

            content:
                Text(
                  e.toString(),
                ),

          ),

        );

      }

    }

  }



  @override
  Widget build(BuildContext context){


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Audio Bible Books",
            ),

        centerTitle:true,

      ),



      body: loading


          ? const Center(

              child:
                  CircularProgressIndicator(),

            )



          : books.isEmpty


              ? const Center(

                  child:
                      Text(
                        "No books found",
                      ),

                )



              : ListView.builder(

                  padding:
                      const EdgeInsets.all(16),


                  itemCount:
                      books.length,



                  itemBuilder:(context,index){


                    final book =
                        books[index];



                    return Card(

                      elevation:4,


                      margin:
                          const EdgeInsets.only(
                            bottom:12,
                          ),



                      shape:
                          RoundedRectangleBorder(

                        borderRadius:
                            BorderRadius.circular(16),

                      ),



                      child:ListTile(


                        leading:
                            CircleAvatar(

                          child:
                              Text(
                                "${index + 1}",
                              ),

                        ),



                        title:
                            Text(

                              book["name"] ??
                                  "Unknown",

                              style:
                                  const TextStyle(

                                fontWeight:
                                    FontWeight.bold,

                              ),

                            ),



                        trailing:
                            const Icon(

                              Icons.play_circle,

                            ),



                        onTap:(){


                          Navigator.push(

                            context,

                            MaterialPageRoute(

                              builder:(_)=>

                                  AudioChaptersScreen(

                                bibleId:
                                    widget.bibleId,

                                bookId:
                                    book["id"],

                                book:
                                    book["name"],

                              ),

                            ),

                          );


                        },


                      ),

                    );


                  },

                ),

    );

  }

}

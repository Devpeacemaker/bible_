import 'package:flutter/material.dart';

import '../services/audio_service.dart';
import 'audio_player_screen.dart';


class AudioChaptersScreen extends StatefulWidget {

  final String bibleId;
  final String bookId;
  final String book;


  const AudioChaptersScreen({

    super.key,

    required this.bibleId,

    required this.bookId,

    required this.book,

  });


  @override
  State<AudioChaptersScreen> createState() =>
      _AudioChaptersScreenState();

}



class _AudioChaptersScreenState
    extends State<AudioChaptersScreen> {


  bool loading = true;


  List<dynamic> chapters = [];



  @override
  void initState(){

    super.initState();

    loadChapters();

  }



  Future<void> loadChapters() async {

    try {


      final result =
          await AudioService.getBookChapters(

        bibleId:
            widget.bibleId,

        bookId:
            widget.bookId,

      );



      setState((){

        chapters = result;

        loading = false;

      });



    }catch(e){


      setState((){

        loading = false;

      });


      ScaffoldMessenger.of(context)
          .showSnackBar(

        SnackBar(
          content:
              Text(e.toString()),
        ),

      );

    }

  }



  @override
  Widget build(BuildContext context){


    return Scaffold(

      appBar: AppBar(

        title:
            Text(widget.book),

        centerTitle:true,

      ),



      body: loading


          ? const Center(

              child:
                  CircularProgressIndicator(),

            )


          : GridView.builder(

              padding:
                  const EdgeInsets.all(16),


              itemCount:
                  chapters.length,


              gridDelegate:
                  const SliverGridDelegateWithFixedCrossAxisCount(

                crossAxisCount:4,

                crossAxisSpacing:12,

                mainAxisSpacing:12,

              ),



              itemBuilder:(context,index){


                final chapter =
                    chapters[index];



                return InkWell(

                  borderRadius:
                      BorderRadius.circular(15),


                  onTap:(){


                    Navigator.push(

                      context,

                      MaterialPageRoute(

                        builder:(_)=>
                            AudioPlayerScreen(

                          bibleId:
                              widget.bibleId,

                          book:
                              widget.book,

                          chapter:
                              index + 1,

                          chapterId:
                              chapter["id"],

                        ),

                      ),

                    );


                  },



                  child:Card(

                    elevation:3,

                    shape:
                        RoundedRectangleBorder(

                      borderRadius:
                          BorderRadius.circular(15),

                    ),


                    child:Center(

                      child:Text(

                        "${index + 1}",

                        style:
                            const TextStyle(

                          fontSize:22,

                          fontWeight:
                              FontWeight.bold,

                        ),

                      ),

                    ),

                  ),

                );


              },

            ),

    );

  }

}

import 'package:flutter/material.dart';

import 'audio_player_screen.dart';


class AudioChaptersScreen extends StatelessWidget {

  final String bibleId;
  final String book;


  const AudioChaptersScreen({
    super.key,
    required this.bibleId,
    required this.book,
  });



  int getChapterCount() {

    switch (book) {

      case "Genesis":
        return 50;

      case "Exodus":
        return 40;

      case "Leviticus":
        return 27;

      case "Numbers":
        return 36;

      case "Deuteronomy":
        return 34;

      case "Psalms":
        return 150;

      case "Proverbs":
        return 31;

      case "Isaiah":
        return 66;

      case "Matthew":
        return 28;

      case "Mark":
        return 16;

      case "Luke":
        return 24;

      case "John":
        return 21;

      case "Acts":
        return 28;

      case "Romans":
        return 16;

      case "Revelation":
        return 22;

      default:
        return 10;
    }
  }



  @override
  Widget build(BuildContext context) {


    final chapters = getChapterCount();


    return Scaffold(

      appBar: AppBar(

        title:
            Text(book),

        centerTitle: true,

      ),



      body: GridView.builder(

        padding:
            const EdgeInsets.all(16),


        itemCount:
            chapters,


        gridDelegate:
            const SliverGridDelegateWithFixedCrossAxisCount(

          crossAxisCount: 4,

          crossAxisSpacing: 12,

          mainAxisSpacing: 12,

        ),



        itemBuilder:
            (context, index) {


          final chapter =
              index + 1;



          return InkWell(

            borderRadius:
                BorderRadius.circular(15),


            onTap: () {


              Navigator.push(

                context,

                MaterialPageRoute(

                  builder: (_) =>
                      AudioPlayerScreen(

                        bibleId:
                            bibleId,

                        book:
                            book,

                        chapter:
                            chapter,

                      ),

                ),

              );


            },



            child: Card(

              elevation: 3,


              shape:
                  RoundedRectangleBorder(

                borderRadius:
                    BorderRadius.circular(15),

              ),



              child:
                  Center(

                child:
                    Text(

                      "$chapter",

                      style:
                          const TextStyle(

                        fontSize: 22,

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

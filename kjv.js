import 'package:flutter/material.dart';

import 'audio_chapters_screen.dart';


class AudioBooksScreen extends StatelessWidget {

  final String bibleId;


  const AudioBooksScreen({
    super.key,
    required this.bibleId,
  });


  final List<String> books = const [

    "Genesis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "Judges",
    "Ruth",
    "1 Samuel",
    "2 Samuel",
    "1 Kings",
    "2 Kings",
    "Psalms",
    "Proverbs",
    "Isaiah",
    "Jeremiah",
    "Ezekiel",
    "Daniel",
    "Matthew",
    "Mark",
    "Luke",
    "John",
    "Acts",
    "Romans",
    "1 Corinthians",
    "2 Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "Hebrews",
    "James",
    "1 Peter",
    "2 Peter",
    "1 John",
    "Revelation",

  ];


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Audio Bible Books",
            ),

        centerTitle: true,

      ),


      body: ListView.builder(

        padding:
            const EdgeInsets.all(16),


        itemCount:
            books.length,


        itemBuilder:
            (context, index) {


          return Card(

            elevation: 3,


            margin:
                const EdgeInsets.only(
                  bottom: 10,
                ),


            shape:
                RoundedRectangleBorder(

              borderRadius:
                  BorderRadius.circular(16),

            ),



            child: ListTile(


              leading:
                  CircleAvatar(

                child:
                    Text(
                      "${index + 1}",
                    ),

              ),



              title:
                  Text(
                    books[index],

                    style:
                        const TextStyle(

                      fontWeight:
                          FontWeight.bold,

                    ),

                  ),



              trailing:
                  const Icon(
                    Icons.play_circle_outline,
                  ),



              onTap: () {


                Navigator.push(

                  context,

                  MaterialPageRoute(

                    builder: (_) =>
                        AudioChaptersScreen(

                          bibleId:
                              bibleId,

                          book:
                              books[index],

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

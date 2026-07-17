import 'package:flutter/material.dart';

import 'swahili_bible_screen.dart';

class SwahiliChaptersScreen extends StatelessWidget {

  final Map book;

  const SwahiliChaptersScreen({

    super.key,

    required this.book,

  });

  @override
  Widget build(BuildContext context) {

    final chapters = book["chapters"] as List;

    return Scaffold(

      body: Container(

        decoration: const BoxDecoration(

          gradient: LinearGradient(

            begin: Alignment.topCenter,

            end: Alignment.bottomCenter,

            colors: [

              Color(0xff512DA8),

              Color(0xff7E57C2),

              Color(0xffF3E5F5),

            ],

          ),

        ),

        child: SafeArea(

          child: Column(

            children: [

              Padding(

                padding: const EdgeInsets.all(20),

                child: Column(

                  children: [

                    const Icon(

                      Icons.menu_book,

                      color: Colors.white,

                      size: 60,

                    ),

                    const SizedBox(height: 10),

                    Text(

                      book["name"],

                      style: const TextStyle(

                        color: Colors.white,

                        fontSize: 28,

                        fontWeight: FontWeight.bold,

                      ),

                    ),

                    Text(

                      "${chapters.length} Sura",

                      style: const TextStyle(

                        color: Colors.white70,

                        fontSize: 16,

                      ),

                    ),

                  ],

                ),

              ),

              Expanded(

                child: Container(

                  decoration: const BoxDecoration(

                    color: Colors.white,

                    borderRadius: BorderRadius.only(

                      topLeft: Radius.circular(35),

                      topRight: Radius.circular(35),

                    ),

                  ),

                  child: GridView.builder(

                    padding: const EdgeInsets.all(20),

                    gridDelegate:

                        const SliverGridDelegateWithFixedCrossAxisCount(

                      crossAxisCount: 4,

                      crossAxisSpacing: 15,

                      mainAxisSpacing: 15,

                      childAspectRatio: 1,

                    ),

                    itemCount: chapters.length,

                    itemBuilder: (context, index) {

                      final chapter = chapters[index];

                      return InkWell(

                        borderRadius: BorderRadius.circular(20),

                        onTap: () {

                          Navigator.push(

                            context,

                            MaterialPageRoute(

                              builder: (_) => SwahiliBibleScreen(

                                bookName: book["name"],

                                chapter: chapter,

                              ),

                            ),

                          );

                        },

                        child: Container(

                          decoration: BoxDecoration(

                            gradient: LinearGradient(

                              colors: [

                                Colors.deepPurple,

                                Colors.purpleAccent,

                              ],

                            ),

                            borderRadius:

                                BorderRadius.circular(20),

                            boxShadow: const [

                              BoxShadow(

                                blurRadius: 8,

                                color: Colors.black26,

                                offset: Offset(2,4),

                              ),

                            ],

                          ),

                          child: Center(

                            child: Text(

                              "${chapter["chapter"]}",

                              style: const TextStyle(

                                color: Colors.white,

                                fontSize: 22,

                                fontWeight: FontWeight.bold,

                              ),

                            ),

                          ),

                        ),

                      );

                    },

                  ),

                ),

              ),

            ],

          ),

        ),

      ),

    );

  }

}

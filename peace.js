import 'package:flutter/material.dart';

import '../services/swahili_bible_service.dart';
import 'swahili_chapters_screen.dart';

class SwahiliBooksScreen extends StatefulWidget {
  const SwahiliBooksScreen({super.key});

  @override
  State<SwahiliBooksScreen> createState() =>
      _SwahiliBooksScreenState();
}

class _SwahiliBooksScreenState
    extends State<SwahiliBooksScreen> {

  final controller = TextEditingController();

  String search = "";

  @override
  Widget build(BuildContext context) {

    final books =
        SwahiliBibleService.getBooks();

    final results =
        books.where((book) {

      return book["name"]
          .toString()
          .toLowerCase()
          .contains(
            search.toLowerCase(),
          );

    }).toList();

    return Scaffold(

      body: Container(

        decoration: const BoxDecoration(

          gradient: LinearGradient(

            begin: Alignment.topCenter,

            end: Alignment.bottomCenter,

            colors: [

              Color(0xff4A148C),

              Color(0xff6A1B9A),

              Color(0xffF3E5F5),

            ],

          ),

        ),

        child: SafeArea(

          child: Column(

            children: [

              const SizedBox(height: 10),

              const Icon(

                Icons.menu_book_rounded,

                color: Colors.white,

                size: 70,

              ),

              const SizedBox(height: 10),

              const Text(

                "Biblia Takatifu",

                style: TextStyle(

                  color: Colors.white,

                  fontSize: 28,

                  fontWeight: FontWeight.bold,

                ),

              ),

              const Text(

                "Vitabu vya Biblia",

                style: TextStyle(

                  color: Colors.white70,

                  fontSize: 16,

                ),

              ),

              Padding(

                padding:
                    const EdgeInsets.all(20),

                child: TextField(

                  controller: controller,

                  decoration: InputDecoration(

                    filled: true,

                    fillColor: Colors.white,

                    hintText:
                        "Tafuta kitabu...",

                    prefixIcon:
                        const Icon(Icons.search),

                    border:
                        OutlineInputBorder(

                      borderRadius:
                          BorderRadius.circular(30),

                      borderSide:
                          BorderSide.none,

                    ),

                  ),

                  onChanged: (value) {

                    setState(() {

                      search = value;

                    });

                  },

                ),

              ),

              Expanded(

                child: ListView.builder(

                  padding:
                      const EdgeInsets.only(
                          left: 15,
                          right: 15),

                  itemCount:
                      results.length,

                  itemBuilder:
                      (context, index) {

                    final book =
                        results[index];

                    return Card(

                      elevation: 8,

                      margin:
                          const EdgeInsets.only(
                              bottom: 15),

                      shape:
                          RoundedRectangleBorder(

                        borderRadius:
                            BorderRadius.circular(
                                20),

                      ),

                      child: ListTile(

                        leading:
                            CircleAvatar(

                          radius: 28,

                          backgroundColor:
                              Colors.deepPurple,

                          child: Text(

                            "${index + 1}",

                            style:
                                const TextStyle(

                              color:
                                  Colors.white,

                              fontWeight:
                                  FontWeight.bold,

                            ),

                          ),

                        ),

                        title: Text(

                          book["name"],

                          style:
                              const TextStyle(

                            fontWeight:
                                FontWeight.bold,

                            fontSize: 18,

                          ),

                        ),

                        subtitle: Text(

                          "${book["chapters"].length} Sura",

                        ),

                        trailing:
                            const Icon(

                          Icons.arrow_forward_ios,

                          color:
                              Colors.deepPurple,

                        ),

                        onTap: () {

                          Navigator.push(

                            context,

                            MaterialPageRoute(

                              builder: (_) =>
                                  SwahiliChaptersScreen(

                                book: book,

                              ),

                            ),

                          );

                        },

                      ),

                    );

                  },

                ),

              ),

            ],

          ),

        ),

      ),

    );

  }

}

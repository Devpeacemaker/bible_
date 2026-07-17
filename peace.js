import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';

import '../providers/settings_provider.dart';

class SwahiliBibleScreen extends StatefulWidget {
  final String bookName;
  final Map chapter;

  const SwahiliBibleScreen({
    super.key,
    required this.bookName,
    required this.chapter,
  });

  @override
  State<SwahiliBibleScreen> createState() =>
      _SwahiliBibleScreenState();
}

class _SwahiliBibleScreenState
    extends State<SwahiliBibleScreen> {

  final Set<int> highlightedVerses = {};

  final Set<int> favoriteVerses = {};

  bool readingMode = false;

  List get verses =>
      widget.chapter["verses"] ?? [];

  void toggleHighlight(int verse) {
    setState(() {
      if (highlightedVerses.contains(verse)) {
        highlightedVerses.remove(verse);
      } else {
        highlightedVerses.add(verse);
      }
    });
  }

  void toggleFavorite(int verse) {
    setState(() {
      if (favoriteVerses.contains(verse)) {
        favoriteVerses.remove(verse);
      } else {
        favoriteVerses.add(verse);
      }
    });
  }

  void copyVerse(Map verse) {
    Clipboard.setData(
      ClipboardData(
        text:
            "${widget.bookName} ${widget.chapter["chapter"]}:${verse["verse"]}\n${verse["text"]}",
      ),
    );

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("Verse copied"),
      ),
    );
  }

  void shareVerse(Map verse) {
    Share.share(
      "${widget.bookName} ${widget.chapter["chapter"]}:${verse["verse"]}\n\n${verse["text"]}",
    );
  }

  @override
  Widget build(BuildContext context) {

    final settings =
        Provider.of<SettingsProvider>(context);

    return Scaffold(

      appBar: readingMode
          ? null
          : AppBar(

              elevation: 0,

              title: Text(
                "${widget.bookName} ${widget.chapter["chapter"]}",
              ),

              centerTitle: true,

              actions: [

                IconButton(

                  icon: Icon(

                    readingMode
                        ? Icons.visibility
                        : Icons.chrome_reader_mode,

                  ),

                  onPressed: () {

                    setState(() {

                      readingMode = !readingMode;

                    });

                  },

                ),

              ],

            ),

      body: Container(

        decoration: const BoxDecoration(

          gradient: LinearGradient(

            begin: Alignment.topCenter,

            end: Alignment.bottomCenter,

            colors: [

              Color(0xff4A148C),

              Color(0xff7B1FA2),

              Color(0xffF3E5F5),

            ],

          ),

        ),

        child: Column(

          children: [

            if (!readingMode)

              Container(

                width: double.infinity,

                padding: const EdgeInsets.all(20),

                child: Column(

                  children: [

                    const Icon(
                      Icons.menu_book,
                      size: 60,
                      color: Colors.white,
                    ),

                    const SizedBox(height: 10),

                    Text(
                      widget.bookName,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    Text(
                      "Sura ${widget.chapter["chapter"]}",
                      style: const TextStyle(
                        color: Colors.white70,
                        fontSize: 18,
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

                    topLeft: Radius.circular(30),

                    topRight: Radius.circular(30),

                  ),

                ),

                child: ListView.builder(

                  padding: const EdgeInsets.all(20),

                  itemCount: verses.length,

                  itemBuilder: (context, index) {

                    final verse = verses[index];

                    final number = verse["verse"];
                    return Card(

                      elevation: 4,

                      margin: const EdgeInsets.only(bottom: 14),

                      color: highlightedVerses.contains(number)

                          ? Colors.yellow.shade100

                          : Colors.white,

                      shape: RoundedRectangleBorder(

                        borderRadius: BorderRadius.circular(18),

                      ),

                      child: Padding(

                        padding: const EdgeInsets.all(15),

                        child: Row(

                          crossAxisAlignment:

                              CrossAxisAlignment.start,

                          children: [

                            CircleAvatar(

                              radius: 16,

                              backgroundColor:

                                  Colors.deepPurple,

                              child: Text(

                                "$number",

                                style: const TextStyle(

                                  color: Colors.white,

                                  fontSize: 12,

                                  fontWeight: FontWeight.bold,

                                ),

                              ),

                            ),

                            const SizedBox(width: 14),

                            Expanded(

                              child: Text(

                                verse["text"],

                                style: TextStyle(

                                  fontSize:

                                      settings.fontSize,

                                  height: 1.8,

                                  color: Colors.black87,

                                ),

                              ),

                            ),

                            PopupMenuButton<String>(

                              icon: const Icon(

                                Icons.more_vert,

                              ),

                              onSelected: (value) {

                                switch (value) {

                                  case "copy":

                                    copyVerse(verse);

                                    break;

                                  case "share":

                                    shareVerse(verse);

                                    break;

                                  case "highlight":

                                    toggleHighlight(number);

                                    break;

                                  case "favorite":

                                    toggleFavorite(number);

                                    break;

                                }

                              },

                              itemBuilder: (context) => [

                                const PopupMenuItem(

                                  value: "copy",

                                  child: Row(

                                    children: [

                                      Icon(Icons.copy),

                                      SizedBox(width: 10),

                                      Text("Copy"),

                                    ],

                                  ),

                                ),

                                const PopupMenuItem(

                                  value: "share",

                                  child: Row(

                                    children: [

                                      Icon(Icons.share),

                                      SizedBox(width: 10),

                                      Text("Share"),

                                    ],

                                  ),

                                ),

                                const PopupMenuItem(

                                  value: "highlight",

                                  child: Row(

                                    children: [

                                      Icon(Icons.highlight),

                                      SizedBox(width: 10),

                                      Text("Highlight"),

                                    ],

                                  ),

                                ),

                                PopupMenuItem(

                                  value: "favorite",

                                  child: Row(

                                    children: [

                                      Icon(

                                        favoriteVerses.contains(number)

                                            ? Icons.favorite

                                            : Icons.favorite_border,

                                        color: Colors.red,

                                      ),

                                      const SizedBox(width: 10),

                                      Text(

                                        favoriteVerses.contains(number)

                                            ? "Remove Favorite"

                                            : "Favorite",

                                      ),

                                    ],

                                  ),

                                ),

                              ],

                            ),

                          ],

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

    );

  }

}

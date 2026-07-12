import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ConcordanceScreen extends StatefulWidget {
  const ConcordanceScreen({super.key});

  @override
  State<ConcordanceScreen> createState() =>
      _ConcordanceScreenState();
}

class _ConcordanceScreenState
    extends State<ConcordanceScreen> {

  final controller = TextEditingController();

  List<Map<String, String>> results = [];

  bool loading = false;


  Future<void> searchBible(String word) async {

    if (word.trim().isEmpty) {
      setState(() {
        results = [];
      });
      return;
    }


    setState(() {
      loading = true;
    });


    try {

      final response = await http.get(
        Uri.parse(
          "https://bible-api.com/${Uri.encodeComponent(word)}",
        ),
      );


      final data = jsonDecode(response.body);


      setState(() {

        results = [
          {
            "verse":
                data["reference"] ?? word,

            "text":
                data["text"] ?? "No results found.",
          }
        ];

        loading = false;

      });


    } catch (e) {

      setState(() {
        loading = false;
      });


      ScaffoldMessenger.of(context)
          .showSnackBar(
        SnackBar(
          content: Text(
            "Error: $e",
          ),
        ),
      );
    }
  }



  @override
  Widget build(BuildContext context) {

    final isDark =
        Theme.of(context).brightness ==
            Brightness.dark;


    return Scaffold(

      appBar: AppBar(
        title: const Text(
          "Concordance",
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),

        centerTitle: true,
      ),


      body: Column(

        children: [


          Padding(

            padding:
                const EdgeInsets.all(15),


            child: TextField(

              controller: controller,


              decoration:
                  InputDecoration(

                hintText:
                    "Search a Bible word or verse...",


                prefixIcon:
                    const Icon(Icons.search),


                suffixIcon:
                    IconButton(

                  icon:
                      const Icon(Icons.send),


                  onPressed: () {
                    searchBible(
                      controller.text,
                    );
                  },

                ),


                border:
                    OutlineInputBorder(

                  borderRadius:
                      BorderRadius.circular(15),

                ),

              ),


              onSubmitted: (value) {
                searchBible(value);
              },

            ),

          ),



          if (loading)

            const Padding(

              padding:
                  EdgeInsets.all(20),

              child:
                  CircularProgressIndicator(),

            ),



          Expanded(

            child:
                results.isEmpty

                    ? const Center(

                        child: Text(
                          "Search for a Bible word to see verses.",
                          textAlign:
                              TextAlign.center,
                        ),

                      )


                    : ListView.builder(

                        padding:
                            const EdgeInsets.all(12),


                        itemCount:
                            results.length,


                        itemBuilder:
                            (context, index) {


                          final verse =
                              results[index];


                          return Card(

                            elevation: 3,


                            margin:
                                const EdgeInsets.only(
                                  bottom: 12,
                                ),


                            shape:
                                RoundedRectangleBorder(

                              borderRadius:
                                  BorderRadius.circular(16),

                            ),


                            color:
                                isDark
                                    ? const Color(
                                        0xff1e1e1e,
                                      )
                                    : Colors.white,


                            child:
                                Padding(

                              padding:
                                  const EdgeInsets.all(16),


                              child:
                                  Column(

                                crossAxisAlignment:
                                    CrossAxisAlignment.start,


                                children: [

                                  Text(

                                    verse["verse"]!,

                                    style:
                                        const TextStyle(

                                      fontWeight:
                                          FontWeight.bold,

                                      fontSize:
                                          17,

                                      color:
                                          Colors.deepPurple,

                                    ),

                                  ),


                                  const SizedBox(
                                    height: 10,
                                  ),


                                  Text(

                                    verse["text"]!,

                                    style:
                                        TextStyle(

                                      fontSize:
                                          16,

                                      height:
                                          1.6,

                                      color:
                                          isDark
                                              ? Colors.white
                                              : Colors.black87,

                                    ),

                                  ),

                                ],

                              ),

                            ),

                          );

                        },

                      ),

          ),

        ],

      ),

    );
  }
}

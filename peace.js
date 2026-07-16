import 'package:flutter/material.dart';


class NoteDetailsScreen extends StatelessWidget {

  final String title;
  final String content;
  final String date;


  const NoteDetailsScreen({

    super.key,

    required this.title,

    required this.content,

    required this.date,

  });



  @override
  Widget build(BuildContext context) {


    return Scaffold(

      extendBodyBehindAppBar: true,


      appBar: AppBar(

        title:
            const Text(
              "Note Details",
            ),

        backgroundColor:
            Colors.transparent,

        elevation:0,

      ),



      body:
          Container(

        decoration:
            const BoxDecoration(

          gradient:
              LinearGradient(

            begin:
                Alignment.topCenter,

            end:
                Alignment.bottomCenter,

            colors:[

              Color(0xff4A148C),

              Color(0xff120018),

            ],

          ),

        ),



        child:
            SafeArea(

          child:
              Padding(

            padding:
                const EdgeInsets.all(20),


            child:
                Column(

              crossAxisAlignment:
                  CrossAxisAlignment.start,


              children:[



                Container(

                  width:
                      double.infinity,


                  padding:
                      const EdgeInsets.all(20),


                  decoration:
                      BoxDecoration(

                    color:
                        Colors.white.withOpacity(0.12),


                    borderRadius:
                        BorderRadius.circular(25),


                    border:
                        Border.all(

                      color:
                          Colors.white24,

                    ),

                  ),



                  child:
                      Column(

                    crossAxisAlignment:
                        CrossAxisAlignment.start,


                    children:[


                      const Icon(

                        Icons.auto_stories,

                        color:
                            Colors.white,

                        size:45,

                      ),



                      const SizedBox(height:15),



                      Text(

                        title,

                        style:
                            const TextStyle(

                          color:
                              Colors.white,

                          fontSize:26,

                          fontWeight:
                              FontWeight.bold,

                        ),

                      ),



                      const SizedBox(height:10),



                      Row(

                        children:[


                          const Icon(

                            Icons.calendar_month,

                            size:16,

                            color:
                                Colors.white70,

                          ),



                          const SizedBox(width:6),



                          Text(

                            date,

                            style:
                                const TextStyle(

                              color:
                                  Colors.white70,

                            ),

                          ),


                        ],

                      ),

                    ],

                  ),

                ),




                const SizedBox(height:25),




                Expanded(

                  child:
                      Container(

                    width:
                        double.infinity,


                    padding:
                        const EdgeInsets.all(22),


                    decoration:
                        BoxDecoration(

                      color:
                          Colors.white,


                      borderRadius:
                          BorderRadius.circular(25),


                      boxShadow:[

                        BoxShadow(

                          blurRadius:15,

                          spreadRadius:2,

                          color:
                              Colors.black26,

                        )

                      ],

                    ),



                    child:
                        SingleChildScrollView(

                      child:
                          Text(

                        content,

                        style:
                            const TextStyle(

                          fontSize:18,

                          height:1.7,

                          color:
                              Colors.black87,

                        ),

                      ),

                    ),

                  ),

                ),



              ],

            ),

          ),

        ),

      ),

    );

  }

}

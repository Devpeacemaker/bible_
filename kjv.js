import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';

import '../services/audio_service.dart';


class AudioPlayerScreen extends StatefulWidget {

  final String bibleId;
  final String book;
  final String chapterId;
  final int chapter;


  const AudioPlayerScreen({

    super.key,

    required this bibleId,

    required this.book,

    required this.chapterId,

    required this.chapter,

  });


  @override
  State<AudioPlayerScreen> createState() =>
      _AudioPlayerScreenState();

}



class _AudioPlayerScreenState
    extends State<AudioPlayerScreen> {


  final AudioPlayer player =
      AudioPlayer();


  bool loading = true;


  Duration position =
      Duration.zero;


  Duration duration =
      Duration.zero;



  @override
  void initState() {

    super.initState();

    loadAudio();


    player.positionStream.listen((value){

      if(mounted){

        setState(() {

          position = value;

        });

      }

    });



    player.durationStream.listen((value){

      if(value != null && mounted){

        setState(() {

          duration = value;

        });

      }

    });

  }



  Future<void> loadAudio() async {

    try {


      final audioUrl =
          await AudioService.getChapterAudioUrl(

        bibleId:
            widget.bibleId,

        chapterId:
            widget.chapterId,

      );



      await player.setUrl(audioUrl);



      if(mounted){

        setState(() {

          loading = false;

        });

      }



    } catch(e){


      if(mounted){

        setState(() {

          loading = false;

        });


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



  String formatTime(Duration time){

    final minutes =
        time.inMinutes
            .toString()
            .padLeft(2,'0');


    final seconds =
        (time.inSeconds % 60)
            .toString()
            .padLeft(2,'0');


    return "$minutes:$seconds";

  }



  @override
  void dispose(){

    player.dispose();

    super.dispose();

  }



  @override
  Widget build(BuildContext context){


    return Scaffold(

      appBar: AppBar(

        title:
            Text(
              "${widget.book} ${widget.chapter}",
            ),

        centerTitle:true,

      ),



      body: loading

          ? const Center(

              child:
                  CircularProgressIndicator(),

            )

          : Padding(

              padding:
                  const EdgeInsets.all(25),


              child: Column(

                mainAxisAlignment:
                    MainAxisAlignment.center,


                children:[


                  const Icon(

                    Icons.headphones,

                    size:100,

                  ),



                  const SizedBox(height:25),



                  Text(

                    widget.book,

                    style:
                        const TextStyle(

                      fontSize:28,

                      fontWeight:
                          FontWeight.bold,

                    ),

                  ),



                  Text(

                    "Chapter ${widget.chapter}",

                    style:
                        const TextStyle(
                          fontSize:20,
                        ),

                  ),



                  const SizedBox(height:40),



                  Slider(

                    value:
                        position.inSeconds
                            .toDouble()
                            .clamp(
                              0,
                              duration.inSeconds
                                  .toDouble(),
                            ),


                    max:
                        duration.inSeconds
                            .toDouble()
                            .clamp(
                              1,
                              double.infinity,
                            ),


                    onChanged:(value){

                      player.seek(

                        Duration(
                          seconds:
                              value.toInt(),
                        ),

                      );

                    },

                  ),



                  Row(

                    mainAxisAlignment:
                        MainAxisAlignment.spaceBetween,


                    children:[

                      Text(
                        formatTime(position),
                      ),


                      Text(
                        formatTime(duration),
                      ),

                    ],

                  ),



                  const SizedBox(height:30),



                  StreamBuilder<PlayerState>(

                    stream:
                        player.playerStateStream,


                    builder:(context,snapshot){


                      final playing =
                          snapshot.data
                              ?.playing ??
                          false;



                      return IconButton(

                        iconSize:80,


                        icon: Icon(

                          playing

                          ? Icons.pause_circle

                          : Icons.play_circle,

                        ),



                        onPressed:() async {


                          if(playing){

                            await player.pause();

                          }

                          else{

                            await player.play();

                          }


                        },

                      );


                    },

                  ),



                ],

              ),

            ),

    );

  }

}

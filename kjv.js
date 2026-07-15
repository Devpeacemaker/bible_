import 'package:flutter/material.dart';

import '../services/audio_service.dart';


class AudioBibleScreen extends StatefulWidget {
  const AudioBibleScreen({super.key});

  @override
  State<AudioBibleScreen> createState() =>
      _AudioBibleScreenState();
}


class _AudioBibleScreenState
    extends State<AudioBibleScreen> {

  bool loading = true;

  List<dynamic> audioBibles = [];


  @override
  void initState() {
    super.initState();

    loadAudioBibles();
  }



  Future<void> loadAudioBibles() async {

    try {

      final result =
          await AudioService.getAudioBibles();


      setState(() {

        audioBibles = result;

        loading = false;

      });


    } catch (e) {

      setState(() {

        loading = false;

      });


      if (mounted) {

        ScaffoldMessenger.of(context)
            .showSnackBar(

          SnackBar(
            content:
                Text(e.toString()),
          ),

        );

      }

    }

  }



  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title:
            const Text("Audio Bible"),
        centerTitle: true,
      ),


      body: loading

          ? const Center(
              child:
                  CircularProgressIndicator(),
            )


          : audioBibles.isEmpty

              ? const Center(
                  child:
                      Text(
                        "No audio Bibles found.",
                      ),
                )


              : ListView.builder(

                  padding:
                      const EdgeInsets.all(16),


                  itemCount:
                      audioBibles.length,


                  itemBuilder:
                      (context, index) {


                    final bible =
                        audioBibles[index];


                    return Card(

                      elevation: 3,


                      margin:
                          const EdgeInsets.only(
                            bottom: 12,
                          ),


                      child: ListTile(

                        leading:
                            const CircleAvatar(
                              child:
                                  Icon(
                                    Icons.headphones,
                                  ),
                            ),


                        title:
                            Text(
                              bible["name"] ??
                                  "Unknown Bible",
                            ),


                        subtitle:
                            Text(
                              bible["description"] ??
                                  "Audio Bible",
                            ),


                        trailing:
                            const Icon(
                              Icons.arrow_forward_ios,
                              size: 18,
                            ),


                        onTap: () {

                          // Next step:
                          // open books screen

                        },

                      ),

                    );

                  },

                ),

    );

  }

}

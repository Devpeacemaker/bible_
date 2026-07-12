import 'package:flutter/material.dart';

import 'reading_plan_detail_screen.dart';

class ReadingPlanScreen extends StatelessWidget {
  const ReadingPlanScreen({super.key});

  @override
  Widget build(BuildContext context) {

    final plans = [
      {
        "title": "30 Days with Jesus",
        "duration": "30 Days",
        "days": 30,
        "description":
            "Read the life and teachings of Jesus.",
      },
      {
        "title": "Read the New Testament",
        "duration": "90 Days",
        "days": 90,
        "description":
            "Complete the New Testament.",
      },
      {
        "title": "Read the Bible in One Year",
        "duration": "365 Days",
        "days": 365,
        "description":
            "Read the entire Bible.",
      },
      {
        "title": "Psalms & Proverbs",
        "duration": "60 Days",
        "days": 60,
        "description":
            "Daily wisdom and encouragement.",
      },
      {
        "title": "Prayer & Faith",
        "duration": "21 Days",
        "days": 21,
        "description":
            "Grow your prayer life.",
      },
    ];


    return Scaffold(

      appBar: AppBar(
        title: const Text(
          "Reading Plans",
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),


      body: ListView.builder(

        padding: const EdgeInsets.all(12),

        itemCount: plans.length,


        itemBuilder: (context, index) {

          final plan = plans[index];


          return Card(

            elevation: 3,

            margin:
                const EdgeInsets.only(bottom: 14),


            child: ListTile(

              contentPadding:
                  const EdgeInsets.all(15),


              leading: const CircleAvatar(
                child:
                    Icon(Icons.calendar_month),
              ),


              title: Text(
                plan["title"] as String,

                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),


              subtitle: Text(
                "${plan["duration"]}\n${plan["description"]}",
              ),

              isThreeLine: true,


              trailing: ElevatedButton(

                child: const Text("Start"),


                onPressed: () {

                  Navigator.push(

                    context,

                    MaterialPageRoute(

                      builder: (_) =>
                          ReadingPlanDetailScreen(

                            title:
                                plan["title"]
                                    as String,

                            days:
                                plan["days"]
                                    as int,

                          ),

                    ),

                  );

                },

              ),
            ),
          );
        },
      ),
    );
  }
}

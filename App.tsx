import 'package:flutter/material.dart';

import '../services/reading_plan_service.dart';

class ReadingPlanDetailScreen extends StatefulWidget {
  final String title;
  final int days;

  const ReadingPlanDetailScreen({
    super.key,
    required this.title,
    required this.days,
  });

  @override
  State<ReadingPlanDetailScreen> createState() =>
      _ReadingPlanDetailScreenState();
}

class _ReadingPlanDetailScreenState
    extends State<ReadingPlanDetailScreen> {


  void toggleDay(int day, bool value) async {
    await ReadingPlanService.setCompleted(
      widget.title,
      day,
      value,
    );

    setState(() {});
  }


  @override
  Widget build(BuildContext context) {

    final completed =
        ReadingPlanService.completedCount(
          widget.title,
          widget.days,
        );


    final progress =
        completed / widget.days;


    return Scaffold(

      appBar: AppBar(
        title: Text(widget.title),
        centerTitle: true,
      ),


      body: Column(
        children: [

          Padding(
            padding: const EdgeInsets.all(16),

            child: Card(
              elevation: 3,

              child: Padding(
                padding: const EdgeInsets.all(16),

                child: Column(
                  children: [

                    Text(
                      "Progress: $completed / ${widget.days} Days",

                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),


                    const SizedBox(height: 12),


                    LinearProgressIndicator(
                      value: progress,
                      minHeight: 10,
                      borderRadius:
                          BorderRadius.circular(10),
                    ),
                  ],
                ),
              ),
            ),
          ),



          Expanded(

            child: ListView.builder(

              padding:
                  const EdgeInsets.all(12),

              itemCount: widget.days,


              itemBuilder: (context, index) {

                final day = index + 1;


                final completed =
                    ReadingPlanService.isCompleted(
                      widget.title,
                      day,
                    );


                return Card(

                  child: CheckboxListTile(

                    value: completed,


                    onChanged: (value) {

                      toggleDay(
                        day,
                        value ?? false,
                      );

                    },


                    title: Text(
                      "Day $day",
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),


                    subtitle: Text(
                      "Bible reading for day $day",
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

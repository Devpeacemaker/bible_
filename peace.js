import 'package:flutter/material.dart';

import 'payment_screen.dart';

class SubscriptionScreen extends StatefulWidget {
  const SubscriptionScreen({super.key});

  @override
  State<SubscriptionScreen> createState() =>
      _SubscriptionScreenState();
}

class _SubscriptionScreenState
    extends State<SubscriptionScreen> {

  int selectedPlan = 0;

  bool loading = false;

  final plans = [
    {
      "title": "2 Months",
      "price": 40,
      "months": 2,
      "icon": Icons.star,
    },
    {
      "title": "6 Months",
      "price": 190,
      "months": 6,
      "icon": Icons.workspace_premium,
    },
    {
      "title": "1 Year",
      "price": 350,
      "months": 12,
      "icon": Icons.diamond,
    },
  ];


  Future<void> continuePayment() async {

    final plan = plans[selectedPlan];

    await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => PaymentScreen(
          title: plan["title"].toString(),
          amount: plan["price"] as int,
          months: plan["months"] as int,
        ),
      ),
    );

  }


  @override
  Widget build(BuildContext context) {

    return Scaffold(

      body: Container(

        decoration: const BoxDecoration(

          gradient: LinearGradient(

            colors: [

              Color(0xff5B2EFF),

              Color(0xff2F80ED),

              Color(0xff56CCF2),

            ],

            begin: Alignment.topLeft,

            end: Alignment.bottomRight,

          ),

        ),

        child: SafeArea(

          child: Padding(

            padding:
                const EdgeInsets.all(20),

            child: Column(

              children: [

                const Icon(

                  Icons.workspace_premium,

                  size: 80,

                  color: Colors.white,

                ),

                const SizedBox(height: 10),

                const Text(

                  "Peace M Bible Premium",

                  style: TextStyle(

                    color: Colors.white,

                    fontSize: 28,

                    fontWeight:
                        FontWeight.bold,

                  ),

                ),

                const SizedBox(height: 8),

                const Text(

                  "Unlock full Bible experience\nand premium features",

                  textAlign:
                      TextAlign.center,

                  style: TextStyle(

                    color: Colors.white70,

                    fontSize: 16,

                  ),

                ),

                const SizedBox(height: 25),
                Expanded(

                  child: ListView.builder(

                    itemCount: plans.length,

                    itemBuilder: (context, index) {

                      final selected =
                          selectedPlan == index;

                      return Stack(

                        clipBehavior:
                            Clip.none,

                        children: [

                          GestureDetector(

                            onTap: () {

                              setState(() {

                                selectedPlan =
                                    index;

                              });

                            },


                            child:
                                AnimatedContainer(

                              duration:
                                  const Duration(
                                milliseconds: 300,
                              ),


                              margin:
                                  const EdgeInsets.only(
                                bottom: 18,
                              ),


                              padding:
                                  const EdgeInsets.all(
                                18,
                              ),


                              decoration:
                                  BoxDecoration(

                                color:
                                    Colors.white,

                                borderRadius:
                                    BorderRadius.circular(
                                        25),


                                border:
                                    Border.all(

                                  color: selected
                                      ? Colors
                                          .deepPurple
                                      : Colors
                                          .transparent,

                                  width: 3,

                                ),


                                boxShadow: const [

                                  BoxShadow(

                                    blurRadius:
                                        10,

                                    color:
                                        Colors.black26,

                                  ),

                                ],

                              ),


                              child: Row(

                                children: [

                                  CircleAvatar(

                                    radius: 30,

                                    backgroundColor:
                                        Colors.deepPurple,

                                    child: Icon(

                                      plans[index]
                                              ["icon"]
                                          as IconData,

                                      color:
                                          Colors.white,

                                    ),

                                  ),


                                  const SizedBox(
                                      width: 20),


                                  Expanded(

                                    child: Column(

                                      crossAxisAlignment:
                                          CrossAxisAlignment
                                              .start,

                                      children: [

                                        Text(

                                          plans[index]
                                                  ["title"]
                                              .toString(),

                                          style:
                                              const TextStyle(

                                            fontSize:
                                                20,

                                            fontWeight:
                                                FontWeight.bold,

                                          ),

                                        ),


                                        const SizedBox(
                                            height: 6),


                                        Text(

                                          "KSh ${plans[index]["price"]}",

                                          style:
                                              const TextStyle(

                                            color:
                                                Colors.deepPurple,

                                            fontSize:
                                                18,

                                            fontWeight:
                                                FontWeight.bold,

                                          ),

                                        ),


                                        if (index == 2)

                                          const Text(

                                            "Best value • Save more",

                                            style:
                                                TextStyle(

                                              color:
                                                  Colors.green,

                                              fontWeight:
                                                  FontWeight.bold,

                                            ),

                                          ),

                                      ],

                                    ),

                                  ),


                                  Radio<int>(

                                    value:
                                        index,

                                    groupValue:
                                        selectedPlan,

                                    onChanged:
                                        (value) {

                                      setState(() {

                                        selectedPlan =
                                            value!;

                                      });

                                    },

                                  ),

                                ],

                              ),

                            ),

                          ),


                          if (index == 2)

                            Positioned(

                              right: 20,

                              top: -8,

                              child: Container(

                                padding:
                                    const EdgeInsets
                                        .symmetric(

                                  horizontal: 12,

                                  vertical: 5,

                                ),

                                decoration:
                                    BoxDecoration(

                                  color:
                                      Colors.orange,

                                  borderRadius:
                                      BorderRadius.circular(
                                          20),

                                ),


                                child:
                                    const Text(

                                  "RECOMMENDED",

                                  style:
                                      TextStyle(

                                    color:
                                        Colors.white,

                                    fontSize:
                                        12,

                                    fontWeight:
                                        FontWeight.bold,

                                  ),

                                ),

                              ),

                            ),

                        ],

                      );

                    },

                  ),

                ),

                const SizedBox(height: 20),
                SizedBox(

                  width:
                      double.infinity,

                  height: 58,


                  child: ElevatedButton.icon(

                    icon: loading

                        ? const SizedBox(

                            width: 22,

                            height: 22,

                            child:
                                CircularProgressIndicator(

                              strokeWidth: 2,

                              color:
                                  Colors.white,

                            ),

                          )

                        : const Icon(
                            Icons.payment,
                          ),


                    label: Text(

                      loading

                          ? "Please wait..."

                          : "Continue to Payment",

                      style:
                          const TextStyle(

                        fontSize: 18,

                        fontWeight:
                            FontWeight.bold,

                      ),

                    ),


                    onPressed:

                        loading

                            ? null

                            : () async {

                                setState(() {

                                  loading =
                                      true;

                                });


                                await continuePayment();


                                if (mounted) {

                                  setState(() {

                                    loading =
                                        false;

                                  });

                                }

                              },


                    style:

                        ElevatedButton.styleFrom(

                      backgroundColor:
                          Colors.white,

                      foregroundColor:
                          Colors.deepPurple,

                      elevation: 8,

                      shape:
                          RoundedRectangleBorder(

                        borderRadius:
                            BorderRadius.circular(
                                20),

                      ),

                    ),

                  ),

                ),


                const SizedBox(height: 20),


              ],

            ),

          ),

        ),

      ),

    );

  }

}

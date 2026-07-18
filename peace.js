import 'dart:async';

import 'package:flutter/material.dart';

import '../services/api_service.dart';
import '../services/user_service.dart';

class PaymentStatusScreen extends StatefulWidget {

  final String checkoutRequestId;
  final String phone;
  final String plan;
  final int months;

  const PaymentStatusScreen({

    super.key,

    required this.checkoutRequestId,

    required this.phone,

    required this.plan,

    required this.months,

  });


  @override
  State<PaymentStatusScreen> createState() =>
      _PaymentStatusScreenState();

}



class _PaymentStatusScreenState
    extends State<PaymentStatusScreen> {


  Timer? timer;


  String status =
      "Waiting for M-PESA payment...";


  bool success = false;



  @override
  void initState() {

    super.initState();


    timer = Timer.periodic(

      const Duration(seconds: 5),

      (_) => checkPayment(),

    );

  }



  Future<void> checkPayment() async {

    try {


      final data =
          await ApiService.paymentStatus(

        widget.checkoutRequestId,

      );



      if (data["status"] == "completed") {


        timer?.cancel();


        await ApiService.activatePremium(

          phone: widget.phone,

          plan: widget.plan,

        );


        await UserService.activatePremium(

          plan: widget.plan,

          months: widget.months,

        );


        if (!mounted) return;


        setState(() {

          success = true;

          status =
              "Payment Successful!";

        });


        return;

      }



      if (data["status"] == "failed") {


        timer?.cancel();


        setState(() {

          status =
              "Payment Failed";

        });


        return;

      }



      if (data["status"] == "cancelled") {


        timer?.cancel();


        setState(() {

          status =
              "Payment Cancelled";

        });


        return;

      }



      setState(() {

        status =
            "Waiting for M-PESA confirmation...";

      });



    } catch (e) {


      setState(() {

        status =
            "Checking payment...";

      });


    }

  }





  @override
  Widget build(BuildContext context) {


    return Scaffold(


      body: Container(


        decoration:
            const BoxDecoration(

          gradient:
              LinearGradient(

            colors: [

              Color(0xff5B2EFF),

              Color(0xff2F80ED),

              Color(0xff56CCF2),

            ],

            begin:
                Alignment.topLeft,

            end:
                Alignment.bottomRight,

          ),

        ),



        child: SafeArea(

          child: Padding(

            padding:
                const EdgeInsets.all(25),


            child: Column(

              mainAxisAlignment:
                  MainAxisAlignment.center,


              children: [



                Container(

                  padding:
                      const EdgeInsets.all(30),


                  decoration:
                      BoxDecoration(

                    color:
                        Colors.white,

                    borderRadius:
                        BorderRadius.circular(
                            30),

                  ),


                  child: Column(

                    children: [


                      Icon(

                        success

                            ? Icons.check_circle

                            : Icons.phone_android,

                        size:
                            90,

                        color:

                            success

                                ? Colors.green

                                : Colors.deepPurple,

                      ),



                      const SizedBox(height:20),



                      Text(

                        success

                            ? "Payment Complete"

                            : "Processing Payment",

                        style:
                            const TextStyle(

                          fontSize:
                              25,

                          fontWeight:
                              FontWeight.bold,

                        ),

                      ),



                      const SizedBox(height:15),



                      Text(

                        status,

                        textAlign:
                            TextAlign.center,

                        style:
                            const TextStyle(

                          fontSize:
                              17,

                          fontWeight:
                              FontWeight.w600,

                        ),

                      ),



                      const SizedBox(height:20),



                      if (!success)

                        const CircularProgressIndicator(

                          color:
                              Colors.deepPurple,

                        ),



                      const SizedBox(height:20),



                      Text(

                        success

                            ? "Your ${widget.plan} premium access is now active."

                            : "Complete the M-PESA prompt on your phone.\nPayment will be checked automatically.",


                        textAlign:
                            TextAlign.center,


                        style:
                            const TextStyle(

                          color:
                              Colors.grey,

                        ),

                      ),


                    ],

                  ),

                ),



                const SizedBox(height:30),



                if (success)

                  SizedBox(

                    width:
                        double.infinity,

                    height:
                        55,


                    child:
                        ElevatedButton(

                      onPressed: () {


                        Navigator.popUntil(

                          context,

                          (route) =>
                              route.isFirst,

                        );


                      },

                      child:
                          const Text(

                        "Continue to Bible",

                        style:
                            TextStyle(

                          fontSize:
                              17,

                          fontWeight:
                              FontWeight.bold,

                        ),

                      ),

                    ),

                  )


                else ...[



                  SizedBox(

                    width:
                        double.infinity,

                    height:
                        50,


                    child:
                        OutlinedButton.icon(

                      icon:
                          const Icon(
                        Icons.refresh,
                      ),

                      label:
                          const Text(
                        "Check Now",
                      ),

                      onPressed:
                          checkPayment,

                    ),

                  ),



                  const SizedBox(height:15),



                  SizedBox(

                    width:
                        double.infinity,

                    height:
                        50,


                    child:
                        TextButton.icon(

                      icon:
                          const Icon(
                        Icons.close,
                      ),

                      label:
                          const Text(
                        "Cancel",
                      ),

                      onPressed: () {

                        timer?.cancel();

                        Navigator.pop(context);

                      },

                    ),

                  ),


                ],


              ],

            ),

          ),

        ),

      ),

    );

  }





  @override
  void dispose() {

    timer?.cancel();

    super.dispose();

  }

}

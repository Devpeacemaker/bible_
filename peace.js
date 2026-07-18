import 'package:flutter/material.dart';

import '../services/api_service.dart';
import '../services/user_service.dart';

class PaymentScreen extends StatefulWidget {

  final String title;
  final int amount;
  final int months;

  const PaymentScreen({

    super.key,

    required this.title,

    required this.amount,

    required this.months,

  });


  @override
  State<PaymentScreen> createState() =>
      _PaymentScreenState();

}


class _PaymentScreenState
    extends State<PaymentScreen> {


  final phoneController =
      TextEditingController();


  bool loading = false;


  @override
  void initState() {

    super.initState();

    loadPhone();

  }


  Future<void> loadPhone() async {

    final user =
        await UserService.getUser();


    if (user != null) {

      phoneController.text =
          user.phone;

      setState(() {});

    }

  }



  Future<void> payNow() async {


    if (phoneController.text.isEmpty) {

      ScaffoldMessenger.of(context)
          .showSnackBar(

        const SnackBar(

          content:
              Text("Enter M-PESA phone number"),

        ),

      );

      return;

    }


    setState(() {

      loading = true;

    });


    try {


      final response =
          await ApiService.stkPush(

        phone:
            phoneController.text.trim(),

        amount:
            widget.amount,

        plan:
            widget.title,

      );


      if (!mounted) return;


      Navigator.pushNamed(

        context,

        "/payment-status",

        arguments: {

          "checkoutRequestId":
              response["checkoutRequestId"],

          "phone":
              phoneController.text.trim(),

          "plan":
              widget.title,

          "months":
              widget.months,

        },

      );


    } catch (e) {


      if (!mounted) return;


      ScaffoldMessenger.of(context)
          .showSnackBar(

        SnackBar(

          content:
              Text(e.toString()),

        ),

      );


    }


    if (mounted) {

      setState(() {

        loading = false;

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
                const EdgeInsets.all(20),


            child: Column(

              children: [



                const Icon(

                  Icons.payment,

                  size: 75,

                  color: Colors.white,

                ),



                const SizedBox(height: 10),



                const Text(

                  "Confirm Payment",

                  style:
                      TextStyle(

                    color:
                        Colors.white,

                    fontSize:
                        28,

                    fontWeight:
                        FontWeight.bold,

                  ),

                ),



                const SizedBox(height: 25),



                Container(

                  padding:
                      const EdgeInsets.all(18),

                  decoration:
                      BoxDecoration(

                    color:
                        Colors.white,

                    borderRadius:
                        BorderRadius.circular(
                            25),

                  ),


                  child: TextField(

                    controller:
                        phoneController,


                    keyboardType:
                        TextInputType.phone,


                    decoration:
                        InputDecoration(

                      labelText:
                          "M-PESA Phone Number",

                      hintText:
                          "2547XXXXXXXX",

                      prefixIcon:
                          const Icon(

                        Icons.phone,

                        color:
                            Colors.deepPurple,

                      ),


                      border:
                          OutlineInputBorder(

                        borderRadius:
                            BorderRadius.circular(
                                18),

                      ),

                    ),

                  ),

                ),



                const SizedBox(height:20),



                Container(

                  padding:
                      const EdgeInsets.all(20),

                  decoration:
                      BoxDecoration(

                    color:
                        Colors.white,

                    borderRadius:
                        BorderRadius.circular(
                            25),

                  ),


                  child: Row(

                    children: [


                      const CircleAvatar(

                        radius:28,

                        backgroundColor:
                            Colors.deepPurple,

                        child:
                            Icon(

                          Icons.workspace_premium,

                          color:
                              Colors.white,

                        ),

                      ),


                      const SizedBox(
                          width:20),


                      Expanded(

                        child: Column(

                          crossAxisAlignment:
                              CrossAxisAlignment.start,

                          children: [


                            Text(

                              widget.title,

                              style:
                                  const TextStyle(

                                fontSize:
                                    20,

                                fontWeight:
                                    FontWeight.bold,

                              ),

                            ),


                            const SizedBox(height:5),


                            Text(

                              "KSh ${widget.amount}",

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


                            Text(

                              "${widget.months} months Premium access",

                            ),

                          ],

                        ),

                      ),

                    ],

                  ),

                ),



                const Spacer(),



                SizedBox(

                  width:
                      double.infinity,

                  height:
                      58,


                  child:
                      ElevatedButton.icon(


                    icon:
                        loading

                            ? const SizedBox(

                                width:
                                    22,

                                height:
                                    22,

                                child:
                                    CircularProgressIndicator(

                                  strokeWidth:
                                      2,

                                  color:
                                      Colors.white,

                                ),

                              )

                            : const Icon(
                                Icons.phone_android,
                              ),



                    label:
                        Text(

                      loading

                          ? "Sending Request..."

                          : "Pay via M-PESA",

                      style:
                          const TextStyle(

                        fontSize:
                            18,

                        fontWeight:
                            FontWeight.bold,

                      ),

                    ),


                    onPressed:
                        loading
                            ? null
                            : payNow,


                    style:
                        ElevatedButton.styleFrom(

                      backgroundColor:
                          Colors.white,

                      foregroundColor:
                          Colors.deepPurple,

                      shape:
                          RoundedRectangleBorder(

                        borderRadius:
                            BorderRadius.circular(
                                20),

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

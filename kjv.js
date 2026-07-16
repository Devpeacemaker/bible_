import 'dart:async';
import 'package:flutter/material.dart';
import 'main_navigation.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _fadeController;
  late AnimationController _glowController;

  late Animation<double> _fadeAnimation;
  late Animation<double> _glowAnimation;

  @override
  void initState() {
    super.initState();

    _fadeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );

    _glowController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);

    _fadeAnimation = CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeInOut,
    );

    _glowAnimation = Tween<double>(
      begin: 8,
      end: 30,
    ).animate(_glowController);

    _fadeController.forward();

    Timer(const Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => const MainNavigation(),
        ),
      );
    });
  }

  @override
  void dispose() {
    _fadeController.dispose();
    _glowController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF0F2027),
              Color(0xFF203A43),
              Color(0xFF2C5364),
              Color(0xFF6A11CB),
            ],
          ),
        ),
        child: SafeArea(
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: Column(
              children: [
                const Spacer(),

                AnimatedBuilder(
                  animation: _glowAnimation,
                  builder: (context, child) {
                    return Container(
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: Colors.amber.withOpacity(0.7),
                            blurRadius: _glowAnimation.value,
                            spreadRadius: 2,
                          ),
                        ],
                      ),
                      child: child,
                    );
                  },
                  child: Image.asset(
                    "assets/images/peace_m_logo.png",
                    height: 170,
                  ),
                ),

                const SizedBox(height: 30),

                const Text(
                  "PEACE M BIBLE",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 34,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 3,
                  ),
                ),

                const SizedBox(height: 15),

                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 30),
                  child: Text(
                    '"Your word is a lamp to my feet\nand a light to my path."\n\nPsalm 119:105',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 17,
                      height: 1.6,
                    ),
                  ),
                ),

                const Spacer(),

                const Padding(
                  padding: EdgeInsets.only(bottom: 35),
                  child: Column(
                    children: [
                      Text(
                        "Powered by",
                        style: TextStyle(
                          color: Colors.white60,
                          fontSize: 15,
                        ),
                      ),
                      SizedBox(height: 6),
                      Text(
                        "PEACEMAKER",
                        style: TextStyle(
                          color: Colors.amber,
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                          letterSpacing: 4,
                        ),
                      ),
                    ],
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

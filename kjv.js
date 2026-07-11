import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'providers/settings_provider.dart';

import 'screens/main_navigation.dart';
import 'screens/create_account_screen.dart';
import 'screens/subscription_screen.dart';
import 'screens/payment_screen.dart';
import 'screens/payment_status_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final settingsProvider = SettingsProvider();
  await settingsProvider.load();

  runApp(
    ChangeNotifierProvider.value(
      value: settingsProvider,
      child: const PeaceMBibleApp(),
    ),
  );
}

class PeaceMBibleApp extends StatelessWidget {
  const PeaceMBibleApp({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = Provider.of<SettingsProvider>(context);

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Peace M Bible',

      themeMode: settings.themeMode,

      theme: ThemeData(
        colorSchemeSeed: Colors.deepPurple,
        useMaterial3: true,
        brightness: Brightness.light,
      ),

      darkTheme: ThemeData(
        colorSchemeSeed: Colors.deepPurple,
        useMaterial3: true,
        brightness: Brightness.dark,
      ),

      routes: {
        "/create-account": (_) => const CreateAccountScreen(),

        "/subscription": (_) => const SubscriptionScreen(),

        "/payment": (context) {
          final plan =
              ModalRoute.of(context)!.settings.arguments
                  as Map;

          return PaymentScreen(
  title: plan["title"],
  amount: plan["amount"],
  months: plan["months"],
);

        },

        "/payment-status": (context) {
          final args =
              ModalRoute.of(context)!.settings.arguments
                  as Map;

          return PaymentStatusScreen(
            checkoutRequestId:
                args["checkoutRequestId"],
            plan: args["plan"],
          );
        },
      },

      home: const MainNavigation(),
    );
  }
}

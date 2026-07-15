import 'dart:convert';
import 'package:http/http.dart' as http;

import '../constants/api_constants.dart';


class AudioService {

  static Future<List<dynamic>> getAudioBibles() async {

    final response = await http.get(

      Uri.parse(
        "${ApiConstants.baseUrl}/audio-bibles",
      ),

      headers: {

        "api-key": ApiConstants.apiKey,

      },

    );


    if (response.statusCode == 200) {

      final data =
          jsonDecode(response.body);

      return data["data"];

    } else {

      throw Exception(
        "Failed to load audio Bibles",
      );

    }
  }
}

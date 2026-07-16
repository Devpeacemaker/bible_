import 'dart:convert';
import 'package:http/http.dart' as http;

import '../constants/api_constants.dart';


class AudioService {


  // Get available Audio Bibles
  static Future<List<dynamic>> getAudioBibles() async {

    final response = await http.get(

      Uri.parse(
        "${ApiConstants.baseUrl}/audio-bibles",
      ),

      headers: {

        "api-key":
            ApiConstants.apiKey,

      },

    );


    if (response.statusCode == 200) {

      final data =
          jsonDecode(response.body);

      return data["data"];

    }


    throw Exception(
      "Unable to load audio Bibles",
    );

  }




  // Get books inside selected Audio Bible
  static Future<List<dynamic>> getBooks({

    required String bibleId,

  }) async {


    final response = await http.get(

      Uri.parse(

        "${ApiConstants.baseUrl}/audio-bibles/"
        "$bibleId/books",

      ),


      headers: {

        "api-key":
            ApiConstants.apiKey,

      },

    );



    if(response.statusCode == 200){


      final data =
          jsonDecode(response.body);


      return data["data"];

    }



    throw Exception(
      "Unable to load Bible books",
    );

  }




  // Get chapters inside selected book
  static Future<List<dynamic>> getBookChapters({

    required String bibleId,

    required String bookId,

  }) async {



    final response = await http.get(

      Uri.parse(

        "${ApiConstants.baseUrl}/audio-bibles/"
        "$bibleId/books/$bookId/chapters",

      ),


      headers: {

        "api-key":
            ApiConstants.apiKey,

      },

    );



    if(response.statusCode == 200){


      final data =
          jsonDecode(response.body);


      return data["data"];

    }



    throw Exception(
      "Unable to load chapters",
    );

  }





  // Get real audio URL for chapter
  static Future<String> getChapterAudioUrl({

    required String bibleId,

    required String chapterId,

  }) async {



    final response = await http.get(

      Uri.parse(

        "${ApiConstants.baseUrl}/audio-bibles/"
        "$bibleId/chapters/$chapterId",

      ),


      headers: {

        "api-key":
            ApiConstants.apiKey,

      },

    );



    if(response.statusCode == 200){


      final data =
          jsonDecode(response.body);



      return data["data"]["resourceUrl"];

    }



    throw Exception(
      "Unable to load chapter audio",
    );

  }


}

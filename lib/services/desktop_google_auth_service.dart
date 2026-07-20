import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:crypto/crypto.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

class DesktopGoogleAuthResult {
  final String idToken;
  final String? accessToken;

  DesktopGoogleAuthResult({required this.idToken, this.accessToken});
}

/// Google Sign-In for desktop (Windows/Linux/macOS) via the OAuth 2.0
/// loopback-redirect flow with PKCE — the standard pattern for installed
/// apps, used because the `google_sign_in` plugin has no desktop backend.
class DesktopGoogleAuthService {
  static final Random _random = Random.secure();

  static String _randomUrlSafeString(int byteLength) {
    final bytes = List<int>.generate(byteLength, (_) => _random.nextInt(256));
    return base64Url.encode(bytes).replaceAll('=', '');
  }

  static String _codeChallengeFor(String verifier) {
    final digest = sha256.convert(utf8.encode(verifier));
    return base64Url.encode(digest.bytes).replaceAll('=', '');
  }

  static Future<DesktopGoogleAuthResult> signIn({
    required String clientId,
    required String clientSecret,
  }) async {
    final codeVerifier = _randomUrlSafeString(32);
    final codeChallenge = _codeChallengeFor(codeVerifier);
    final state = _randomUrlSafeString(16);

    final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
    final redirectUri = 'http://127.0.0.1:${server.port}/';

    try {
      final authUri = Uri.https('accounts.google.com', '/o/oauth2/v2/auth', {
        'client_id': clientId,
        'redirect_uri': redirectUri,
        'response_type': 'code',
        'scope': 'openid email profile',
        'code_challenge': codeChallenge,
        'code_challenge_method': 'S256',
        'state': state,
        'access_type': 'online',
        'prompt': 'select_account',
      });

      final launched = await launchUrl(authUri, mode: LaunchMode.externalApplication);
      if (!launched) {
        throw Exception('Could not open the system browser.');
      }

      final request = await server.first.timeout(
        const Duration(minutes: 3),
        onTimeout: () => throw TimeoutException('Sign-in timed out. Please try again.'),
      );

      final params = request.uri.queryParameters;
      final hasError = params['error'] != null;
      request.response
        ..statusCode = 200
        ..headers.contentType = ContentType.html
        ..write(_responseHtml(success: !hasError));
      await request.response.close();

      if (hasError) {
        throw Exception('Google sign-in was cancelled or denied.');
      }
      if (params['state'] != state) {
        throw Exception('Sign-in state mismatch. Please try again.');
      }
      final code = params['code'];
      if (code == null) {
        throw Exception('No authorization code received.');
      }

      final tokenResponse = await http.post(
        Uri.https('oauth2.googleapis.com', '/token'),
        body: {
          'client_id': clientId,
          'client_secret': clientSecret,
          'code': code,
          'code_verifier': codeVerifier,
          'grant_type': 'authorization_code',
          'redirect_uri': redirectUri,
        },
      );

      if (tokenResponse.statusCode != 200) {
        throw Exception('Token exchange failed: ${tokenResponse.body}');
      }

      final tokenJson = jsonDecode(tokenResponse.body) as Map<String, dynamic>;
      final idToken = tokenJson['id_token'] as String?;
      if (idToken == null) {
        throw Exception('No ID token returned by Google.');
      }

      return DesktopGoogleAuthResult(
        idToken: idToken,
        accessToken: tokenJson['access_token'] as String?,
      );
    } finally {
      unawaited(server.close(force: true));
    }
  }

  static String _responseHtml({required bool success}) {
    final message = success ? 'Signed in — you can close this tab.' : 'Sign-in failed — you can close this tab and try again.';
    return '''
<!DOCTYPE html>
<html>
  <head><title>FaktriIQ</title></head>
  <body style="font-family: sans-serif; text-align: center; margin-top: 20vh;">
    <h2>$message</h2>
  </body>
</html>
''';
  }
}
